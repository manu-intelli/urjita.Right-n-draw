import React, { useState } from "react";
import { Input, Select } from "../../components/common/ReusableComponents";
import { Plus, Trash2 } from "lucide-react";

const yesNoOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const qualificationOptions = [
  { label: "Qualified", value: "Qualified" },
  { label: "Unqualified", value: "Unqualified" },
];

const ConditionalStudentTable = () => {
  const [students, setStudents] = useState([
    {
      name: "",
      hasBp: "",
      bpNumber: "",
      hasSupplier: "",
      supplierName: "",
      supplierNumber: "",
      qualification: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...students];
    updated[index] = { ...updated[index], [field]: value };
    setStudents(updated);
  };

  const handleAddRow = () => {
    setStudents([
      ...students,
      {
        name: "",
        hasBp: "",
        bpNumber: "",
        hasSupplier: "",
        supplierName: "",
        supplierNumber: "",
        qualification: "",
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Student Detail Table</h2>
        <button
          onClick={handleAddRow}
          className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
        >
          <Plus size={18} />
          Add Row
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-300 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 uppercase dark:text-gray-200">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Has BP/N?</th>
              <th className="px-4 py-2 border">BP Number</th>
              <th className="px-4 py-2 border">Supplier Available?</th>
              <th className="px-4 py-2 border">Supplier Name</th>
              <th className="px-4 py-2 border">Supplier P/N</th>
              <th className="px-4 py-2 border">Qualification Status</th>
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((item, index) => (
              <tr key={index} className="bg-white dark:bg-gray-800 border-t">
                <td className="px-4 py-2 border">
                  <Input
                    value={item.name}
                    onChange={(value) => handleChange(index, "name", value)}
                    placeholder="Enter Name"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <Select
                    label={""}
                    options={yesNoOptions}
                    value={item.hasBp}
                    onChange={(value) => handleChange(index, "hasBp", value)}
                  />
                </td>
                <td className="px-4 py-2 border">
                  {item.hasBp === "Yes" && (
                    <Input
                      label={""}
                      value={item.bpNumber}
                      onChange={(value) =>
                        handleChange(index, "bpNumber", value)
                      }
                      placeholder="Enter BP Number"
                    />
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {item.hasBp === "No" && (
                    <Select
                      label={""}
                      options={yesNoOptions}
                      value={item.hasSupplier}
                      onChange={(value) =>
                        handleChange(index, "hasSupplier", value)
                      }
                    />
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {item.hasBp === "No" && item.hasSupplier === "Yes" && (
                    <Input
                      label={""}
                      value={item.supplierName}
                      onChange={(value) =>
                        handleChange(index, "supplierName", value)
                      }
                      placeholder="Supplier Name"
                    />
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {item.hasBp === "No" && item.hasSupplier === "Yes" && (
                    <Input
                      label={""}
                      value={item.supplierNumber}
                      onChange={(value) =>
                        handleChange(index, "supplierNumber", value)
                      }
                      placeholder="Supplier P/N"
                    />
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {item.hasBp === "No" && item.hasSupplier === "No" && (
                    <Select
                      label={"Qualification"}
                      options={qualificationOptions}
                      value={item.qualification}
                      onChange={(value) =>
                        handleChange(index, "qualification", value)
                      }
                    />
                  )}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleRemoveRow(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConditionalStudentTable;
