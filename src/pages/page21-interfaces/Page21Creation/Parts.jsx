import React from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, Select } from "../../../components/common/ReusableComponents";

const PartDetails = ({ item, index, partType }) => {
  const { dispatch } = usePage21Context();

  const handleChange = (field, value) => {
    dispatch({
      type: "UPDATE_PART",
      partType,
      index,
      field,
      value,
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
    <div  className=" grid gap-4 p-4 border rounded-md mb-4 bg-gray-50">
      <Select
        label="Has BP/N?"
        value={item.hasBp || ""}
        options={yesNoOptions}
        onChange={(value) => handleChange("hasBp", value)}
        required
      />

      <Input
        label="BP Number"
        value={item.bpNumber || ""}
        onChange={(e) => handleChange("bpNumber", e.target.value)}
        required
      />

      <Select
        label="Supplier Available?"
        value={item.hasSupplier || ""}
        options={yesNoOptions}
        onChange={(value) => handleChange("hasSupplier", value)}
        required
      />

      {item.hasSupplier === "Yes" && (
        <Input
          label="Supplier Number"
          value={item.supplierNumber || ""}
          onChange={(e) => handleChange("supplierNumber", e.target.value)}
          required
        />
      )}

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
