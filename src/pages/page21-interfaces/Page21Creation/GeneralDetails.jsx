// import React from "react";
// import { usePage21Context } from "../../../context/Page21Context";

// const ProjectForm = () => {
//   const { state, dispatch } = usePage21Context();

//   return (
//     <div className="border p-4 rounded-md shadow-sm mb-6">
//       <h2 className="text-lg font-semibold mb-4">Shield Details</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         <Input
//           label="OP Number"
//           value={opNumber || ""}
//           onChange={(value) => handleChange("opNumber", value)}
//           required
//         />
//         <Input
//           label="OPU Number"
//           value={opuNumber || ""}
//           onChange={(value) => handleChange("opuNumber", value)}
//           required
//         />

//         <Input
//           label="EDU Number"
//           value={edcNumber || ""}
//           onChange={(value) => handleChange("edcNumber", value)}
//           required
//         />

//         <Select
//           label="Model Family"
//           value={modelFamily}
//           options={yesNoOptions}
//           onChange={(value) => handleOthersChange("modelFamily", value)}
//           required
//         />

//         <Input
//           label="Model Family"
//           value={numberOfShields || ""}
//           onChange={(value) => handleOthersChange("modelFamily", value)}
//           required
//         />

//         <Select
//           label="Impedance"
//           value={impedance}
//           options={yesNoOptions}
//           onChange={(value) => handleOthersChange("impedance", value)}
//           required
//         />
//         {shieldRequired === "Others" && (
//           <Input
//             label="Custom Impedance"
//             type="number"
//             value={CustomImpedance || ""}
//             onChange={(value) => handleOthersChange("CustomImpedance", value)}
//             required
//           />
//         )}

//         <Select
//           label="Package"
//           value={package}
//           options={yesNoOptions}
//           onChange={(value) => handleOthersChange("package", value)}
//           required
//         />
//     <div className="md:w-1/2">
//               <label className="block font-medium mb-1">Case Style</label>
//               <div className="flex gap-4">
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name={`coreType-${index}`}
//                     value="Existing"
//                     checked={item.coreType === "Existing"}
//                     onChange={() => handleChange("CaseStyle", "Existing")}
//                   />
//                   Existing
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name={`coreType-${index}`}
//                     value="ModifyExisting"
//                     checked={item.coreType === "ModifyExisting"}
//                     onChange={() => handleChange("CaseStyle", "ModifyExisting")}
//                   />
//                   Modify Existing
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name={`coreType-${index}`}
//                     value="New"
//                     checked={item.coreType === "New"}
//                     onChange={() => handleChange("CaseStyle", "New")}
//                   />
//                   Modify Existing
//                 </label>
//               </div>

// <Select
//           label="Bottom Solder Mask"
//           value={bottomSolderMask}
//           options={yesNoOptions}
//           onChange={(value) => handleOthersChange("bottomSolderMask", value)}
//           required
//         />

// <Select
//           label="halfMoonRequirement"
//           value={halfMoonRequirement}
//           options={yesNoOptions}
//           onChange={(value) => handleOthersChange("halfMoonRequirement", value)}
//           required
//         />
//           <Select
//           label="Via Holes Requirement"
//           value={viaHolesRequirement}
//           options={yesNoOptions}
//           onChange={(value) => handleOthersChange("viaHolesRequirement", value)}
//           required
//         />

// <Select
//           label="signal Passing"
//           value={signalPassing}
//           options={yesNoOptions}
//           onChange={(value) => handleOthersChange("signalPassing", value)}
//           required
//         />
//           <Select
//           label="Cover Type"
//           value={coverType}
//           options={yesNoOptions}
//           onChange={(value) => handleOthersChange("coverType", value)}
//           required
//         />
//              <Select
//           label="designRuleViolation"
//           value={designRuleViolation}
//           options={yesNoOptions}
//           onChange={(value) => handleOthersChange("designRuleViolation", value)}
//           required
//         />

// <div className="space-y-2 col-span-2">
//                     <label htmlFor="schematic" className="block text-sm font-medium text-gray-700 mb-2">
//                       Schematic
//                     </label>
//                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
//                       <div className="flex flex-col items-center">
//                         <input
//                           ref={fileInputRef}
//                           type="file"
//                           id="schematic"
//                           name="schematic"
//                           onChange={handleFileChange}
//                           accept=".pdf,.dwg,.dxf"
//                           className="w-full text-sm text-gray-500
//                             file:mr-4 file:py-2 file:px-4
//                             file:rounded-full file:border-0
//                             file:text-sm file:font-semibold
//                             file:bg-blue-50 file:text-blue-700
//                             hover:file:bg-blue-100"
//                         />
//                         <p className="mt-2 text-sm text-gray-500">
//                           Accepted formats: PDF, DWG, DXF
//                         </p>
//                         {projectDetails.schematicFile && (
//                           <div className="mt-4 w-full">
//                             <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
//                               <span className="text-sm text-gray-600">
//                                 {projectDetails.schematicFile.name}
//                               </span>
//                               <button
//                                 onClick={clearSchematic}
//                                 className="text-red-500 hover:text-red-700 text-sm font-medium"
//                               >
//                                 Remove
//                               </button>
//                             </div>
//                             {previewUrl && (
//                               <div className="mt-4">
//                                 <iframe
//                                   src={previewUrl}
//                                   className="w-full h-96 border border-gray-200 rounded-md"
//                                   title="Schematic Preview"
//                                 />
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

// <Input
//             label="similarModel"

//             value={similarModel || ""}
//             onChange={(value) => handleOthersChange("similarModel", value)}
//             required
//             />

//       </div>
//     </div>
//   );
// };

// export default ProjectForm;

import React, { useState, useRef } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, Select } from "../../../components/common/ReusableComponents";

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
      <h2 className="text-lg font-semibold mb-4">Shield Details</h2>

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
          options={yesNoOptions}
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
          options={yesNoOptions}
          onChange={(value) => handleChange("package", value)}
          required
        />

        <div className="md:w-1/2">
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
        </div>

        <Select
          label="Bottom Solder Mask"
          value={state.bottomSolderMask}
          options={yesNoOptions}
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
          options={yesNoOptions}
          onChange={(value) => handleChange("signalPassing", value)}
          required
        />
        <Select
          label="Cover Type"
          value={state.coverType}
          options={yesNoOptions}
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
