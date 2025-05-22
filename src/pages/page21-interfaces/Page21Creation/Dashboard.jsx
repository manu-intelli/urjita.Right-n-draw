import React, { useState, useEffect } from "react";

import {
  Pagination,
  SearchBar,
} from "../../../components/common/ReusableComponents";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { Plus, Edit, Trash2, Search } from "lucide-react"; // Lucide icons for modern UI
import { Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PibaseDashboard = () => {
  // Mock data
  const mockTemplates = [
    {
      id: 1,
      opNumber: "OP123",
      opuNumber: "OPU456",
      eduNumber: "EDU789",
      modelFamily: "Alpha",
      modelName: "Model A1",
      technology: "TechX",
    },
    {
      id: 2,
      opNumber: "OP234",
      opuNumber: "OPU567",
      eduNumber: "EDU890",
      modelFamily: "Beta",
      modelName: "Model B2",
      technology: "TechY",
    },
    {
      id: 3,
      opNumber: "OP345",
      opuNumber: "OPU678",
      eduNumber: "EDU901",
      modelFamily: "Gamma",
      modelName: "Model C3",
      technology: "TechZ",
    },
    {
      id: 4,
      opNumber: "OP456",
      opuNumber: "OPU789",
      eduNumber: "EDU012",
      modelFamily: "Delta",
      modelName: "Model D4",
      technology: "TechW",
    },
    {
      id: 5,
      opNumber: "OP567",
      opuNumber: "OPU890",
      eduNumber: "EDU123",
      modelFamily: "Epsilon",
      modelName: "Model E5",
      technology: "TechV",
    },
  ];
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    // Simulate loading mock data
    setTimeout(() => {
      setTemplates(mockTemplates);
      setLoading(false);
    }, 1000); // 1-second delay to mimic API call
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filterTemplates = (templatesList) => {
    return templatesList.filter((template) =>
      Object.values(template).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleCreate = () => {
    navigate(`/page21`);
    console.log("Create new template");
    // Implement modal or navigation for creating a new template
  };

  const handleEdit = (template) => {
    console.log("Edit template:", template);
    // Implement modal or navigation for editing
  };

  const handleDelete = (template) => {
    console.log("Delete template:", template);
    // Implement confirmation dialog and mock deletion
    setTemplates(templates.filter((t) => t.id !== template.id));
  };

  const displayTemplates = filterTemplates(templates);
  const totalPages = Math.ceil(displayTemplates.length / ITEMS_PER_PAGE);
  const paginatedTemplates = displayTemplates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-7rem)]">
        <LoadingSpinner className="h-10 w-10 text-blue-600" />
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center p-8 bg-red-50 rounded-lg">
        {error}
      </div>
    );

  return (
    <>
      <Toolbar />
      <div className="flex flex-col h-[calc(100vh-7rem)] max-w-6xl mx-auto mt-8 ">
        {/* Embedded Scrollbar Styles */}
        <style>
          {`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #9ca3af #f3f4f6;
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #9ca3af;
            border-radius: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #6b7280;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-corner {
            background: transparent;
          }
        `}
        </style>

        {/* Header Section */}
        <div className="bg-white rounded-t-2xl p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              pibase Dashboard
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative w-80">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search templates..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <button
                onClick={handleCreate}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Template
              </button>
            </div>
          </div>
        </div>

        {/* Table Section - Scrollable */}
        <div className="flex-1 overflow-hidden bg-white">
          <div className="overflow-x-auto overflow-y-auto h-full custom-scrollbar">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    OP Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    OPU Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    EDU Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Model Family
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Model Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Technology
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedTemplates.map((template) => (
                  <tr
                    key={template.id}
                    className="hover:bg-blue-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                      {template.opNumber || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                      {template.opuNumber || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                      {template.eduNumber || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                      {template.modelFamily || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                      {template.modelName || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                      {template.technology || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(template)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-150"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(template)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-150"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Section with Pagination */}
        <div className="bg-white rounded-b-2xl p-6 border-t border-gray-200">
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="flex space-x-2"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PibaseDashboard;
