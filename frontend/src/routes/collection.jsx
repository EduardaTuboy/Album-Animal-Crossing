import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import hammerIcon from "../assets/hammer-icon.png";
import "../styles/collection.css";

import { StickersTable } from "../components/stickersTable";
import { StickerModal } from "../components/stickerModal";
import {
  useCollection,
  useCreateCatalogSticker, // Importa o hook de criação do catálogo
  useUpdateCatalogSticker, // Importa o hook de edição do catálogo
  useDeleteCatalogSticker, // Importa o hook de remoção do catálogo
} from "../api/stickersQueries.js";

export const Route = createFileRoute("/collection")({
  component: Collection,
});

function Collection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSticker, setEditingSticker] = useState(null);

  // Carrega a lista completa do catálogo geral
  const { data: stickersList = [] } = useCollection();

  // Inicializa as mutações corretas mapeadas para a tabela Stickers
  const deleteMutation = useDeleteCatalogSticker();
  const updateMutation = useUpdateCatalogSticker();
  const addMutation = useCreateCatalogSticker();

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
        "Tem a certeza que deseja eliminar este villager? Esta ação é irreversível.",
      )
    ) {
      return;
    }

    try {
      // Executa a remoção enviando apenas o 'number' exigido pela rota /delete/:number
      await deleteMutation.mutateAsync(number);
    } catch (error) {
      console.error("Erro na requisição de eliminação:", error);
    }
  };

  const handleSaveSticker = async (dadosSticker) => {
    if (editingSticker !== null) {
      try {
        // Atualiza na tabela Stickers passando o id (number) e o body (data)
        await updateMutation.mutateAsync({
          number: editingSticker.number,
          data: dadosSticker,
        });
        handleCloseModal();
      } catch (error) {
        console.error("Erro na requisição de edição:", error);
      }
    } else {
      // Lógica de cálculo automática para o ID / Number do novo Villager
      const numerosOrdenados = stickersList
        .map((s) => s.number)
        .sort((a, b) => a - b);
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
        // Adiciona um novo registo à tabela Stickers via POST /add
        await addMutation.mutateAsync(novoStickerPayload);
        handleCloseModal();
      } catch (error) {
        console.error("Erro na requisição de criação:", error);
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
