// import React, { useState, useRef } from "react";
// import { usePage21Context } from "../../../context/Page21Context";
// import {
//   Input,
//   Select,
//   TextArea,
// } from "../../../components/common/ReusableComponents";

// const impedanceOptions = [
//   { label: "50 ohms", value: "50 ohms" },
//   { label: "75 ohms", value: "75 ohms" },
//   { label: "Others", value: "Others" },
// ];
// const modelFamilyOptions = [
//   { label: "Family A", value: "FamilyA" },
//   { label: "FamilyB", value: "FamilyB" },
//   { label: "Family C", value: "FamilyC" },
// ];

// const packageOptions = [
//   { label: "SMT", value: "SMT" },
//   { label: "Connectorized", value: "Connectorized" },
//   { label: "Lead", value: "Lead" },
//   { label: "Plug-in", value: "Plug-in" },
// ];

// const existingCaseStyles = [
//   { label: "Case A", value: "Case A" },
//   { label: "Case B", value: "Case B" },
//   { label: "Case C", value: "Case C" },
//   { label: "Case D", value: "Case D" },
// ];

// const coverTypeOptions = [
//   { label: "Open", value: "Open" },
//   { label: "Closed", value: "Closed" },
// ];

// const bottomSolderMaskOptions = [
//   { label: "Full solder mask", value: "Full solder mask" },
//   { label: "Strip solder mask", value: "Strip solder mask" },
//   { label: "No solder mask", value: "No solder mask" },
// ];

// const yesNoOptions = [
//   { label: "Yes", value: "Yes" },
//   { label: "No", value: "No" },
// ];

// const signalPassingOptions = [
//   { label: "PCB", value: "PCB" },
//   { label: "Lead", value: "Lead" },
//   { label: "Pin", value: "Pin" },
// ];

// const pcbNameOptions = [
//   { label: "Base PCB", value: "Base PCB" },
//   { label: "Coupling PCB", value: "Coupling PCB" },
//   { label: "Other PCB", value: "Other PCB" },
// ];

// const mountingOrientationOptions = [
//   { label: "Horizontal", value: "Horizontal" },
//   { label: "Vertical", value: "Vertical" },
// ];

// const canMaterialOptions = [
//   { label: "Metal", value: "Metal" },
//   { label: "Plastic", value: "Plastic" },
//   { label: "Ceramic", value: "Ceramic" },
//   { label: "Others", value: "Others" },
// ];

// const canMakingProcessOptions = [
//   { label: "Etched", value: "Etched" },
//   { label: "Stamped", value: "Stamped" },
// ];

// const qualificationOptions = [
//   { label: "Qualification", value: "Qualification" },
//   { label: "Approval", value: "Approval" },
// ];
// const connectorGenderOptions = [
//   { label: "Male", value: "Male" },
//   { label: "Female", value: "Female" },
// ];

// const GeneralDetails = () => {
//   const { state, dispatch } = usePage21Context();
//   const [previewUrl, setPreviewUrl] = useState("");
//   const fileInputRef = useRef(null);
//   // Handle input changes
//   const handleChange = (field, value) => {
//     dispatch({
//       type: "SET_FIELD",
//       payload: { field, value },
//     });
//   };

//   // Handle case dimension changes
//   const handleCaseDimensionsChange = (field, value) => {
//     dispatch({
//       type: "SET_CASE_DIMENSIONS",
//       payload: { field, value },
//     });
//   };

//   // Handle file changes (for schematic file)
//   // const handleFileChange = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     dispatch({
//   //       type: "SET_FILE",
//   //       payload: { file },
//   //     });
//   //     if (file.type === "application/pdf") {
//   //       const url = URL.createObjectURL(file);
//   //       setPreviewUrl(url);
//   //     } else {
//   //       setPreviewUrl(null);
//   //     }
//   //   }
//   // };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       dispatch({
//         type: "SET_FILE",
//         payload: { file },
//       });

//       const isPreviewable =
//         file.type === "application/pdf" || file.type.startsWith("image/");

//       if (isPreviewable) {
//         const url = URL.createObjectURL(file);
//         setPreviewUrl(url);
//       } else {
//         setPreviewUrl(null);
//       }
//     }
//   };

//   const clearSchematic = () => {
//     dispatch({
//       type: "REMOVE_FILE",
//     });
//     // Clear file input field manually
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleNumberOfPortsChange = (field, value) => {
//     if (field === "numberOfPorts") {
//       dispatch({ type: "SET_NUMBER_OF_PORTS", value });
//     } else {
//       dispatch({ type: "SET_FIELD", payload: { field, value } });
//     }
//   };

//   const handlePortChange = (index, field, value) => {
//     dispatch({
//       type: "UPDATE_PORT",
//       index,
//       field,
//       value,
//     });
//   };

//   const handleEnclosureChange = (field, value) => {
//     dispatch({
//       type: "UPDATE_ENCLOSURE_DETAILS",
//       field: field,
//       value: value,
//     });
//   };

//   const handleTopcoverChange = (field, value) => {
//     dispatch({
//       type: "UPDATE_TOPCOVER_DETAILS",
//       field: field,
//       value: value,
//     });
//   };

//   console.log("state.schematicFile.previewUrl", state.schematicFile);
//   return (
//     <div className="border p-4 rounded-md shadow-sm mb-6">
//       {/* <h2 className="text-lg font-semibold mb-4">Shield Details</h2> */}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         <div className="w-1/2">
//           <Select
//             label="Impedance"
//             value={state.impedance}
//             options={impedanceOptions}
//             onChange={(value) => handleChange("impedance", value)}
//             required
//           />
//         </div>
//         {state.impedance === "Others" && (
//           <div className="w-1/2">
//             <Input
//               label="Custom Impedance"
//               type="number"
//               value={state.customImpedance || ""}
//               onChange={(value) => handleChange("customImpedance", value)}
//               required
//             />
//           </div>
//         )}
//         <div className="w-1/2">
//           <Select
//             label="Interfaces"
//             value={state.interfaces}
//             options={packageOptions}
//             onChange={(value) => handleChange("interfaces", value)}
//             required
//           />
//         </div>
//         {state.interfaces === "Connectorized" && (
//           <>
//             <Input
//               label="Number of Ports"
//               type="number"
//               value={state.ports.numberOfPorts || ""}
//               onChange={(value) =>
//                 handleNumberOfPortsChange("numberOfPorts", value)
//               }
//               max={6}
//             />

//             {/* Render Ports */}
//             {Array.isArray(state.ports.portDetails) &&
//               state.ports.portDetails.map((port, index) => {
//                 const portLabel =
//                   state.ports.numberOfPorts === 2
//                     ? index === 0
//                       ? "Input Port"
//                       : "Output Port"
//                     : index === 0
//                     ? "Input Port"
//                     : `Channel ${index}`;

//                 return (
//                   <div key={index}>
//                     <h3>{portLabel}</h3>

//                     <Input
//                       label="Connector Type"
//                       value={port.connectorType}
//                       onChange={(value) =>
//                         handlePortChange(index, "connectorType", value)
//                       }
//                     />

//                     <Select
//                       label="Connector Gender"
//                       options={connectorGenderOptions}
//                       value={port.connectorGender}
//                       onChange={(value) =>
//                         handlePortChange(index, "connectorGender", value)
//                       }
//                     />
//                   </div>
//                 );
//               })}

//             {/* Core Type */}

//             {/* Enclosure Details */}
//             <div className="flex flex-col md:flex-row gap-6 mt-6">
//               <div className="md:w-1/2">
//                 <label className="block font-medium mb-1">
//                   Enclosure Details
//                 </label>
//                 <div className="flex gap-4">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name={`enclosureDetails1`}
//                       value="Existing"
//                       checked={state.enclosureDetails.partType === "Existing"}
//                       onChange={() =>
//                         handleEnclosureChange("partType", "Existing")
//                       }
//                       className="form-radio text-blue-600"
//                     />
//                     Existing
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name={`enclosureDetails2`}
//                       value="New"
//                       checked={state.enclosureDetails.partType === "New"}
//                       onChange={() => handleEnclosureChange("partType", "New")}
//                       className="form-radio text-blue-600"
//                     />
//                     New
//                   </label>
//                 </div>
//               </div>

//               <div className="md:w-1/2">
//                 <Input
//                   label="Enclosure Part Number"
//                   value={
//                     state.enclosureDetails.partType === "New"
//                       ? "TBD"
//                       : state.enclosureDetails.partNumber
//                   }
//                   onChange={(value) =>
//                     handleEnclosureChange(
//                       "partNumber",
//                       state.enclosureDetails.partType === "New" ? "TBD" : value
//                     )
//                   }
//                   disabled={state.enclosureDetails.partType === "New"}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Topcover Details */}
//             <div className="flex flex-col md:flex-row gap-6 mt-6">
//               <div className="md:w-1/2">
//                 <label className="block font-medium mb-1">
//                   Topcover Details
//                 </label>
//                 <div className="flex gap-4">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name={`topcoverType1`}
//                       value="Existing"
//                       checked={state.topcoverDetails.partType === "Existing"}
//                       onChange={() =>
//                         handleTopcoverChange("partType", "Existing")
//                       }
//                       className="form-radio text-blue-600"
//                     />
//                     Existing
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name={`topcoverType2`}
//                       value="New"
//                       checked={state.topcoverDetails.partType === "New"}
//                       onChange={() => handleTopcoverChange("partType", "New")}
//                       className="form-radio text-blue-600"
//                     />
//                     New
//                   </label>
//                 </div>
//               </div>

//               <div className="md:w-1/2">
//                 <Input
//                   label="Topcover Part Number"
//                   value={
//                     state.topcoverDetails.partType === "New"
//                       ? "TBD"
//                       : state.topcoverDetails?.partNumber
//                   }
//                   onChange={(value) =>
//                     handleTopcoverChange(
//                       "partNumber",
//                       state.topcoverDetails.partType === "New" ? "TBD" : value
//                     )
//                   }
//                   disabled={state.topcoverDetails.partType === "New"}
//                   required
//                 />
//               </div>
//             </div>
//           </>
//         )}

//         <div className="space-y-2 col-span-2">
//           <label className="block font-medium mb-1">Case Style</label>
//           <div className="flex gap-4">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="caseStyle"
//                 value="Existing"
//                 checked={state.caseStyle === "Existing"}
//                 onChange={() => handleChange("caseStyle", "Existing")}
//               />
//               Existing
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="caseStyle"
//                 value="ModifyExisting"
//                 checked={state.caseStyle === "ModifyExisting"}
//                 onChange={() => handleChange("caseStyle", "ModifyExisting")}
//               />
//               Modify Existing
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="caseStyle"
//                 value="New"
//                 checked={state.caseStyle === "New"}
//                 onChange={() => handleChange("caseStyle", "New")}
//               />
//               New
//             </label>
//           </div>
//           {state?.caseStyle !== "New" && (
//             <>
//               <Select
//                 label="Selected Case Style"
//                 value={state.selectedCaseStyle}
//                 options={existingCaseStyles}
//                 onChange={(value) => handleChange("selectedCaseStyle", value)}
//                 required
//               />

//               <div className="md:col-span-2">
//                 <TextArea
//                   label="PinOuts"
//                   value={state?.caseDimensions?.pinOuts || ""}
//                   onChange={(value) =>
//                     handleCaseDimensionsChange("pinOuts", Number(value))
//                   }
//                   required
//                   disabled={state.caseStyle === "Existing"}
//                   multiline
//                 />
//               </div>
//             </>
//           )}
//           {state?.caseStyle === "New" && (
//             <div className="flex flex-col md:flex-row gap-6">
//               <Input
//                 label="length"
//                 type="number"
//                 value={state.caseDimensions?.length || ""}
//                 onChange={(value) =>
//                   handleCaseDimensionsChange("length", Number(value))
//                 }
//                 required
//                 disabled={state.caseStyle === "Existing"}
//               />

//               <Input
//                 label="width"
//                 type="number"
//                 value={state.caseDimensions.width || ""}
//                 onChange={(value) =>
//                   handleCaseDimensionsChange("width", Number(value))
//                 }
//                 required
//                 disabled={state.caseStyle === "Existing"}
//               />
//               <Input
//                 label="height"
//                 type="number"
//                 value={state.caseDimensions.height || ""}
//                 onChange={(value) =>
//                   handleCaseDimensionsChange("height", Number(value))
//                 }
//                 required
//                 disabled={state.caseStyle === "Existing"}
//               />
//             </div>
//           )}
//         </div>
//         {state?.technology !== "docs_diplexer" && (
//           <>
//             <Select
//               label="Bottom Solder Mask"
//               value={state.bottomSolderMask}
//               options={bottomSolderMaskOptions}
//               onChange={(value) => handleChange("bottomSolderMask", value)}
//               required
//             />
//             <Select
//               label="Half Moon Requirement"
//               value={state.halfMoonRequirement}
//               options={yesNoOptions}
//               onChange={(value) => handleChange("halfMoonRequirement", value)}
//               required
//             />
//             <Select
//               label="Via Holes Requirement"
//               value={state.viaHolesRequirement}
//               options={yesNoOptions}
//               onChange={(value) => handleChange("viaHolesRequirement", value)}
//               required
//             />
//             <Select
//               label="Signal Launch Type"
//               value={state.signalLaunchType}
//               options={signalPassingOptions}
//               onChange={(value) => handleChange("signalLaunchType", value)}
//               required
//             />
//           </>
//         )}
//         <Select
//           label="Cover Type"
//           value={state.coverType}
//           options={coverTypeOptions}
//           onChange={(value) => handleChange("coverType", value)}
//           required
//         />

//         {state?.technology !== "docs_diplexer" && (
//           <>
//             <Select
//               label="Design Rule Violation"
//               value={state.designRuleViolation}
//               options={yesNoOptions}
//               onChange={(value) => handleChange("designRuleViolation", value)}
//               required
//             />

//             <div className="space-y-2 col-span-2">
//               <label
//                 htmlFor="schematic"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Schematic
//               </label>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
//                 <div className="flex flex-col items-center">
//                   <input
//                     type="file"
//                     id="schematic"
//                     name="schematic"
//                     ref={fileInputRef}
//                     onChange={handleFileChange}
//                     accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png"
//                     className="w-full text-sm text-gray-500
//                   file:mr-4 file:py-2 file:px-4
//                   file:rounded-full file:border-0
//                   file:text-sm file:font-semibold
//                   file:bg-blue-50 file:text-blue-700
//                   hover:file:bg-blue-100"
//                   />
//                   <p className="mt-2 text-sm text-gray-500">
//                     Accepted formats: PDF, DWG, DXF,IMG
//                   </p>
//                   {state.schematicFile && (
//                     <div className="mt-4 w-full">
//                       <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
//                         <span className="text-sm text-gray-600">
//                           {state.schematicFile.name}
//                         </span>
//                         <button
//                           onClick={clearSchematic}
//                           className="text-red-500 hover:text-red-700 text-sm font-medium"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                       {previewUrl && (
//                         <div className="mt-4">
//                           <iframe
//                             src={previewUrl}
//                             className="w-full h-96 border border-gray-200 rounded-md"
//                             title="Schematic Preview"
//                           />
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <Input
//               label="Similar Model"
//               value={state.similarModel || ""}
//               onChange={(value) => handleChange("similarModel", value)}
//               required
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GeneralDetails;

import React, { useState, useRef } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import {
  Input,
  Select,
  TextArea,
} from "../../../components/common/ReusableComponents";

const impedanceOptions = [
  { label: "50 ohms", value: "50 ohms" },
  { label: "75 ohms", value: "75 ohms" },
  { label: "Others", value: "Others" },
];

const packageOptions = [
  { label: "SMT", value: "SMT" },
  { label: "Connectorized", value: "Connectorized" },
  { label: "Lead", value: "Lead" },
  { label: "Plug-in", value: "Plug-in" },
];

const existingCaseStyles = [
  { label: "Case A", value: "Case A" },
  { label: "Case B", value: "Case B" },
  { label: "Case C", value: "Case C" },
  { label: "Case D", value: "Case D" },
];

const coverTypeOptions = [
  { label: "Open", value: "Open" },
  { label: "Closed", value: "Closed" },
];

const bottomSolderMaskOptions = [
  { label: "Full solder mask", value: "Full solder mask" },
  { label: "Strip solder mask", value: "Strip solder mask" },
  { label: "No solder mask", value: "No solder mask" },
];

const yesNoOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const signalPassingOptions = [
  { label: "PCB", value: "PCB" },
  { label: "Lead", value: "Lead" },
  { label: "Pin", value: "Pin" },
];

const connectorGenderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

const GeneralDetails = () => {
  const { state, dispatch } = usePage21Context();
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  // Handler functions (keep all your existing handlers exactly as they were)
  const handleChange = (field, value) => {
    dispatch({ type: "SET_FIELD", payload: { field, value } });
  };

  const handleCaseDimensionsChange = (field, value) => {
    dispatch({ type: "SET_CASE_DIMENSIONS", payload: { field, value } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch({ type: "SET_FILE", payload: { file } });
      const isPreviewable =
        file.type === "application/pdf" || file.type.startsWith("image/");
      if (isPreviewable) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const clearSchematic = () => {
    dispatch({ type: "REMOVE_FILE" });
    if (fileInputRef.current) fileInputRef.current.value = "";
    setPreviewUrl(null);
  };

  const handleNumberOfPortsChange = (field, value) => {
    if (field === "numberOfPorts") {
      // Allow empty string to let user clear the input
      if (value === "") {
        dispatch({ type: "SET_NUMBER_OF_PORTS", value: "" });
        return;
      }

      const parsed = parseInt(value, 10);

      // Ignore invalid numbers or numbers out of allowed range
      if (isNaN(parsed) || parsed < 2 || parsed > 6) return;

      dispatch({ type: "SET_NUMBER_OF_PORTS", value: parsed });
    } else {
      dispatch({ type: "SET_FIELD", payload: { field, value } });
    }
  };

  const handlePortChange = (index, field, value) => {
    dispatch({ type: "UPDATE_PORT", index, field, value });
  };

  const handleEnclosureChange = (field, value) => {
    dispatch({ type: "UPDATE_ENCLOSURE_DETAILS", field, value });
  };

  const handleTopcoverChange = (field, value) => {
    dispatch({ type: "UPDATE_TOPCOVER_DETAILS", field, value });
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white p-4 shadow-sm">
      {/* Main Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-3">
          {/* Impedance */}
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Impedance"
              value={state.impedance}
              options={impedanceOptions}
              onChange={(value) => handleChange("impedance", value)}
              required
              compact
            />

            <Select
              label="Interfaces"
              value={state.interfaces}
              options={packageOptions}
              onChange={(value) => handleChange("interfaces", value)}
              required
              compact
            />
          </div>

          {/* Interfaces with Connectorized Logic */}

          <div className="space-y-3">
            {state.impedance === "Others" && (
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Custom Impedance"
                  type="number"
                  value={state.customImpedance || ""}
                  onChange={(value) => handleChange("customImpedance", value)}
                  required
                  compact
                />
              </div>
            )}

            {state.interfaces === "Connectorized" && (
              <div className="space-y-2 pl-2 border-l-2 border-blue-100">
                <Input
                  label="Number of Ports"
                  type="number"
                  value={state.ports.numberOfPorts || ""}
                  onChange={(value) =>
                    handleNumberOfPortsChange("numberOfPorts", value)
                  }
                  max={6}
                  compact
                />

                {Array.isArray(state.ports.portDetails) &&
                  state.ports.portDetails.map((port, index) => {
                    const portLabel =
                      state.ports.numberOfPorts === 2
                        ? index === 0
                          ? "Input Port"
                          : "Output Port"
                        : index === 0
                        ? "Input Port"
                        : `Channel ${index}`;

                    return (
                      <div
                        key={index}
                        className="bg-gray-50 p-2 rounded-md space-y-2"
                      >
                        <h3 className="text-xs font-medium text-gray-600">
                          {portLabel}
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            label="Connector Type"
                            value={port.connectorType}
                            onChange={(value) =>
                              handlePortChange(index, "connectorType", value)
                            }
                            compact
                          />
                          <Select
                            label="Connector Gender"
                            options={connectorGenderOptions}
                            value={port.connectorGender}
                            onChange={(value) =>
                              handlePortChange(index, "connectorGender", value)
                            }
                            compact
                          />
                        </div>
                      </div>
                    );
                  })}

                {/* Enclosure & Topcover */}
                <div className="bg-blue-50 p-2 rounded-md space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <h3 className="text-xs font-medium text-gray-700">
                        Enclosure Details
                      </h3>
                      <div className="flex space-x-3">
                        {["Existing", "New"].map((option) => (
                          <label
                            key={option}
                            className="inline-flex items-center space-x-1.5"
                          >
                            <input
                              type="radio"
                              name={`enclosureType-${option}`}
                              value={option}
                              checked={
                                state.enclosureDetails.partType === option
                              }
                              onChange={() =>
                                handleEnclosureChange("partType", option)
                              }
                              className="h-3 w-3 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-700">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                      <Input
                        label="Part Number"
                        value={
                          state.enclosureDetails.partType === "New"
                            ? "TBD"
                            : state.enclosureDetails.partNumber
                        }
                        onChange={(value) =>
                          handleEnclosureChange(
                            "partNumber",
                            state.enclosureDetails.partType === "New"
                              ? "TBD"
                              : value
                          )
                        }
                        disabled={state.enclosureDetails.partType === "New"}
                        compact
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xs font-medium text-gray-700">
                        Topcover Details
                      </h3>
                      <div className="flex space-x-3">
                        {["Existing", "New"].map((option) => (
                          <label
                            key={option}
                            className="inline-flex items-center space-x-1.5"
                          >
                            <input
                              type="radio"
                              name={`topcoverType-${option}`}
                              value={option}
                              checked={
                                state.topcoverDetails.partType === option
                              }
                              onChange={() =>
                                handleTopcoverChange("partType", option)
                              }
                              className="h-3 w-3 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-700">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                      <Input
                        label="Part Number"
                        value={
                          state.topcoverDetails.partType === "New"
                            ? "TBD"
                            : state.topcoverDetails?.partNumber
                        }
                        onChange={(value) =>
                          handleTopcoverChange(
                            "partNumber",
                            state.topcoverDetails.partType === "New"
                              ? "TBD"
                              : value
                          )
                        }
                        disabled={state.topcoverDetails.partType === "New"}
                        compact
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Case Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Case Style
            </label>
            <div className="flex flex-wrap gap-2">
              {["Existing", "ModifyExisting", "New"].map((option) => (
                <label
                  key={option}
                  className="inline-flex items-center space-x-1.5"
                >
                  <input
                    type="radio"
                    name="caseStyle"
                    value={option}
                    checked={state.caseStyle === option}
                    onChange={() => handleChange("caseStyle", option)}
                    className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    {option === "ModifyExisting" ? "Modify Existing" : option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Case Style Details */}
          {state?.caseStyle !== "New" && state?.caseStyle && (
            <div className="space-y-2">
              <Select
                label="Selected Case Style"
                value={state.selectedCaseStyle}
                options={existingCaseStyles}
                onChange={(value) => handleChange("selectedCaseStyle", value)}
                required
                compact
              />
              <TextArea
                label="PinOuts"
                value={state?.caseDimensions?.pinOuts || ""}
                onChange={(value) =>
                  handleCaseDimensionsChange("pinOuts", Number(value))
                }
                required
                disabled={state.caseStyle === "Existing"}
                compact
                rows={2}
              />
            </div>
          )}
          {state?.caseStyle === "New" && (
            <div className="grid grid-cols-3 gap-2">
              <Input
                label="Length"
                type="number"
                value={state.caseDimensions?.length || ""}
                onChange={(value) =>
                  handleCaseDimensionsChange("length", Number(value))
                }
                required
                disabled={state.caseStyle === "Existing"}
                compact
              />
              <Input
                label="Width"
                type="number"
                value={state.caseDimensions.width || ""}
                onChange={(value) =>
                  handleCaseDimensionsChange("width", Number(value))
                }
                required
                disabled={state.caseStyle === "Existing"}
                compact
              />
              <Input
                label="Height"
                type="number"
                value={state.caseDimensions.height || ""}
                onChange={(value) =>
                  handleCaseDimensionsChange("height", Number(value))
                }
                required
                disabled={state.caseStyle === "Existing"}
                compact
              />
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {/* Case Dimensions */}

          {/* Technical Options */}
          {state?.technology !== "thin_film" && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Select
                  label="Bottom Solder Mask"
                  value={state.bottomSolderMask}
                  options={bottomSolderMaskOptions}
                  onChange={(value) => handleChange("bottomSolderMask", value)}
                  required
                  compact
                />
                <Select
                  label="Half Moon Requirement"
                  value={state.halfMoonRequirement}
                  options={yesNoOptions}
                  onChange={(value) =>
                    handleChange("halfMoonRequirement", value)
                  }
                  required
                  compact
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Select
                  label="Via Holes Requirement"
                  value={state.viaHolesRequirement}
                  options={yesNoOptions}
                  onChange={(value) =>
                    handleChange("viaHolesRequirement", value)
                  }
                  required
                  compact
                />
                <Select
                  label="Signal Launch Type"
                  value={state.signalLaunchType}
                  options={signalPassingOptions}
                  onChange={(value) => handleChange("signalLaunchType", value)}
                  required
                  compact
                />
              </div>
            </div>
          )}

          {/* Cover and Design Rules */}
          <div className="grid grid-cols-2 gap-2">
            <Select
              label="Cover Type"
              value={state.coverType}
              options={coverTypeOptions}
              onChange={(value) => handleChange("coverType", value)}
              required
              compact
            />
            {state?.technology !== "docs_diplexer" && (
              <Select
                label="Design Rule Violation"
                value={state.designRuleViolation}
                options={yesNoOptions}
                onChange={(value) => handleChange("designRuleViolation", value)}
                required
                compact
              />
            )}
          </div>

          {/* Similar Model */}
          {state?.technology !== "docs_diplexer" && (
            <Input
              label="Similar Model"
              value={state.similarModel || ""}
              onChange={(value) => handleChange("similarModel", value)}
              required
              compact
            />
          )}
        </div>
      </div>

      {/* Full-width Schematic Dropzone */}
      {state?.technology !== "docs_diplexer" && (
        <div className="mt-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Schematic
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
            <div className="text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png"
                className="hidden"
                id="schematic-upload"
              />
              <label
                htmlFor="schematic-upload"
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-xs text-gray-500">
                  Drag & drop files here or click to browse
                </p>
                <p className="text-xs text-gray-400">
                  Supported formats: PDF, DWG, DXF, JPG, PNG
                </p>
              </label>
            </div>
            {state.schematicFile && (
              <div className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded-md">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs font-medium text-gray-700 truncate max-w-xs">
                    {state.schematicFile.name}
                  </span>
                </div>
                <button
                  onClick={clearSchematic}
                  className="text-red-500 hover:text-red-700 text-xs font-medium"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          {previewUrl && (
            <div className="mt-4">
              {" "}
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
  );
};

export default GeneralDetails;
