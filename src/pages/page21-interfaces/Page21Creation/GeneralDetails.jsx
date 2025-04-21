

import React, { useState, useRef } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, Select } from "../../../components/common/ReusableComponents";


const impedanceOptions = [
  { label: '50 ohms', value: '50 ohms' },
  { label: '75 ohms', value: '75 ohms' },
  { label: 'Others', value: 'Others' }
];

const packageOptions = [
  { label: 'SMT', value: 'SMT' },
  { label: 'Connectorized', value: 'Connectorized' },
  { label: 'Lead', value: 'Lead' },
  { label: 'Plug-in', value: 'Plug-in' }
];

const existingCaseStyles = [
  { label: 'Case A', value: 'Case A' },
  { label: 'Case B', value: 'Case B' },
  { label: 'Case C', value: 'Case C' },
  { label: 'Case D', value: 'Case D' }
];

const coverTypeOptions = [
  { label: 'Open', value: 'Open' },
  { label: 'Closed', value: 'Closed' }
];

const bottomSolderMaskOptions = [
  { label: 'Full solder mask', value: 'Full solder mask' },
  { label: 'Strip solder mask', value: 'Strip solder mask' },
  { label: 'No solder mask', value: 'No solder mask' }
];

const yesNoOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' }
];

const signalPassingOptions = [
  { label: 'PCB', value: 'PCB' },
  { label: 'Lead', value: 'Lead' },
  { label: 'Pin', value: 'Pin' }
];

const pcbNameOptions = [
  { label: 'Base PCB', value: 'Base PCB' },
  { label: 'Coupling PCB', value: 'Coupling PCB' },
  { label: 'Other PCB', value: 'Other PCB' }
];

const mountingOrientationOptions = [
  { label: 'Horizontal', value: 'Horizontal' },
  { label: 'Vertical', value: 'Vertical' }
];

const canMaterialOptions = [
  { label: 'Metal', value: 'Metal' },
  { label: 'Plastic', value: 'Plastic' },
  { label: 'Ceramic', value: 'Ceramic' },
  { label: 'Others', value: 'Others' }
];

const canMakingProcessOptions = [
  { label: 'Etched', value: 'Etched' },
  { label: 'Stamped', value: 'Stamped' }
];

const qualificationOptions = [
  { label: 'Qualification', value: 'Qualification' },
  { label: 'Approval', value: 'Approval' }
];


const ProjectForm = () => {
  const { state, dispatch } = usePage21Context();
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);
  // Handle input changes
  const handleChange = (field, value) => {
    dispatch({
      type: "SET_FIELD",
      payload: { field, value },
    });
  };

  // Handle case dimension changes
  const handleCaseDimensionsChange = (field, value) => {
    dispatch({
      type: "SET_CASE_DIMENSIONS",
      payload: { field, value },
    });
  };

  // Handle file changes (for schematic file)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch({
        type: "SET_FILE",
        payload: { file },
      });
      if (file.type === "application/pdf") {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const clearSchematic = () => {
    dispatch({
      type: "REMOVE_FILE",
    });
    // Clear file input field manually
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const yesNoOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  console.log("state.schematicFile.previewUrl", state.schematicFile);
  return (
    <div className="border p-4 rounded-md shadow-sm mb-6">
      {/* <h2 className="text-lg font-semibold mb-4">Shield Details</h2> */}

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
          options={yesNoOptions}
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
          label="Impedance"
          value={state.impedance}
          options={impedanceOptions}
          onChange={(value) => handleChange("impedance", value)}
          required
        />

        {state.impedance === "Others" && (
          <Input
            label="Custom Impedance"
            type="number"
            value={state.customImpedance || ""}
            onChange={(value) => handleChange("customImpedance", value)}
            required
          />
        )}

        <Select
          label="Package"
          value={state.package}
          options={packageOptions}
          onChange={(value) => handleChange("package", value)}
          required
        />

<div className="space-y-2 col-span-2">
          <label className="block font-medium mb-1">Case Style</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="caseStyle"
                value="Existing"
                checked={state.caseStyle === "Existing"}
                onChange={() => handleChange("caseStyle", "Existing")}
              />
              Existing
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="caseStyle"
                value="ModifyExisting"
                checked={state.caseStyle === "ModifyExisting"}
                onChange={() => handleChange("caseStyle", "ModifyExisting")}
              />
              Modify Existing
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="caseStyle"
                value="New"
                checked={state.caseStyle === "New"}
                onChange={() => handleChange("caseStyle", "New")}
              />
              New
            </label>
          </div>
          <Select
          label="Selected Case Style"
          value={state.selectedCaseStyle}
          options={existingCaseStyles}
          onChange={(value) => handleChange("selectedCaseStyle", value)}
          required
        />
{state?.selectedCaseStyle &&
          <div className="flex flex-col md:flex-row gap-6">      
            <Input
            label="length"
            type="number"
            value={state.caseDimensions?.length || ""}
            onChange={(value) => handleChange("customImpedance", value)}
            required
            disabled={state.caseStyle ==="Existing"}
          />

<Input
            label="width"
            type="number"
            value={state.caseDimensions.width || ""}
            onChange={(value) => handleChange("customImpedance", value)}
            required
            disabled={state.caseStyle ==="Existing"}
          />
           <Input
            label="height"
            type="number"
            value={state.caseDimensions.height || ""}
            onChange={(value) => handleChange("customImpedance", value)}
            required
            disabled={state.caseStyle ==="Existing"}
          />
          </div>
}
        </div>

        <Select
          label="Bottom Solder Mask"
          value={state.bottomSolderMask}
          options={bottomSolderMaskOptions}
          onChange={(value) => handleChange("bottomSolderMask", value)}
          required
        />
        <Select
          label="Half Moon Requirement"
          value={state.halfMoonRequirement}
          options={yesNoOptions}
          onChange={(value) => handleChange("halfMoonRequirement", value)}
          required
        />
        <Select
          label="Via Holes Requirement"
          value={state.viaHolesRequirement}
          options={yesNoOptions}
          onChange={(value) => handleChange("viaHolesRequirement", value)}
          required
        />
        <Select
          label="Signal Passing"
          value={state.signalPassing}
          options={signalPassingOptions}
          onChange={(value) => handleChange("signalPassing", value)}
          required
        />
        <Select
          label="Cover Type"
          value={state.coverType}
          options={coverTypeOptions}
          onChange={(value) => handleChange("coverType", value)}
          required
        />
        <Select
          label="Design Rule Violation"
          value={state.designRuleViolation}
          options={yesNoOptions}
          onChange={(value) => handleChange("designRuleViolation", value)}
          required
        />

        <div className="space-y-2 col-span-2">
          <label
            htmlFor="schematic"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Schematic
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
            <div className="flex flex-col items-center">
              <input
                type="file"
                id="schematic"
                name="schematic"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.dwg,.dxf"
                className="w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              <p className="mt-2 text-sm text-gray-500">
                Accepted formats: PDF, DWG, DXF
              </p>
              {state.schematicFile && (
                <div className="mt-4 w-full">
                  <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                    <span className="text-sm text-gray-600">
                      {state.schematicFile.name}
                    </span>
                    <button
                      onClick={clearSchematic}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                  {previewUrl && (
                    <div className="mt-4">
                      <iframe
                        src={previewUrl}
                        className="w-full h-96 border border-gray-200 rounded-md"
                        title="Schematic Preview"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <Input
          label="Similar Model"
          value={state.similarModel || ""}
          onChange={(value) => handleChange("similarModel", value)}
          required
        />
      </div>
    </div>
  );
};

export default ProjectForm;
