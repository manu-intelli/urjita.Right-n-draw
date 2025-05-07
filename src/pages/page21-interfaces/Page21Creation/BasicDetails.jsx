import React, { useState, useRef } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import {
  FormSection,
  Input,
  Select,
} from "../../../components/common/ReusableComponents";

const modelFamilyOptions = [
  { label: "Family A", value: "FamilyA" },
  { label: "FamilyB", value: "FamilyB" },
  { label: "Family C", value: "FamilyC" },
];
export const technologyOptions = [
  { label: "Lumped Technology", value: "lumped" },
  { label: "Ceramic Resonator Technology", value: "ceramic_resonators" },
  { label: "Thin Film", value: "thin_film" },
  { label: "DOCSIS Diplexer", value: "docs_diplexer" },
];

const BasicDetails = () => {
  const { state, dispatch } = usePage21Context();

  // Handle input changes
  const handleChange = (field, value) => {
    dispatch({
      type: "SET_FIELD",
      payload: { field, value },
    });
  };

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input
          label="OP Number"
          value={state.opNumber || ""}
          onChange={(value) => handleChange("opNumber", value)}
          required
        />
        <Input
          label="OPU Number"
          value={state.opuNumber || ""}
          onChange={(value) => handleChange("opuNumber", value)}
          required
        />
        <Input
          label="EDU Number"
          value={state.eduNumber || ""}
          onChange={(value) => handleChange("eduNumber", value)}
          required
        />

        <Select
          label="Model Family"
          value={state.modelFamily}
          options={modelFamilyOptions}
          onChange={(value) => handleChange("modelFamily", value)}
          required
        />

        <Input
          label="Model Name"
          value={state.modelName || ""}
          onChange={(value) => handleChange("modelName", value)}
          required
        />

        <Select
          label="Technology"
          value={state.technology}
          options={technologyOptions}
          onChange={(value) => handleChange("technology", value)}
          required
        />
      </div>
    </div>
  );
};

export default BasicDetails;
