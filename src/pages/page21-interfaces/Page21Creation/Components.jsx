import { Trash2 } from "lucide-react";
import {
  Input,
  Select,
  TextArea,
} from "../../../components/common/ReusableComponents";
import { usePage21Context } from "../../../context/Page21Context";

const ComponentsDetails = () => {
  const { state, dispatch } = usePage21Context();
  const {
    canMaterial,
    canProcess,
    pcbList,
    isExistingCanAvailable,
    bpNumber,
    customCanMaterial,
  } = state;

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

  const canMaterialOptions = [
    { label: "Metal", value: "Metal" },
    { label: "Plastic", value: "Plastic" },
    { label: "Ceramic", value: "Ceramic" },
    { label: "Others", value: "Others" },
  ];

  const canMakingProcessOptions = [
    { label: "Etched", value: "Etched" },
    { label: "Stamped", value: "Stamped" },
  ];

  const yesNoOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  // const PCBDetailsForm = ({ pcb, index, onChange, onDelete, isBase }) => (
  //   <div className="border rounded-md p-4 mb-4 bg-white shadow">
  //     <div className="flex justify-between items-center mb-4">
  //       <h3 className="font-semibold text-lg">PCB {index + 1}</h3>
  //       {!isBase && (
  //         <button
  //           onClick={() => onDelete(index)}
  //           className="text-red-500 hover:text-red-700"
  //           title="Delete PCB"
  //         >
  //           <Trash2 size={18} />
  //         </button>
  //       )}
  //     </div>

  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //       {isBase ? (
  //         <Input
  //           label="PCB Name"
  //           value={pcb.name}
  //           onChange={(val) => onChange(index, "name", val)}
  //           placeholder="Enter PCB Name"
  //           disabled
  //         />
  //       ) : (
  //         <Select
  //           label="PCB Name"
  //           value={pcb.name}
  //           options={[
  //             { label: "Coupling PCB", value: "Coupling PCB" },
  //             { label: "Other PCB", value: "Other PCB" },
  //           ]}
  //           onChange={(val) => onChange(index, "name", val)}
  //         />
  //       )}

  //       <Input
  //         label="Material"
  //         value={pcb.material}
  //         onChange={(val) => onChange(index, "material", val)}
  //         placeholder="Enter material"
  //       />
  //       <Input
  //         label="Thickness"
  //         value={pcb.thickness}
  //         onChange={(val) => onChange(index, "thickness", val)}
  //         placeholder="Enter thickness"
  //       />
  //       <Input
  //         label="Layers"
  //         value={pcb.layers}
  //         onChange={(val) => onChange(index, "layers", val)}
  //         placeholder="Enter number of layers"
  //       />
  //       <Select
  //         label="Mounting Orientation"
  //         value={isBase ? "Horizontal" : pcb.mountingOrientation}
  //         options={[
  //           { label: "Horizontal", value: "Horizontal" },
  //           { label: "Vertical", value: "Vertical" },
  //         ]}
  //         onChange={(val) => onChange(index, "mountingOrientation", val)}
  //         disabled={isBase}
  //       />
  //       <div className="md:col-span-2">
  //         <TextArea
  //           label="Comments"
  //           value={pcb.comments}
  //           onChange={(val) => onChange(index, "comments", val)}
  //           placeholder="Add any additional comments"
  //           multiline
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );

  const PCBDetailsForm = ({ pcb, index, onChange, onDelete }) => {
    const isBase = index === 0;

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
          {/* Base PCB Logic */}
          {isBase && (
            <>
              {/* Always Base PCB */}
              <Select
                label="PCB Name"
                value="Base PCB"
                options={[{ label: "Base PCB", value: "Base PCB" }]}
                disabled
              />

              {/* Ask if existing PCB is available */}
              <Select
                label="Is Existing PCB Available"
                value={pcb.isExistingCanAvailable}
                options={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
                onChange={(val) =>
                  onChange(index, "isExistingCanAvailable", val)
                }
              />

              {/* If Yes, only show BP Number */}
              {pcb.isExistingCanAvailable === "Yes" && (
                <Input
                  label="BP Number"
                  value={pcb.bpNumber || ""}
                  onChange={(val) => onChange(index, "bpNumber", val)}
                  placeholder="Enter BP Number"
                />
              )}

              {/* If No, show all other fields */}
              {pcb.isExistingCanAvailable === "No" && (
                <>
                  <Select
                    label="Material"
                    value={pcb.material}
                    options={[
                      { label: "Material 1", value: "Material 1" },
                      { label: "Material 2", value: "Material 2" },
                      { label: "Other", value: "Other" },
                    ]}
                    onChange={(val) => onChange(index, "material", val)}
                  />

                  {pcb.material === "Other" && (
                    <Input
                      label="Custom Material"
                      value={pcb.customMaterial || ""}
                      onChange={(val) => onChange(index, "customMaterial", val)}
                      placeholder="Enter custom material"
                    />
                  )}

                  <Select
                    label="Layers"
                    value={pcb.layers}
                    options={[
                      { label: "Single Layer", value: "Single" },
                      { label: "Multi Layer", value: "Multi" },
                    ]}
                    onChange={(val) => onChange(index, "layers", val)}
                  />

                  {pcb.layers === "Single" && (
                    <Input
                      label="Substrate Thickness"
                      value={pcb.substrateThickness}
                      onChange={(val) =>
                        onChange(index, "substrateThickness", val)
                      }
                      placeholder="Enter Substrate Thickness"
                    />
                  )}

                  {pcb.layers === "Multi" && (
                    <>
                      <Input
                        label="RF Layer Thickness"
                        value={pcb.rfLayerThickness}
                        onChange={(val) =>
                          onChange(index, "rfLayerThickness", val)
                        }
                        placeholder="Enter RF Layer Thickness"
                      />
                      <Input
                        label="Overall Thickness"
                        value={pcb.overallThickness}
                        onChange={(val) =>
                          onChange(index, "overallThickness", val)
                        }
                        placeholder="Enter Overall Thickness"
                      />
                    </>
                  )}

                  <Select
                    label="Mounting Orientation"
                    value="Horizontal"
                    options={[{ label: "Horizontal", value: "Horizontal" }]}
                    disabled
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
                </>
              )}
            </>
          )}

          {/* Non-base PCBs */}
          {!isBase && (
            <>
              <Select
                label="PCB Name"
                value={pcb.name}
                options={[
                  { label: "Coupling PCB", value: "Coupling PCB" },
                  { label: "Other PCB", value: "Other PCB" },
                ]}
                onChange={(val) => onChange(index, "name", val)}
              />

              {pcb.name === "Coupling PCB" && (
                <Select
                  label="Layers"
                  value="Single"
                  options={[{ label: "Single Layer", value: "Single" }]}
                  disabled
                />
              )}

              <Input
                label="Substrate Thickness"
                value={pcb.substrateThickness}
                onChange={(val) => onChange(index, "substrateThickness", val)}
                placeholder="Enter Substrate Thickness"
              />

              {/* Mounting & Comments for non-base */}
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
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h3 className="text-xl font-semibold mb-4">CAN</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Select
          label="Existing Can Available"
          value={isExistingCanAvailable}
          options={yesNoOptions}
          onChange={(value) =>
            dispatch({
              type: "SET_FIELD",
              payload: { field: "isExistingCanAvailable", value },
            })
          }
        />

        {isExistingCanAvailable === "Yes" && (
          <Input
            label="B P/N"
            value={bpNumber || ""}
            onChange={(val) =>
              dispatch({ type: "SET_BP_NUMBER", payload: val })
            }
            placeholder="Enter B P/N"
          />
        )}

        {isExistingCanAvailable !== "Yes" && (
          <>
            <Select
              label="Can Material"
              value={canMaterial}
              options={canMaterialOptions}
              onChange={(value) =>
                dispatch({ type: "SET_CAN_MATERIAL", payload: value })
              }
            />
            <Select
              label="Can Making Process"
              value={canProcess}
              options={canMakingProcessOptions}
              onChange={(value) =>
                dispatch({ type: "SET_CAN_PROCESS", payload: value })
              }
            />
            {canMaterial === "Others" && (
              <Input
                label="Custom Can Material"
                value={customCanMaterial || ""}
                onChange={(val) =>
                  dispatch({ type: "SET_CUSTOM_CAN_MATERIAL", payload: val })
                }
                placeholder="Enter custom material"
              />
            )}
          </>
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
