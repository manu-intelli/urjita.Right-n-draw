import React, { useEffect } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, Select } from "../../../components/common/ReusableComponents";

const OtherDetails = () => {
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

export default OtherDetails;
