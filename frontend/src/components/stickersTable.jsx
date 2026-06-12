import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import "../styles/table.css";
import "../styles/index.css";

import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete2.png";
import doubleArrowLeft from "../assets/double-arrow-left.png";
import doubleArrowRight from "../assets/double-arrow-right.png";
import arrowLeft from "../assets/arrow-left.png";
import arrowRight from "../assets/arrow-right.png";

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
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
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
      <div className="pagination">
        <button
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <img src={doubleArrowLeft} alt="Start" />
        </button>

        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <img src={arrowLeft} alt="Previous" />
        </button>

        <span>
          PAGE {table.getState().pagination.pageIndex + 1} OF{" "}
          {table.getPageCount()}
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <img src={arrowRight} alt="Next" />
        </button>

        <button
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <img src={doubleArrowRight} alt="End" />
        </button>
      </div>
    </div>
  );
}
