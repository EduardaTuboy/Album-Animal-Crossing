import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import hammerIcon from "../assets/hammer-icon.png";
import "../styles/collection.css";

import { StickersTable } from "../components/stickersTable";
import { StickerModal } from "../components/stickerModal";

export const Route = createFileRoute("/collection")({
  component: Collection,
});

function Collection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSticker, setEditingSticker] = useState(null); // Guarda o objeto sticker inteiro se estiver editando
  const [stickersList, setStickersList] = useState([]);

  useEffect(() => {
    const carregarFigurinhas = async () => {
      try {
        const response = await fetch(`http://localhost:5000/collection/`);
        const data = await response.json();
        setStickersList(data);
      } catch (error) {
        console.error("Erro ao carregar figurinhas:", error);
      }
    };
    carregarFigurinhas();
  }, []);

  const handleEditClick = (sticker) => {
    setEditingSticker(sticker);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSticker(null);
  };

  const handleDeleteSticker = async (number) => {
    // Pede uma confirmação ao utilizador antes de apagar
    if (
      !window.confirm(
        "Tem a certeza que deseja eliminar este villager? Esta ação é irreversível.",
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/delete/${number}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove visualmente o item da lista
        setStickersList((prev) =>
          prev.filter((item) => item.number !== number),
        );
      } else {
        console.error("Erro ao eliminar no servidor");
      }
    } catch (error) {
      console.error("Erro na requisição de eliminação:", error);
    }
  };

  const handleSaveSticker = async (dadosSticker) => {
    if (editingSticker !== null) {
      // --- MODO EDIÇÃO ---
      try {
        const response = await fetch(
          `http://localhost:5000/update/${editingSticker.number}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosSticker),
          },
        );

        if (response.ok) {
          const updatedSticker = await response.json();
          // Atualiza a lista na tela com os dados que voltaram do banco
          setStickersList((prev) =>
            prev.map((item) =>
              item.number === editingSticker.number ? updatedSticker : item,
            ),
          );
          handleCloseModal();
        } else {
          console.error("Erro ao atualizar no servidor");
        }
      } catch (error) {
        console.error("Erro na requisição de edição:", error);
      }
    } else {
      // --- MODO CRIAÇÃO ---
      const numerosOrdenados = stickersList
        .map((s) => s.number)
        .sort((a, b) => a - b);

      let nextNumber = 1;
      for (const num of numerosOrdenados) {
        if (num === nextNumber) {
          nextNumber++; // Se o número já existe, avança para o próximo
        }
      }

      const novoStickerPayload = {
        number: nextNumber,
        ...dadosSticker,
      };

      try {
        const response = await fetch(`http://localhost:5000/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novoStickerPayload),
        });

        if (response.ok) {
          const stickerCriado = await response.json();
          // Adiciona o novo sticker retornado pelo banco à lista da tela
          setStickersList((prev) => [...prev, stickerCriado]);
          handleCloseModal();
        } else {
          console.error("Erro ao criar no servidor");
        }
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
