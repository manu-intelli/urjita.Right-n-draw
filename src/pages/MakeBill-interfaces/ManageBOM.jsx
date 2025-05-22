import React from "react";
import { ClipboardList } from "lucide-react";
import { BOMTable } from "./MakeBill";

function ManageBOM() {
  return (
    <div className="min-h-screen bg-neutral-900 p-4 sm:p-8 md:p-16">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 w-full max-w-7xl mx-auto">
        {/* Header with Icon */}
        <div className="px-4 sm:px-6 md:px-8 py-4 border-b border-neutral-200">
          <div className="w-full text-center flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-semibold text-neutral-900">
                Bill of Materials
              </h1>
            </div>
            <p className="text-sm text-neutral-600 max-w-xl">
              Manage your BOM entries with drag-and-drop reordering and inline
              editing.
            </p>
          </div>
          <div className="mt-6">
            <BOMTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageBOM;
