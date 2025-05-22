import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, Save, Trash2, UploadCloud } from "lucide-react";
import { BOMTableRow } from "./BOMTableRow";

const initialData = [
  {
    id: "1",
    sNo: 1,
    component: "Resistor",
    partNo: "RS-001",
    rev: "A1",
    partDescription: "10k Ohm Resistor",
    qtyPerUnit: 1,
    stdPkgQty: 100,
    qtyRequired: 50,
    issuedQty: 50,
    qNo: "Q001",
    comments: "Standard tolerance",
    notes: "Place near IC1",
  },
];

export function BOMTable() {
  const [items, setItems] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const reorderedItems = arrayMove(items, oldIndex, newIndex);

        return reorderedItems.map((item, index) => ({
          ...item,
          sNo: index + 1,
        }));
      });
    }
  };

  const addNewRow = () => {
    const newItem = {
      id: String(items.length + 1),
      sNo: items.length + 1,
      component: "",
      partNo: "",
      rev: "",
      partDescription: "",
      qtyPerUnit: 0,
      stdPkgQty: 0,
      qtyRequired: 0,
      issuedQty: 0,
      qNo: "",
      comments: "",
      notes: "",
    };
    setItems([...items, newItem]);
  };

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  };

  const deleteSelectedRows = () => {
    const remainingItems = items
      .filter((item) => !selectedRows.has(item.id))
      .map((item, index) => ({
        ...item,
        sNo: index + 1,
      }));
    setItems(remainingItems);
    setSelectedRows(new Set());
  };

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-lg">
      <div className="min-w-max">
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-[60px_60px_1fr_100px_80px_2fr_80px_80px_80px_80px_80px_1fr_1fr] gap-1 px-2 py-3 text-xs font-medium text-gray-700">
            <div className="flex items-center justify-center">
              {selectedRows.size > 0 && (
                <button
                  onClick={deleteSelectedRows}
                  className="p-1 text-red-600 hover:text-red-800"
                  title="Delete selected rows"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex items-center justify-center">S.No</div>
            <div className="px-2">Component</div>
            <div className="px-2">Part #</div>
            <div className="px-2">Rev</div>
            <div className="px-2">Part Description</div>
            <div className="px-2">Qty/Unit</div>
            <div className="px-2">Std-Pkg Qty</div>
            <div className="px-2">Qty Req</div>
            <div className="px-2">Issued Qty</div>
            <div className="px-2">Q#</div>
            <div className="px-2">Comments</div>
            <div className="px-2">Notes</div>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <BOMTableRow
                key={item.id}
                item={item}
                isSelected={selectedRows.has(item.id)}
                onSelect={() => toggleRowSelection(item.id)}
              />
            ))}
          </SortableContext>
        </DndContext>

        <div className="px-4 py-3 border-t border-gray-200 flex gap-3">
          <button
            onClick={addNewRow}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="w-4 h-4" />
            Add Row
          </button>

          <button
            onClick={() => console.log("Saved as draft")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <Save className="w-4 h-4" />
            Save as Draft
          </button>

          <button
            onClick={() => console.log("Uploaded to ERP")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <UploadCloud className="w-4 h-4" />
            Upload to ERP
          </button>
        </div>
      </div>
    </div>
  );
}
