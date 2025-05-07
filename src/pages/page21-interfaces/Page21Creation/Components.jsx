import { Trash2 } from "lucide-react";
import {
  Input,
  Select,
  TextArea,
} from "../../../components/common/ReusableComponents";
import { usePage21Context } from "../../../context/Page21Context";
import { Tooltip } from "@mui/material";

const ComponentsDetails = () => {
  const { state, dispatch } = usePage21Context();
  const MAX_PCBS = 5;
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
    if (pcbList.length >= MAX_PCBS) return;
    const updated = [
      ...pcbList,
      {
        name: "",
        material: "",
        thickness: "",
        layers: "",
        mountingOrientation: "",
        comments: "",
        isExistingCanAvailable: "No",
        bpNumber: "",
        customMaterial: "",
        substrateThickness: "",
        rfLayerThickness: "",
        overallThickness: "",
        copperThickness:"",
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
    { label: "Any of the above", value: "Any of the above" },
  ];

  const yesNoOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

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
        <Tooltip title={pcbList.length >=MAX_PCBS?"Maximum of 5 PCBs allowed":""}
          disableHoverListener={pcbList.length< MAX_PCBS}>
        <button
          className={`bg-blue-600 text-white font-medium px-4 py-2 rounded flex items-center gap-2 ${
            pcbList.length >= MAX_PCBS
              ? "bg-gray-500 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
          onClick={addPCB}
          disabled={pcbList.length >= MAX_PCBS}
        >
          <span className="text-lg font-bold">+</span> Add PCB
        </button>
        </Tooltip>
      </div>

      {pcbList.map((pcb, index) => {
        const isBase = index === 0;

        return (
          <div
            key={index}
            className="border rounded-md p-4 mb-4 bg-white shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">PCB {index + 1}</h3>
              {!isBase && (
                <button
                  onClick={() => deletePCB(index)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete PCB"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isBase ? (
                <>
                  <Select
                    label="PCB Name"
                    value="Base PCB"
                    options={[{ label: "Base PCB", value: "Base PCB" }]}
                    disabled
                  />

                  <Select
                    label="Is Existing PCB Available"
                    value={pcb.isExistingCanAvailable}
                    options={yesNoOptions}
                    onChange={(val) =>
                      handlePcbChange(index, "isExistingCanAvailable", val)
                    }
                  />

                  {pcb.isExistingCanAvailable === "Yes" && (
                    <Input
                      label="BP Number"
                      value={pcb.bpNumber || ""}
                      onChange={(val) =>
                        handlePcbChange(index, "bpNumber", val)
                      }
                      placeholder="Enter BP Number"
                    />
                  )}

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
                        onChange={(val) =>
                          handlePcbChange(index, "material", val)
                        }
                      />

                      {pcb.material === "Other" && (
                        <Input
                          label="Custom Material"
                          value={pcb.customMaterial || ""}
                          onChange={(val) =>
                            handlePcbChange(index, "customMaterial", val)
                          }
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
                        onChange={(val) =>
                          handlePcbChange(index, "layers", val)
                        }
                      />

                      {pcb.layers === "Single" && (
                        <Input
                          label="Substrate Thickness"
                          value={pcb.substrateThickness}
                          onChange={(val) =>
                            handlePcbChange(index, "substrateThickness", val)
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
                              handlePcbChange(index, "rfLayerThickness", val)
                            }
                            placeholder="Enter RF Layer Thickness"
                          />
                          <Input
                            label="Overall Thickness"
                            value={pcb.overallThickness}
                            onChange={(val) =>
                              handlePcbChange(index, "overallThickness", val)
                            }
                            placeholder="Enter Overall Thickness"
                          />
                        </>
                      )}
                          <Input
                            label="Copper Thickness"
                            value={pcb.copperThickness}
                            onChange={(val) =>
                              handlePcbChange(index, "copperThickness", val)
                            }
                            
                          />

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
                          onChange={(val) =>
                            handlePcbChange(index, "comments", val)
                          }
                          placeholder="Add any additional comments"
                          multiline
                        />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Select
                    label="PCB Name"
                    value={pcb.name}
                    options={[
                      { label: "Coupling PCB", value: "Coupling PCB" },
                      { label: "Other PCB", value: "Other PCB" },
                    ]}
                    onChange={(val) => handlePcbChange(index, "name", val)}
                  />

                  
                    <Select
                      label="Layers"
                      value="Single"
                      options={[{ label: "Single Layer", value: "Single" }]}
                      disabled
                    />
                  

                  <Input
                    label="Substrate Thickness"
                    value={pcb.substrateThickness}
                    onChange={(val) =>
                      handlePcbChange(index, "substrateThickness", val)
                    }
                    placeholder="Enter Substrate Thickness"
                  />
 <Input
                            label="Copper Thickness"
                            value={pcb.copperThickness}
                            onChange={(val) =>
                              handlePcbChange(index, "copperThickness", val)
                            }
                            
                          />
                  <Select
                    label="Mounting Orientation"
                    value={pcb.mountingOrientation}
                    options={[
                      { label: "Horizontal", value: "Horizontal" },
                      { label: "Vertical", value: "Vertical" },
                    ]}
                    onChange={(val) =>
                      handlePcbChange(index, "mountingOrientation", val)
                    }
                  />

                  <div className="md:col-span-2">
                    <TextArea
                      label="Comments"
                      value={pcb.comments}
                      onChange={(val) =>
                        handlePcbChange(index, "comments", val)
                      }
                      placeholder="Add any additional comments"
                      multiline
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ComponentsDetails;
