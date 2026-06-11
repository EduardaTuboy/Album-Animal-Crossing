import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import "../styles/table.css";
import "../styles/index.css";

import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete2.png";

const capitalizeFirstLetter = (valor) => {
  if (!valor) return ""; // Evita erros caso o campo venha nulo do banco
  const texto = String(valor);
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

export function StickersTable({ data, onEdit, onDelete }) {
  const columns = [
    {
      header: "No.",
      accessorKey: "number",
      cell: (info) => info.getValue().toString().padStart(3, "0"),
    },
    { header: "Name", accessorKey: "name" },
    {
      header: "Gender",
      accessorKey: "gender",
      cell: (info) => capitalizeFirstLetter(info.getValue()),
    },
    {
      header: "Specie",
      accessorKey: "species",
      cell: (info) => capitalizeFirstLetter(info.getValue()),
    },
    {
      header: "Personality",
      accessorKey: "personality",
      cell: (info) => capitalizeFirstLetter(info.getValue()),
    },
    {
      header: "Rarity",
      accessorKey: "rarity",
      cell: (info) => capitalizeFirstLetter(info.getValue()),
    },
    { header: "Total", accessorKey: "total" },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <div className="inline-buttons">
          <button type="button" onClick={() => onEdit(row.original)}>
            <img src={editIcon} alt="Edit" />
          </button>
          <button type="button" onClick={() => onDelete(row.original.number)}>
            <img src={deleteIcon} alt="Delete" />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table">
      <h3>Stickers Catalog</h3>
      <table border="0">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
