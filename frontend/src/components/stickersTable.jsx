import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { StickersFilter } from "./stickersFilter";

import "../styles/table.css";
import "../styles/index.css";

import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete2.png";
import doubleArrowLeft from "../assets/double-arrow-left.png";
import doubleArrowRight from "../assets/double-arrow-right.png";
import arrowLeft from "../assets/arrow-left.png";
import arrowRight from "../assets/arrow-right.png";
import arrowUp from "../assets/arrow-up.png";
import arrowDown from "../assets/arrow-down.png";
import arrowUpDown from "../assets/arrow-up-down.png";

const capitalizeFirstLetter = (valor) => {
  if (!valor) return "";
  const texto = String(valor);
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

export function StickersTable({ data, onEdit, onDelete }) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        header: "No.",
        accessorKey: "number",
        enableSorting: true,
        cell: (info) => info.getValue().toString().padStart(3, "0"),
      },
      {
        header: "Name",
        accessorKey: "name",
        enableSorting: true,
      },
      {
        header: "Gender",
        accessorKey: "gender",
        enableSorting: false,
        filterFn: "equalsString",
        cell: (info) => capitalizeFirstLetter(info.getValue()),
      },
      {
        header: "Specie",
        accessorKey: "species",
        enableSorting: false,
        filterFn: "equalsString",
        cell: (info) => capitalizeFirstLetter(info.getValue()),
      },
      {
        header: "Personality",
        accessorKey: "personality",
        enableSorting: false,
        filterFn: "equalsString",
        cell: (info) => capitalizeFirstLetter(info.getValue()),
      },
      {
        header: "Hobby",
        accessorKey: "hobbie",
        enableSorting: false,
        filterFn: "equalsString",
        cell: (info) => capitalizeFirstLetter(info.getValue()),
      },
      {
        header: "Rarity",
        accessorKey: "rarity",
        enableSorting: false,
        cell: (info) => capitalizeFirstLetter(info.getValue()),
      },
      { header: "Total", accessorKey: "total", enableSorting: false },
      {
        header: "Actions",
        id: "actions",
        enableSorting: false,
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
    ],
    [onEdit, onDelete],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="table">
      <StickersFilter
        data={data}
        isAlbum={false}
        filters={{
          species: table.getColumn("species")?.getFilterValue() ?? "",
          hobbie: table.getColumn("hobbie")?.getFilterValue() ?? "",
          personality: table.getColumn("personality")?.getFilterValue() ?? "",
          gender: table.getColumn("gender")?.getFilterValue() ?? "",
        }}
        onFilterChange={(coluna, valor) => {
          table.getColumn(coluna)?.setFilterValue(valor);
        }}
        onClearFilters={() => table.resetColumnFilters()}
      />
      <h3>Stickers Catalog</h3>

      <table border="0">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                return (
                  <th
                    key={header.id}
                    onClick={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    style={{
                      cursor: canSort ? "pointer" : "default",
                      userSelect: "none",
                    }}
                  >
                    <div className="sort-controll">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {canSort && (
                        <span>
                          {{
                            asc: <img src={arrowUp} alt="Up" />,
                            desc: <img src={arrowDown} alt="Down" />,
                          }[header.column.getIsSorted()] ?? (
                            <img src={arrowUpDown} alt="Up and Down" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                style={{ textAlign: "center", padding: "20px" }}
              >
                Nenhuma figurinha encontrada com estes critérios.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {table.getPageCount() > 1 && (
        <div
          className="pagination"
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
      )}
    </div>
  );
}
