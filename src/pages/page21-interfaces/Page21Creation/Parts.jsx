import React from "react";
import { usePartContext } from "./PartContext";
import { Input, Select } from "../../../components/common/ReusableComponents";

const PartDetails = ({ type, index, item }) => {
  const { dispatch } = usePartContext();

  const handleChange = (field, value) => {
    dispatch({
      type: "UPDATE_PART",
      partType: type,
      index,
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
    <div>
      {/* Has BP/N? */}
      <Select
        label="Has BP/N?"
        value={item.hasBp}
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
        value={item.hasSupplier}
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
        value={item.qualification}
        options={qualificationOptions}
        onChange={(value) => handleChange("qualification", value)}
        required
      />
    </div>
  );
};

export default PartDetails;
