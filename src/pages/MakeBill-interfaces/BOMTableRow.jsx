import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export function BOMTableRow({ item, isSelected, onSelect }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`grid grid-cols-[60px_60px_1fr_100px_80px_2fr_80px_80px_80px_80px_80px_1fr_1fr] gap-1 px-2 py-2 border-b border-gray-200 text-sm transition-all duration-200 ease-in-out
        ${isDragging ? "bg-blue-100 shadow-lg scale-[1.02] z-50" : ""}
        ${
          isSelected
            ? "bg-blue-50"
            : item.sNo % 2 === 0
            ? "bg-gray-50/50"
            : "bg-white"
        }
        ${
          !isDragging && !isSelected
            ? "hover:bg-blue-100 hover:shadow-md hover:scale-[1.01] hover:z-10"
            : ""
        }
      `}
    >
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center gap-1 justify-center">
        <button
          className="cursor-move touch-none"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </button>
        <span className="text-xs">{item.sNo}</span>
      </div>
      <input
        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
        defaultValue={item.component}
      />
      <input
        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
        defaultValue={item.partNo}
      />
      <input
        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
        maxLength={2}
        defaultValue={item.rev}
      />
      <input
        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
        defaultValue={item.partDescription}
      />
      <input
        type="number"
        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
        defaultValue={item.qtyPerUnit}
        max={999}
      />
      <input
        type="number"
        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
        defaultValue={item.stdPkgQty}
        max={999}
      />
      <input
        type="number"
        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
        defaultValue={item.qtyRequired}
        max={999}
      />
      <input
        type="number"
        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
        defaultValue={item.issuedQty}
        max={999}
      />
      <input
        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
        defaultValue={item.qNo}
        maxLength={3}
      />
      <input
        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
        defaultValue={item.comments}
      />
      <input
        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
        defaultValue={item.notes}
      />
    </div>
  );
}
