import React from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, Select } from "../../../components/common/ReusableComponents";

const PartDetails = ({ partIndex, partType }) => {
  const { state, dispatch } = usePage21Context();
  const item = state?.[partType]?.[partIndex] || {};

  const handleChange = (field, value) => {
    dispatch({
      type: "UPDATE_PART",
      partType,
      index: partIndex,
      payload: { [field]: value },
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
    <div className="grid gap-4">
      {/* Has BP/N? */}
      <Select
        label="Has BP/N?"
        value={item.hasBp || ""}
        options={yesNoOptions}
        onChange={(value) => handleChange("hasBp", value)}
        required
      />

      {/* BP Number */}
      {item.hasBp === "Yes" && (
        <Input
          label="BP Number"
          value={item.bpNumber || ""}
          onChange={(e) => handleChange("bpNumber", e.target.value)}
          required
        />
      )}

      {/* Supplier Available? */}
      <Select
        label="Supplier Available?"
        value={item.hasSupplier || ""}
        options={yesNoOptions}
        onChange={(value) => handleChange("hasSupplier", value)}
        required
      />

      {/* Supplier Number */}
      {item.hasSupplier === "Yes" && (
        <Input
          label="Supplier Number"
          value={item.supplierNumber || ""}
          onChange={(e) => handleChange("supplierNumber", e.target.value)}
          required
        />
      )}

      {/* Qualification Status */}
      <Select
        label="Qualification Status"
        value={item.qualification || ""}
        options={qualificationOptions}
        onChange={(value) => handleChange("qualification", value)}
        required
      />
    </div>
  );
};

export default PartDetails;
