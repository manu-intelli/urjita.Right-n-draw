import { Trash2 } from "lucide-react";
import {
  Input,
  Select,
  TextArea,
} from "../../../components/common/ReusableComponents";
import { usePage21Context } from "../../../context/Page21Context";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";

const ComponentsDetails = () => {
  const { state, dispatch } = usePage21Context();
  const MAX_PCBS = 5;
  const {
    can: {
      canMaterial,
      canProcess,
      isExistingCanAvailable,
      bpNumber,
      customCanMaterial,
    },
    pcbList,
    coverType,
    technology,
  } = state;

  // Reset CAN-related fields when coverType is not "Open"
  useEffect(() => {
    if (coverType !== "Open") {
      dispatch({
        type: "UPDATE_CAN",
        field: "isExistingCanAvailable",
        value: "No",
      });
      dispatch({
        type: "UPDATE_CAN",
        field: "bpNumber",
        value: "",
      });
      dispatch({
        type: "UPDATE_CAN",
        field: "canMaterial",
        value: "",
      });
      dispatch({
        type: "UPDATE_CAN",
        field: "canProcess",
        value: "",
      });
      dispatch({
        type: "UPDATE_CAN",
        field: "customCanMaterial",
        value: "",
      });
    }
  }, [coverType, dispatch]);

  const handlePcbChange = (index, field, value) => {
    const updated = [...pcbList];

    // Create a new object for the PCB we're updating
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    // Special handling for isExistingCanAvailable change
    if (field === "isExistingPCBAvailable" && value === "Yes") {
      updated[index] = {
        ...updated[index],
        material: "",
        layers: "",
        substrateThickness: "",
        rfLayerThickness: "",
        overallThickness: "",
        copperThickness: "",
        mountingOrientation: "",
        comments: "",
        customMaterial: "",
      };
    }

    // Special handling for material change
    if (field === "material" && value !== "Other") {
      updated[index] = {
        ...updated[index],
        customMaterial: "",
      };
    }

    dispatch({ type: "SET_PCB_LIST", payload: updated });
  };

  const addPCB = () => {
    if (pcbList.length >= MAX_PCBS) return;
    const updated = [
      ...pcbList,
      {
        name: "Coupling PCB",
        material: "",
        thickness: "",
        layers: "Single",
        mountingOrientation: "Horizontal",
        comments: "",
        isExistingPCBAvailable: "No",
        bpNumber: "",
        customMaterial: "",
        substrateThickness: "",
        rfLayerThickness: "",
        overallThickness: "",
        copperThickness: "",
      },
    ];
    dispatch({ type: "SET_PCB_LIST", payload: updated });
  };

  const deletePCB = (index) => {
    if (index === 0) return; // Prevent deleting base PCB
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

  const pcbNameOptions = [
    { label: "Coupling PCB", value: "Coupling PCB" },
    { label: "Other PCB", value: "Other PCB" },
  ];

  const pcbMaterialOptions = [
    { label: "Material 1", value: "Material 1" },
    { label: "Material 2", value: "Material 2" },
    { label: "Other", value: "Other" },
  ];

  const mountingOrientationOptions = [
    { label: "Horizontal", value: "Horizontal" },
    { label: "Vertical", value: "Vertical" },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-md">
      {coverType === "Open" && (
        <>
          <h3 className="text-md font-semibold mb-4">CAN</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Select
              label="Existing Can Available"
              value={isExistingCanAvailable}
              options={yesNoOptions}
              onChange={(value) => {
                dispatch({
                  type: "UPDATE_CAN",
                  field: "isExistingCanAvailable",
                  value,
                });

                // Reset other fields when switching to existing can
                if (value === "Yes") {
                  dispatch({
                    type: "UPDATE_CAN",
                    field: "canMaterial",
                    value: "",
                  });
                  dispatch({
                    type: "UPDATE_CAN",
                    field: "canProcess",
                    value: "",
                  });
                  dispatch({
                    type: "UPDATE_CAN",
                    field: "customCanMaterial",
                    value: "",
                  });
                }
              }}
            />

            {isExistingCanAvailable === "Yes" && (
              <Input
                label="B-P/N"
                value={bpNumber || ""}
                onChange={(val) =>
                  dispatch({
                    type: "UPDATE_CAN",
                    field: "bpNumber",
                    value: val,
                  })
                }
                placeholder="Enter BP Number"
              />
            )}

            {isExistingCanAvailable === "No" && (
              <>
                <Select
                  label="Can Material"
                  value={canMaterial}
                  options={canMaterialOptions}
                  onChange={(value) => {
                    dispatch({
                      type: "UPDATE_CAN",
                      field: "canMaterial",
                      value,
                    });

                    // Reset custom material if not "Others"
                    if (value !== "Others") {
                      dispatch({
                        type: "UPDATE_CAN",
                        field: "customCanMaterial",
                        value: "",
                      });
                    }
                  }}
                />

                {canMaterial && (
                  <Select
                    label="Can Making Process"
                    value={canProcess}
                    options={canMakingProcessOptions}
                    onChange={(value) =>
                      dispatch({
                        type: "UPDATE_CAN",
                        field: "canProcess",
                        value,
                      })
                    }
                  />
                )}

                {canMaterial === "Others" && (
                  <Input
                    label="Custom Can Material"
                    value={customCanMaterial || ""}
                    onChange={(val) =>
                      dispatch({
                        type: "UPDATE_CAN",
                        field: "customCanMaterial",
                        value: val,
                      })
                    }
                    placeholder="Enter custom material"
                  />
                )}
              </>
            )}
          </div>
        </>
      )}

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">PCB Details</h3>
        <Tooltip
          title={
            pcbList.length >= MAX_PCBS
              ? "Maximum of 5 PCBs allowed"
              : technology === "thin_film"
              ? "Not applicable for thin film technology"
              : ""
          }
        >
          <button
            className={`bg-blue-600 text-white font-medium px-4 py-2 rounded flex items-center gap-2 ${
              pcbList.length >= MAX_PCBS || technology === "thin_film"
                ? "bg-gray-500 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
            onClick={addPCB}
            disabled={pcbList.length >= MAX_PCBS || technology === "thin_film"}
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
              <h3 className="font-semibold text-md">
                {isBase ? "Base PCB" : `PCB ${index}`}
              </h3>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    value={pcb.isExistingPCBAvailable}
                    options={yesNoOptions}
                    onChange={(val) =>
                      handlePcbChange(index, "isExistingPCBAvailable", val)
                    }
                  />
                  {pcb.isExistingPCBAvailable === "Yes" && (
                    <Input
                      label="B-P/N"
                      value={pcb.bpNumber || ""}
                      onChange={(val) =>
                        handlePcbChange(index, "bpNumber", val)
                      }
                      placeholder="Enter BP Number"
                      required
                    />
                  )}{" "}
                  {pcb.isExistingPCBAvailable === "No" && (
                    <>
                      <Select
                        label="Material"
                        value={pcb.material}
                        options={pcbMaterialOptions}
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
                          label="Substrate Thickness (mm)"
                          value={pcb.substrateThickness}
                          onChange={(val) =>
                            handlePcbChange(index, "substrateThickness", val)
                          }
                          placeholder="Enter thickness in mm"
                          type="number"
                        />
                      )}

                      {pcb.layers === "Multi" && (
                        <>
                          <Input
                            label="RF Layer Thickness (mm)"
                            value={pcb.rfLayerThickness}
                            onChange={(val) =>
                              handlePcbChange(index, "rfLayerThickness", val)
                            }
                            placeholder="Enter thickness in mm"
                            type="number"
                          />
                          <Input
                            label="Overall Thickness (mm)"
                            value={pcb.overallThickness}
                            onChange={(val) =>
                              handlePcbChange(index, "overallThickness", val)
                            }
                            placeholder="Enter thickness in mm"
                            type="number"
                          />
                        </>
                      )}
                      <Input
                        label="Copper Thickness (μm)"
                        value={pcb.copperThickness}
                        onChange={(val) =>
                          handlePcbChange(index, "copperThickness", val)
                        }
                        placeholder="Enter thickness in μm"
                        type="number"
                      />

                      <Select
                        label="Mounting Orientation"
                        value={pcb.mountingOrientation}
                        options={mountingOrientationOptions}
                        onChange={(val) =>
                          handlePcbChange(index, "mountingOrientation", val)
                        }
                      />

                      <div className="md:col-span-3">
                        <TextArea
                          label="Comments"
                          value={pcb.comments}
                          onChange={(val) =>
                            handlePcbChange(index, "comments", val)
                          }
                          placeholder="Add any additional comments"
                          rows={3}
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
                    options={pcbNameOptions}
                    onChange={(val) => handlePcbChange(index, "name", val)}
                  />

                  <Select
                    label="Layers"
                    value={pcb.layers}
                    options={[{ label: "Single Layer", value: "Single" }]}
                    disabled
                  />

                  <Input
                    label="Substrate Thickness (mm)"
                    value={pcb.substrateThickness}
                    onChange={(val) =>
                      handlePcbChange(index, "substrateThickness", val)
                    }
                    placeholder="Enter thickness in mm"
                    type="number"
                  />

                  <Input
                    label="Copper Thickness (μm)"
                    value={pcb.copperThickness}
                    onChange={(val) =>
                      handlePcbChange(index, "copperThickness", val)
                    }
                    placeholder="Enter thickness in μm"
                    type="number"
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
                      rows={3}
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
