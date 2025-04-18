// import React from "react";
// import {
//   Input,
//   Select,
//   TextArea,
// } from "../../../components/common/ReusableComponents";
// import { Trash2, Edit3 } from "lucide-react"; // Optional: Icon set

// const PCBDetailsForm = ({ pcb, index, onChange, onDelete, isBase }) => {
//   return (
//     <div className="border rounded-md p-4 mb-4 bg-white shadow">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="font-semibold text-lg">PCB {index + 1}</h3>
//         {!isBase && (
//           <button
//             onClick={() => onDelete(index)}
//             className="text-red-500 hover:text-red-700"
//             title="Delete PCB"
//           >
//             <Trash2 size={18} />
//           </button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {isBase ? (
//           <Input
//             label="PCB Name"
//             value={pcb.name}
//             onChange={(val) => onChange(index, "name", val)}
//             placeholder="Enter PCB Name"
//             disabled
//           />
//         ) : (
//           <Select
//             label="PCB Name"
//             value={pcb.name}
//             options={[
//               { label: "Coupling PCB", value: "Coupling PCB" },
//               { label: "Other PCB", value: "Other PCB" },
//             ]}
//             onChange={(val) => onChange(index, "name", val)}
//           />
//         )}

//         <Input
//           label="Material"
//           value={pcb.material}
//           onChange={(val) => onChange(index, "material", val)}
//           placeholder="Enter material"
//         />
//         <Input
//           label="Thickness"
//           value={pcb.thickness}
//           onChange={(val) => onChange(index, "thickness", val)}
//           placeholder="Enter thickness"
//         />
//         <Input
//           label="Layers"
//           value={pcb.layers}
//           onChange={(val) => onChange(index, "layers", val)}
//           placeholder="Enter number of layers"
//         />
//         <Select
//           label="Mounting Orientation"
//           value={pcb.mountingOrientation}
//           options={[
//             { label: "Horizontal", value: "Horizontal" },
//             { label: "Vertical", value: "Vertical" },
//           ]}
//           onChange={(value) => setCanProcess(value)}
//         />
//         <div className="md:col-span-2">
//           <TextArea
//             label="Comments"
//             value={pcb.comments}
//             onChange={(val) => onChange(index, "comments", val)}
//             multiline
//             required
//             placeholder="Add any additional comments"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const ComponentsDetails = () => {
//   const [canMaterial, setCanMaterial] = React.useState("");
//   const [canProcess, setCanProcess] = React.useState("");
//   const [pcbList, setPcbList] = React.useState([
//     {
//       name: "Base PCB",
//       material: "",
//       thickness: "",
//       layers: "",
//       mountingOrientation: "",
//       comments: "",
//     },
//   ]);

//   const handlePcbChange = (i, field, value) => {
//     const updated = [...pcbList];
//     updated[i][field] = value;
//     setPcbList(updated);
//   };

//   const addPCB = () => {
//     setPcbList([
//       ...pcbList,
//       { name: "", material: "", thickness: "", layers: "" },
//     ]);
//   };

//   const deletePCB = (index) => {
//     const updated = [...pcbList];
//     updated.splice(index, 1);
//     setPcbList(updated);
//   };

//   return (
//     <div className="p-6 bg-white shadow rounded-md">
//       {/* <h2 className="text-2xl font-bold mb-6">CAN</h2> */}

//       {/* CAN Section */}
//       <h3 className="text-xl font-semibold mb-4">CAN</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//         <Select
//           label="Material"
//           value={canMaterial}
//           options={[
//             { label: "Select Can Material", value: "" },
//             { label: "Aluminum", value: "Aluminum" },
//             { label: "Tin", value: "Tin" },
//           ]}
//           onChange={(value) => setCanMaterial(value)}
//         />
//         <Select
//           label="Can Making Process"
//           value={canProcess}
//           options={[
//             { label: "Deep Drawing", value: "Deep Drawing" },
//             { label: "Impact Extrusion", value: "Impact Extrusion" },
//           ]}
//           onChange={(value) => setCanProcess(value)}
//         />
//       </div>

//       {/* PCB Section */}
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-xl font-semibold">PCB Details</h3>
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded flex items-center gap-2"
//           onClick={addPCB}
//         >
//           <span className="text-lg font-bold">+</span> Add PCB
//         </button>
//       </div>

//       {pcbList.map((pcb, index) => (
//         <PCBDetailsForm
//           key={index}
//           index={index}
//           pcb={pcb}
//           onChange={handlePcbChange}
//           onDelete={deletePCB}
//           isBase={index === 0}
//         />
//       ))}
//     </div>
//   );
// };

// export default ComponentsDetails;

import { Trash2 } from "lucide-react";
import {
  Input,
  Select,
  TextArea,
} from "../../../components/common/ReusableComponents";
import { usePage21Context } from "../../../context/Page21Context"; // adjust path as needed

const ComponentsDetails = () => {
  const { state, dispatch } = usePage21Context();
  const { canMaterial, canProcess, pcbList } = state;

  const handlePcbChange = (i, field, value) => {
    const updated = [...pcbList];
    updated[i][field] = value;
    dispatch({ type: "SET_PCB_LIST", payload: updated });
  };

  const addPCB = () => {
    const updated = [
      ...pcbList,
      {
        name: "",
        material: "",
        thickness: "",
        layers: "",
        mountingOrientation: "",
        comments: "",
      },
    ];
    dispatch({ type: "SET_PCB_LIST", payload: updated });
  };

  const deletePCB = (index) => {
    const updated = pcbList.filter((_, i) => i !== index);
    dispatch({ type: "SET_PCB_LIST", payload: updated });
  };

  const PCBDetailsForm = ({ pcb, index, onChange, onDelete, isBase }) => {
    return (
      <div className="border rounded-md p-4 mb-4 bg-white shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">PCB {index + 1}</h3>
          {!isBase && (
            <button
              onClick={() => onDelete(index)}
              className="text-red-500 hover:text-red-700"
              title="Delete PCB"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isBase ? (
            <Input
              label="PCB Name"
              value={pcb.name}
              onChange={(val) => onChange(index, "name", val)}
              placeholder="Enter PCB Name"
              disabled
            />
          ) : (
            <Select
              label="PCB Name"
              value={pcb.name}
              options={[
                { label: "Coupling PCB", value: "Coupling PCB" },
                { label: "Other PCB", value: "Other PCB" },
              ]}
              onChange={(val) => onChange(index, "name", val)}
            />
          )}

          <Input
            label="Material"
            value={pcb.material}
            onChange={(val) => onChange(index, "material", val)}
            placeholder="Enter material"
          />
          <Input
            label="Thickness"
            value={pcb.thickness}
            onChange={(val) => onChange(index, "thickness", val)}
            placeholder="Enter thickness"
          />
          <Input
            label="Layers"
            value={pcb.layers}
            onChange={(val) => onChange(index, "layers", val)}
            placeholder="Enter number of layers"
          />
          <Select
            label="Mounting Orientation"
            value={pcb.mountingOrientation}
            options={[
              { label: "Horizontal", value: "Horizontal" },
              { label: "Vertical", value: "Vertical" },
            ]}
            onChange={(val) => onChange(index, "mountingOrientation", val)}
          />
          <div className="md:col-span-2">
            <TextArea
              label="Comments"
              value={pcb.comments}
              onChange={(val) => onChange(index, "comments", val)}
              placeholder="Add any additional comments"
              multiline
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h3 className="text-xl font-semibold mb-4">CAN</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Select
          label="Can Material"
          value={canMaterial}
          options={[
            { label: "Aluminum", value: "Aluminum" },
            { label: "Tin", value: "Tin" },
            { label: "Others", value: "Others" },
          ]}
          onChange={(value) =>
            dispatch({ type: "SET_CAN_MATERIAL", payload: value })
          }
        />
        <Select
          label="Can Making Process"
          value={canProcess}
          options={[
            { label: "Deep Drawing", value: "Deep Drawing" },
            { label: "Impact Extrusion", value: "Impact Extrusion" },
          ]}
          onChange={(value) => {
            if (val === "Others") {
              dispatch({ type: "SET_CAN_PROCESS", payload: "" });
            }
            dispatch({ type: "SET_CAN_PROCESS", payload: value });
          }}
        />
        {canMaterial === "Others" && (
          <Input
            label="Custom can Material"
            value={state.customCanMaterial || ""}
            onChange={(val) =>
              dispatch({ type: "SET_CUSTOM_CAN_MATERIAL", payload: val })
            }
            placeholder="Enter custom material"
          />
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">PCB Details</h3>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded flex items-center gap-2"
          onClick={addPCB}
        >
          <span className="text-lg font-bold">+</span> Add PCB
        </button>
      </div>

      {pcbList.map((pcb, index) => (
        <PCBDetailsForm
          key={index}
          index={index}
          pcb={pcb}
          onChange={handlePcbChange}
          onDelete={deletePCB}
          isBase={index === 0}
        />
      ))}
    </div>
  );
};

export default ComponentsDetails;
