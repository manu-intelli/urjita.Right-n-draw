import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DesignEngineer() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(
    `${import.meta.env.VITE_API_URL}/pibase/records/?page=1`
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [reverseOrder, setReverseOrder] = useState(false);
  const [orderAsc, setOrderAsc] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setLoading(true);
    let url = currentUrl;
    if (searchTerm) {
      const urlObj = new URL(currentUrl);
      urlObj.searchParams.set("search", searchTerm);
      url = urlObj.toString();
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setRecords(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setLoading(false);
        const urlObj = new URL(url);
        const page = parseInt(urlObj.searchParams.get("page") || "1");
        setPageNumber(page);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [currentUrl, searchTerm]);

  let displayedRecords = [...records];
  if (reverseOrder) {
    displayedRecords.reverse();
  }
  if (!orderAsc) {
    displayedRecords.sort((a, b) => b.model_name.localeCompare(a.model_name));
  }

  // Icons for status
  const DraftIcon = () => (
    <svg width="20" height="20" fill="gray" viewBox="0 0 24 24">
      <path d="M3 3h18v18H3V3z" stroke="gray" strokeWidth="2" fill="none" />
      <path
        d="M6 9h12M6 12h12M6 15h7"
        stroke="gray"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const PendingIcon = () => (
    <svg width="20" height="20" fill="orange" viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="orange"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M12 6v6l4 2"
        stroke="orange"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const CompleteIcon = () => (
    <svg width="20" height="20" fill="green" viewBox="0 0 24 24">
      <path
        d="M20 6L9 17l-5-5"
        stroke="green"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Edit Icon
  const EditIcon = () => (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="blue"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );

  // Delete Icon
  const DeleteIcon = () => (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="red"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  );

  if (loading)
    return <div className="p-4 text-center text-black">Loading records...</div>;
  if (error)
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="pt-12">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-white flex-grow">
            Design Engineer Records
          </h1>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-black"
          />
          <div className="flex items-center space-x-4 text-white">
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={reverseOrder}
                onChange={() => setReverseOrder(!reverseOrder)}
              />
              <span>Reverse</span>
            </label>

            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={!orderAsc}
                onChange={() => setOrderAsc(!orderAsc)}
              />
              <span>Order Desc</span>
            </label>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/pibase/create")} // Navigate to create page
          >
            Create New Records
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-200 text-black">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th className="py-3 px-6 text-left border-b border-gray-200">
                  ID
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-200">
                  Model Name
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-200">
                  OP No
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-200">
                  Revision
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-200">
                  Created At
                </th>
                <th className="py-3 px-6 text-center border-b border-gray-200">
                  Status
                </th>
                <th className="py-3 px-6 text-center border-b border-gray-200">
                  Edit
                </th>
                <th className="py-3 px-6 text-center border-b border-gray-200">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedRecords.map((record, index) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 border-b border-gray-200">
                    {(pageNumber - 1) * 10 + index + 1}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {record.model_name}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {record.op_no}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {record.revision_number}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {new Date(record.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200 text-center">
                    {record.status === 1 ? (
                      <DraftIcon />
                    ) : record.status === 2 ? (
                      <PendingIcon />
                    ) : record.status === 3 ? (
                      <CompleteIcon />
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200 text-center">
                    <button
                      onClick={() => alert(`Edit record ${record.id}`)}
                      aria-label="Edit"
                    >
                      <EditIcon />
                    </button>
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200 text-center">
                    <button
                      onClick={() => alert(`Delete record ${record.id}`)}
                      aria-label="Delete"
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between text-black">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            onClick={() => prevPage && setCurrentUrl(prevPage)}
            disabled={!prevPage}
          >
            Previous
          </button>

          <div className="text-white">Page: {pageNumber}</div>

          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            onClick={() => nextPage && setCurrentUrl(nextPage)}
            disabled={!nextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
