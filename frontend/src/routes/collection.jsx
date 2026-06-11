import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import hammerIcon from '../assets/hammer-icon.png';
import '../styles/collection.css';

import { StickersTable } from '../components/stickersTable';
import { StickerModal } from '../components/stickerModal';
import {
  useCollection,
  useDeleteSticker,
  useUpdateSticker,
  useAddSticker,
} from '../api/stickersQueries.js';

export const Route = createFileRoute('/collection')({
  component: Collection,
});

function Collection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSticker, setEditingSticker] = useState(null);
  const { data: stickersList = [] } = useCollection();
  const deleteMutation = useDeleteSticker();
  const updateMutation = useUpdateSticker();
  const addMutation = useAddSticker();

  const handleEditClick = (sticker) => {
    setEditingSticker(sticker);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSticker(null);
  };

  const handleDeleteSticker = async (number) => {
    if (
      !window.confirm(
        'Tem a certeza que deseja eliminar este villager? Esta ação é irreversível.',
      )
    ) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(number);
    } catch (error) {
      console.error('Erro na requisição de eliminação:', error);
    }
  };

  const handleSaveSticker = async (dadosSticker) => {
    if (editingSticker !== null) {
      try {
        await updateMutation.mutateAsync({
          number: editingSticker.number,
          data: dadosSticker,
        });
        handleCloseModal();
      } catch (error) {
        console.error('Erro na requisição de edição:', error);
      }
    } else {
      const numerosOrdenados = stickersList.map((s) => s.number).sort((a, b) => a - b);
      let nextNumber = 1;
      for (const num of numerosOrdenados) {
        if (num === nextNumber) {
          nextNumber++;
        }
      }

      const novoStickerPayload = {
        number: nextNumber,
        ...dadosSticker,
      };

      try {
        await addMutation.mutateAsync(novoStickerPayload);
        handleCloseModal();
      } catch (error) {
        console.error('Erro na requisição de criação:', error);
      }
    }
  };

  return (
    <main>
      <button
        className="create"
        onClick={() => {
          setEditingSticker(null);
          setIsModalOpen(true);
        }}
      >
        <img src={hammerIcon} alt="Hammer icon" />
        Create
      </button>

      <StickersTable
        data={stickersList}
        onEdit={handleEditClick}
        onDelete={handleDeleteSticker}
      />

      <StickerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveSticker}
        editingSticker={editingSticker}
      />
    </main>
  );
}
