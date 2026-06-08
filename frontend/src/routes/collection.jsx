import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
// 1. IMPORTAÇÕES DA TANSTACK TABLE
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import hammerIcon from "../assets/hammer-icon.png";
import "../styles/collection.css";

export const Route = createFileRoute("/collection")({
  component: Collection,
});

function Collection() {
  // Estado para controlar a abertura do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // NOVO: Estado para saber se estamos editando uma figurinha (guarda o ID/Number dela)
  const [editingStickerId, setEditingStickerId] = useState(null);

  // Estados do formulário
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [species, setSpecies] = useState("");
  const [personality, setPersonality] = useState("");
  const [rarity, setRarity] = useState("");
  const [total, setTotal] = useState("");

  // NOVO: Estado que armazena a lista de figurinhas que a tabela vai exibir
  const [stickersList, setStickersList] = useState([
    {
      number: 1,
      name: "Piper",
      gender: "female",
      species: "bird",
      personality: "Peppy",
      rarity: "rare",
      total: 15,
    },
    {
      number: 2,
      name: "Ace",
      gender: "male",
      species: "bird",
      personality: "Jock",
      rarity: "common",
      total: 50,
    },
    {
      number: 87,
      name: "Chevre",
      gender: "female",
      species: "goat",
      personality: "Normal",
      rarity: "common",
      total: 10,
    },
  ]);

  const currentUserEmail = "usuario@exemplo.com";

  // Opcional: Descomente para buscar os dados reais do seu backend index.js
  /*
  useEffect(() => {
    const carregarFigurinhas = async () => {
      const response = await fetch(`http://localhost:5000/album/${currentUserEmail}`);
      const data = await response.json();
      setStickersList(data); // Garanta que os campos batam com o banco (ex: image_url, etc)
    };
    carregarFigurinhas();
  }, []);
  */

  const listaEspecies = [
    "alligator",
    "anteater",
    "bear",
    "bird",
    "bull",
    "cat",
    "chicken",
    "cow",
    "cub",
    "deer",
    "dog",
    "duck",
    "eagle",
    "elephant",
    "frog",
    "goat",
    "gorilla",
    "hamster",
    "hippo",
    "horse",
    "kangaroo",
    "koala",
    "lion",
    "monkey",
    "mouse",
    "octopus",
    "ostrich",
    "penguin",
    "pig",
    "rabbit",
    "rhino",
    "sheep",
    "squirrel",
    "tiger",
    "wolf",
  ];

  // NOVO: Função chamada ao clicar no botão de Editar da Tabela
  const handleEditClick = (sticker) => {
    setEditingStickerId(sticker.number); // Salva qual figurinha estamos editando

    // Preenche os inputs com os dados atuais dela
    setName(sticker.name);
    setSex(sticker.gender);
    setSpecies(sticker.species);
    setPersonality(sticker.personality);
    setRarity(sticker.rarity);
    setTotal(sticker.total.toString());

    setIsModalOpen(true); // Abre o modal
  };

  // NOVO: Função para limpar o form ao fechar/cancelar
  const fecharEFecharModal = () => {
    setName("");
    setSex("");
    setSpecies("");
    setPersonality("");
    setRarity("");
    setTotal("");
    setEditingStickerId(null);
    setIsModalOpen(false);
  };

  // ATUALIZADO: Salva tanto criações novas quanto edições
  const handleSubmit = (e) => {
    e.preventDefault();

    const dadosSticker = {
      name,
      gender: sex,
      species,
      personality,
      rarity,
      total: parseInt(total) || 0,
    };

    if (editingStickerId !== null) {
      // --- MODO EDIÇÃO ---
      console.log(`Editando sticker nº ${editingStickerId}:`, dadosSticker);

      // Atualiza na lista local (depois você substitui por um fetch PUT/POST para o banco)
      setStickersList((prev) =>
        prev.map((item) =>
          item.number === editingStickerId
            ? { ...item, ...dadosSticker }
            : item,
        ),
      );
    } else {
      // --- MODO CRIAÇÃO ---
      const novoSticker = {
        number: stickersList.length + 1, // Apenas para simulação local
        ...dadosSticker,
      };
      console.log("Criando novo sticker:", novoSticker);
      setStickersList((prev) => [...prev, novoSticker]);
    }

    fecharEFecharModal();
  };

  // 2. DEFINIÇÃO DAS COLUNAS DA TANSTACK TABLE
  const columns = [
    {
      header: "No.",
      accessorKey: "number",
      cell: (info) => info.getValue().toString().padStart(3, "0"), // Formatação 011 que fizemos antes!
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Sex",
      accessorKey: "gender",
    },
    {
      header: "Species",
      accessorKey: "species",
    },
    {
      header: "Personality",
      accessorKey: "personality",
    },
    {
      header: "Rarity",
      accessorKey: "rarity",
    },
    {
      header: "Total",
      accessorKey: "total",
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <button type="button" onClick={() => handleEditClick(row.original)}>
          Edit
        </button>
      ),
    },
  ];

  // 3. INICIALIZAÇÃO DA TANSTACK TABLE
  const table = useReactTable({
    data: stickersList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <main>
      {/* Botão que abre o modal em modo de Criação */}
      <button className="create" onClick={() => setIsModalOpen(true)}>
        <img src={hammerIcon} alt="Hammer icon" />
        Create
      </button>

      {/* Estrutura do Modal (Reutilizável) */}
      {isModalOpen && (
        <div
          className="modal-container"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
            }}
          >
            {/* O título muda dinamicamente de acordo com o modo */}
            <h3>
              {editingStickerId !== null
                ? "Edit Sticker"
                : "Create New Sticker"}
            </h3>

            <form onSubmit={handleSubmit}>
              {/* Input: Name */}
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block" }}>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Select: Sex (Female / Male) */}
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block" }}>Sex</label>
                <select
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  required
                >
                  <option value="">Select Sex</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>

              {/* Select: Species */}
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block" }}>Species</label>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  required
                >
                  <option value="">Select Species</option>
                  {listaEspecies.map((esp) => (
                    <option key={esp} value={esp}>
                      {esp.charAt(0).toUpperCase() + esp.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input: Personality */}
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block" }}>Personality</label>
                <select
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  required
                >
                  <option value="">Select Personality</option>
                  <option value="Jock">Jock</option>
                  <option value="Cranky">Cranky</option>
                  <option value="Smug">Smug</option>
                  <option value="Lazy">Lazy</option>
                  <option value="Normal">Normal</option>
                  <option value="Peppy">Peppy</option>
                  <option value="Snooty">Snooty</option>
                  <option value="Sisterly">Sisterly</option>
                </select>
              </div>

              {/* Select: Rarity */}
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block" }}>Rarity</label>
                <select
                  value={rarity}
                  onChange={(e) => setRarity(e.target.value)}
                  required
                >
                  <option value="">Select Rarity</option>
                  <option value="common">Common</option>
                  <option value="rare">Rare</option>
                  <option value="legendary">Legendary</option>
                </select>
              </div>

              {/* Input: Total */}
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block" }}>Total</label>
                <input
                  type="number"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  min="0"
                  required
                />
              </div>

              {/* Ações do Modal */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                }}
              >
                <button type="button" onClick={fecharEFecharModal}>
                  Cancel
                </button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. RENDERIZAÇÃO DA TANSTACK TABLE (SEM ESTILIZAÇÃO)      */}
      {/* ========================================================= */}
      <div style={{ marginTop: "30px" }}>
        <h3>Stickers Catalog</h3>

        <table style={{ width: "100%", borderCollapse: "collapse" }} border="1">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ padding: "8px", textAlign: "left" }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ padding: "8px" }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
