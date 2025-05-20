// // import React from "react";
// // import { usePage21Context } from "../../../context/Page21Context";
// // import { Input, Select } from "../../../components/common/ReusableComponents";

// // const modelFamilyOptions = [
// //   { label: "Family A", value: "FamilyA" },
// //   { label: "FamilyB", value: "FamilyB" },
// //   { label: "Family C", value: "FamilyC" },
// // ];

// // export const technologyOptions = [
// //   { label: "Lumped Technology", value: "lumped" },
// //   { label: "Ceramic Resonator Technology", value: "ceramic_resonators" },
// //   { label: "Thin Film", value: "thin_film" },
// //   { label: "DOCSIS Diplexer", value: "docs_diplexer" },
// // ];

// // const BasicDetails = () => {
// //   const { state, dispatch } = usePage21Context();

// //   const handleChange = (field, value) => {
// //     dispatch({
// //       type: "SET_FIELD",
// //       payload: { field, value },
// //     });
// //   };

// //   return (
// //     <div className="p-6 bg-white shadow rounded-md">
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //         <Input
// //           label="OP Number"
// //           value={state.opNumber || ""}
// //           onChange={(value) => handleChange("opNumber", value)}
// //           required
// //         />
// //         <Input
// //           label="OPU Number"
// //           value={state.opuNumber || ""}
// //           onChange={(value) => handleChange("opuNumber", value)}
// //           required
// //         />
// //         <Input
// //           label="EDU Number"
// //           value={state.eduNumber || ""}
// //           onChange={(value) => handleChange("eduNumber", value)}
// //           required
// //         />
// //         <Select
// //           label="Model Family"
// //           value={state.modelFamily}
// //           options={modelFamilyOptions}
// //           onChange={(value) => handleChange("modelFamily", value)}
// //           required
// //         />
// //         <Input
// //           label="Model Name"
// //           value={state.modelName || ""}
// //           onChange={(value) => handleChange("modelName", value)}
// //           required
// //         />

// //         <Select
// //           label="Technology"
// //           value={state.technology}
// //           options={technologyOptions}
// //           onChange={(value) => handleChange("technology", value)}
// //           required
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default BasicDetails;

// import React, { useState, useEffect } from "react";
// import { usePage21Context } from "../../../context/Page21Context";
// import { Input, Select } from "../../../components/common/ReusableComponents";
// import {
//   CircuitBoard,
//   Cpu,
//   Zap,
//   Coins as Coil,
//   AudioWaveform as WaveformSine,
//   Radio,
//   Shield,
//   Fingerprint,
//   Square,
//   Box,
//   Plus,
// } from "lucide-react";

// const modelFamilyOptions = [
//   { label: "Family A", value: "FamilyA" },
//   { label: "FamilyB", value: "FamilyB" },
//   { label: "Family C", value: "FamilyC" },
// ];

// export const technologyOptions = [
//   { label: "Lumped Technology", value: "lumped" },
//   { label: "Ceramic Resonator Technology", value: "ceramic_resonators" },
//   { label: "Thin Film", value: "thin_film" },
//   { label: "DOCSIS Diplexer", value: "docs_diplexer" },
// ];

// const BasicDetails = () => {
//   const { state, dispatch } = usePage21Context();
//   const { selectedComponents = new Set() } = state;

//   const components = [
//     {
//       id: "pcb",
//       name: "PCB",
//       icon: CircuitBoard,
//       description: "Printed Circuit Board",
//     },
//     {
//       id: "can",
//       name: "CAN",
//       icon: Box,
//       description: "Controller Area Network",
//     },
//     {
//       id: "chip-capacitor",
//       name: "Chip Capacitor",
//       icon: Zap,
//       description: "Surface Mount Capacitor",
//     },
//     {
//       id: "chip-inductor",
//       name: "Chip Inductor",
//       icon: Coil,
//       description: "Surface Mount Inductor",
//     },
//     {
//       id: "chip-resistor",
//       name: "Chip Resistor",
//       icon: WaveformSine,
//       description: "Surface Mount Resistor",
//     },
//     {
//       id: "transformer",
//       name: "Transformer",
//       icon: Radio,
//       description: "Power Transformer",
//     },
//     {
//       id: "chip-resonator",
//       name: "Chip Resonator",
//       icon: Cpu,
//       description: "Crystal Resonator",
//     },
//     {
//       id: "aircoil",
//       name: "Aircoil",
//       icon: Coil,
//       description: "Air-core Inductor",
//     },
//     { id: "shield", name: "Shield", icon: Shield, description: "EMI Shield" },
//     {
//       id: "finger",
//       name: "Finger",
//       icon: Fingerprint,
//       description: "Contact Finger",
//     },
//     {
//       id: "copper-flap",
//       name: "Copper Flap",
//       icon: Square,
//       description: "Copper Connection",
//     },
//     {
//       id: "ltcc",
//       name: "LTCC",
//       icon: CircuitBoard,
//       description: "Low Temperature Co-fired Ceramic",
//     },
//     {
//       id: "others",
//       name: "Others",
//       icon: Plus,
//       description: "Other Components",
//     },
//   ];

//   const handleChange = (field, value) => {
//     dispatch({ type: "SET_FIELD", payload: { field, value } });
//   };

//   const toggleComponent = (id) => {
//     const newSelected = new Set(selectedComponents);
//     if (newSelected.has(id)) {
//       newSelected.delete(id);
//     } else {
//       newSelected.add(id);
//     }
//     setSelectedComponents(newSelected);

//     dispatch({
//       type: "SET_FIELD",
//       payload: { field: "selectedComponents", value: Array.from(newSelected) },
//     });
//   };

//   // Optional: if selectedComponents should be pre-filled from context
//   useEffect(() => {
//     if (state.selectedComponents && Array.isArray(state.selectedComponents)) {
//       setSelectedComponents(new Set(state.selectedComponents));
//     }
//   }, [state.selectedComponents]);

//   return (
//     <div className="space-y-6">
//       <div className="p-6 bg-white shadow rounded-md">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">
//           Basic Information
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           <Input
//             label="OP Number"
//             value={state.opNumber || ""}
//             onChange={(value) => handleChange("opNumber", value)}
//             required
//           />
//           <Input
//             label="OPU Number"
//             value={state.opuNumber || ""}
//             onChange={(value) => handleChange("opuNumber", value)}
//             required
//           />
//           <Input
//             label="EDU Number"
//             value={state.eduNumber || ""}
//             onChange={(value) => handleChange("eduNumber", value)}
//             required
//           />
//           <Select
//             label="Model Family"
//             value={state.modelFamily}
//             options={modelFamilyOptions}
//             onChange={(value) => handleChange("modelFamily", value)}
//             required
//           />
//           <Input
//             label="Model Name"
//             value={state.modelName || ""}
//             onChange={(value) => handleChange("modelName", value)}
//             required
//           />
//           <Select
//             label="Technology"
//             value={state.technology}
//             options={technologyOptions}
//             onChange={(value) => handleChange("technology", value)}
//             required
//           />
//         </div>
//       </div>

//       <div className="p-6 bg-white shadow-lg rounded-md">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">
//           Component Selection
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {components.map(({ id, name, icon: Icon, description }) => {
//             const isSelected = selectedComponents.has(id);
//             return (
//               <div
//                 key={id}
//                 onClick={() => toggleComponent(id)}
//                 className={`
//                   cursor-pointer rounded-xl p-6 transition-all duration-300 transform hover:scale-105
//                   ${
//                     isSelected
//                       ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }
//                 `}
//               >
//                 <div className="flex items-center space-x-4">
//                   <div
//                     className={`p-3 rounded-lg ${
//                       isSelected ? "bg-blue-600" : "bg-gray-200"
//                     }`}
//                   >
//                     <Icon
//                       size={24}
//                       className={isSelected ? "text-white" : "text-gray-700"}
//                     />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg">{name}</h3>
//                     <p className="text-sm opacity-75">{description}</p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="mt-8 p-6 bg-gray-100 rounded-lg">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">
//             Selected Components
//           </h2>
//           <div className="flex flex-wrap gap-3">
//             {Array.from(selectedComponents).length > 0 ? (
//               Array.from(selectedComponents).map((id) => {
//                 const component = components.find((c) => c.id === id);
//                 return (
//                   <span
//                     key={id}
//                     className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium"
//                   >
//                     {component?.name}
//                   </span>
//                 );
//               })
//             ) : (
//               <p className="text-gray-500 italic">No components selected</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BasicDetails;

import React, { useEffect } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, Select } from "../../../components/common/ReusableComponents";
import {
  CircuitBoard,
  Cpu,
  Zap,
  Coins as Coil,
  AudioWaveform as WaveformSine,
  Radio,
  Shield,
  Fingerprint,
  Square,
  Box,
  Plus,
} from "lucide-react";

export const COMPONENT_TYPES = Object.freeze({
  PCB: "pcb",
  CAN: "can",
  CHIP_CAPACITOR: "chip-capacitor",
  CHIP_INDUCTOR: "chip-inductor",
  CHIP_RESISTOR: "chip-resistor",
  TRANSFORMER: "transformer",
  CHIP_RESONATOR: "chip-resonator",
  AIR_COIL: "air-coil",
  SHIELD: "shield",
  FINGER: "finger",
  COPPER_FLAP: "copper-flap",
  LTCC: "ltcc",
  OTHER: "other",
});

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
  const { selectedComponents = [] } = state; // Now using array from context

  const components = [
    {
      id: COMPONENT_TYPES.PCB,
      name: "PCB",
      icon: CircuitBoard,
      description: "Printed Circuit Board",
    },
    {
      id: COMPONENT_TYPES.CAN,
      name: "CAN",
      icon: Box,
      description: "Controller Area Network",
    },
    {
      id: COMPONENT_TYPES.CHIP_CAPACITOR,
      name: "Chip Capacitor",
      icon: Zap,
      description: "Surface Mount Capacitor",
    },
    {
      id: COMPONENT_TYPES.CHIP_INDUCTOR,
      name: "Chip Inductor",
      icon: Coil,
      description: "Surface Mount Inductor",
    },
    {
      id: COMPONENT_TYPES.CHIP_RESISTOR,
      name: "Chip Resistor",
      icon: WaveformSine,
      description: "Surface Mount Resistor",
    },
    {
      id: COMPONENT_TYPES.TRANSFORMER,
      name: "Transformer",
      icon: Radio,
      description: "Power Transformer",
    },
    {
      id: COMPONENT_TYPES.CHIP_RESONATOR,
      name: "Chip Resonator",
      icon: Cpu,
      description: "Crystal Resonator",
    },
    {
      id: COMPONENT_TYPES.AIR_COIL,
      name: "Aircoil",
      icon: Coil,
      description: "Air-core Inductor",
    },
    {
      id: COMPONENT_TYPES.SHIELD,
      name: "Shield",
      icon: Shield,
      description: "EMI Shield",
    },
    {
      id: COMPONENT_TYPES.FINGER,
      name: "Finger",
      icon: Fingerprint,
      description: "Contact Finger",
    },
    {
      id: COMPONENT_TYPES.COPPER_FLAP,
      name: "Copper Flap",
      icon: Square,
      description: "Copper Connection",
    },
    {
      id: COMPONENT_TYPES.LTCC,
      name: "LTCC",
      icon: CircuitBoard,
      description: "Low Temperature Co-fired Ceramic",
    },
    {
      id: COMPONENT_TYPES.OTHER,
      name: "Others",
      icon: Plus,
      description: "Other Components",
    },
  ];

  const handleChange = (field, value) => {
    dispatch({ type: "SET_FIELD", payload: { field, value } });
  };

  const toggleComponent = (id) => {
    dispatch({ type: "TOGGLE_COMPONENT", payload: id });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white shadow rounded-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      <div className="p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Component Selection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {components.map(({ id, name, icon: Icon, description }) => {
            const isSelected = selectedComponents.includes(id);
            return (
              <div
                key={id}
                onClick={() => toggleComponent(id)}
                className={`
                  cursor-pointer rounded-xl p-6 transition-all duration-300 transform hover:scale-105
                  ${
                    isSelected
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-lg ${
                      isSelected ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <Icon
                      size={24}
                      className={isSelected ? "text-white" : "text-gray-700"}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{name}</h3>
                    <p className="text-sm opacity-75">{description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Selected Components
          </h2>
          <div className="flex flex-wrap gap-3">
            {selectedComponents.length > 0 ? (
              selectedComponents.map((id) => {
                const component = components.find((c) => c.id === id);
                return (
                  <span
                    key={id}
                    className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium"
                  >
                    {component?.name}
                  </span>
                );
              })
            ) : (
              <p className="text-gray-500 italic">No components selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
