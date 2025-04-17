import React, { useEffect } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, Select } from "../../../components/common/ReusableComponents";
import { Trash2 } from "lucide-react";

const PartDetails = ({ item, index, partType }) => {
  const { dispatch } = usePage21Context();

  useEffect(() => {
    if (partType === "Transformer") {
      if (!item.coreType) {
        handleChange("coreType", "single");
      }
      if (!item.wireType) {
        handleChange("wireType", "single");
      }
    }
  }, []);

  const handleChange = (field, value) => {
    dispatch({
      type: "UPDATE_PART",
      partType,
      index,
      field,
      value,
    });

    if (field === "hasBp") {
      handleBulkChange(
        value === "Yes"
          ? {
              hasSupplier: "",
              supplierName: "",
              supplierNumber: "",
              qualification: "",
            }
          : { bpNumber: "" }
      );
    }

    if (field === "hasSupplier") {
      handleBulkChange(
        value === "Yes"
          ? { qualification: "" }
          : { supplierName: "", supplierNumber: "" }
      );
    }

    if (partType === "Transformer") {
      if (field === "coreType") {
        handleBulkChange({ coreBPN: value === "single" ? [""] : ["", ""] });
      }
      if (field === "wireType") {
        handleBulkChange({ wireGauge: value === "single" ? [""] : ["", ""] });
      }
    }
  };

  const handleBulkChange = (fields) => {
    dispatch({
      type: "UPDATE_PART_FIELDS",
      partType,
      index,
      fields,
    });
  };

  const handleArrayChange = (field, i, value) => {
    const updated = [...(item[field] || [])];
    updated[i] = value;
    dispatch({
      type: "UPDATE_PART",
      partType,
      index,
      field,
      value: updated,
    });
  };

  const handleRemovePart = () => {
    dispatch({
      type: "REMOVE_PART",
      partType,
      index,
    });
  };

  const yesNoOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const qualificationOptions = [
    { label: "Qualification", value: "Qualification" },
    { label: "Approval", value: "Approval" },
  ];

  return (
    <div className="border p-4 rounded-md shadow-sm mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold capitalize">
          {partType} {index + 1}
        </h3>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleRemovePart}
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Transformer-specific UI */}
      {partType === "Transformer" ? (
        <div className="grid grid-cols-1 gap-6">
          {/* Core Type and Core BP/N - Side by Side */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <label className="block font-medium mb-1">Core Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`coreType-${index}`}
                    value="single"
                    checked={item.coreType === "single"}
                    onChange={() => handleChange("coreType", "single")}
                  />
                  Single Core
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`coreType-${index}`}
                    value="double"
                    checked={item.coreType === "double"}
                    onChange={() => handleChange("coreType", "double")}
                  />
                  Double Core
                </label>
              </div>
            </div>

            <div className="md:w-1/2">
              {(item.coreBPN || []).map((val, i) => (
                <Input
                  key={i}
                  label={`Core BP/N ${item.coreBPN.length > 1 ? i + 1 : ""}`}
                  value={val}
                  onChange={(value) => handleArrayChange("coreBPN", i, value)}
                  required
                />
              ))}
            </div>
          </div>

          {/* Wire Type and Wire Gauge - Side by Side */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <label className="block font-medium mb-1">Wire Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`wireType-${index}`}
                    value="single"
                    checked={item.wireType === "single"}
                    onChange={() => handleChange("wireType", "single")}
                  />
                  Single Wire
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`wireType-${index}`}
                    value="double"
                    checked={item.wireType === "double"}
                    onChange={() => handleChange("wireType", "double")}
                  />
                  Double Wire
                </label>
              </div>
            </div>

            <div className="md:w-1/2">
              {(item.wireGauge || []).map((val, i) => (
                <Input
                  key={i}
                  label={`Wire Gauge ${item.wireGauge.length > 1 ? i + 1 : ""}`}
                  value={val}
                  onChange={(value) => handleArrayChange("wireGauge", i, value)}
                  required
                />
              ))}
            </div>
          </div>

          {/* Number of Turns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Number of Turns"
              value={item.numberOfTurns || ""}
              onChange={(value) => handleChange("numberOfTurns", value)}
              required
            />
          </div>
        </div>
      ) : (
        // Generic UI
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Has BP/N?"
            value={item.hasBp || ""}
            options={yesNoOptions}
            onChange={(value) => handleChange("hasBp", value)}
            required
          />
          {item.hasBp === "Yes" && (
            <Input
              label="BP Number"
              value={item.bpNumber || ""}
              onChange={(value) => handleChange("bpNumber", value)}
              required
            />
          )}
          {item.hasBp === "No" && (
            <>
              <Select
                label="Supplier Available?"
                value={item.hasSupplier || ""}
                options={yesNoOptions}
                onChange={(value) => handleChange("hasSupplier", value)}
                required
              />
              {item.hasSupplier === "Yes" && (
                <>
                  <Input
                    label="Supplier Name"
                    value={item.supplierName || ""}
                    onChange={(value) => handleChange("supplierName", value)}
                    required
                  />
                  <Input
                    label="Supplier P/N"
                    value={item.supplierNumber || ""}
                    onChange={(value) => handleChange("supplierNumber", value)}
                    required
                  />
                </>
              )}
              {item.hasSupplier === "No" && (
                <Select
                  label="Qualification Status"
                  value={item.qualification || ""}
                  options={qualificationOptions}
                  onChange={(value) => handleChange("qualification", value)}
                  required
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PartDetails;
