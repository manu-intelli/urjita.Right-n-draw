import React, { useEffect } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, TextArea } from "../../../components/common/ReusableComponents"; // Ensure TextArea is imported

const ResonatorDetails = () => {
  const { state, dispatch } = usePage21Context();
  const { resonatorList } = state;
  const { numberOfResonators, resonators = [] } = resonatorList;

  // Update the number of resonators
  const handleOthersChange = (field, value) => {
    dispatch({
      type: "UPDATE_RESONATORS",
      payload: {
        resonatorList: {
          ...resonatorList,
          [field]: value,
        },
      },
    });
  };

  // Handle changes in individual resonators
  const handleResonatorChange = (index, field, value) => {
    const updatedResonators = resonators.map((resonator, i) => {
      if (i !== index) return resonator;

      if (field === "bpType") {
        return {
          ...resonator,
          bpType: value,
          partNumber: value === "New" ? "TBD" : "",
          bpNumber: value === "New" ? "" : resonator.bpNumber || "",
        };
      }

      return {
        ...resonator,
        [field]: value,
      };
    });

    dispatch({
      type: "UPDATE_RESONATORS",
      payload: {
        resonatorList: {
          ...resonatorList,
          resonators: updatedResonators,
        },
      },
    });
  };

  useEffect(() => {
    const count = parseInt(numberOfResonators || "0", 10);
    const updated = [...resonators];

    while (updated.length < count) {
      updated.push({
        bpType: "New",
        bpNumber: "TBD",
        resonatorSize: "",
        dielectricConstant: "",
        resonatorLength: "",
        resonatorFrequency: "",
        comments: "",
      });
    }

    if (updated.length > count) {
      updated.splice(count);
    }

    dispatch({
      type: "UPDATE_RESONATORS",
      payload: {
        resonatorList: {
          ...resonatorList,
          resonators: updated,
        },
      },
    });
  }, [numberOfResonators]);

  return (
    <div className="border p-4 rounded-md shadow-sm mb-6">
      {/* Input for Number of Resonators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input
          label="Number of Resonators"
          type="number"
          min={0}
          value={numberOfResonators || ""}
          onChange={(value) => {
            const parsed = parseInt(value, 10);
            handleOthersChange(
              "numberOfResonators",
              isNaN(parsed) ? "" : parsed
            );
          }}
          required
        />
      </div>

      {/* Loop through all resonators */}
      {resonators.map((resonator, index) => (
        <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Resonator {index + 1}</h3>

          {/* BP Type Radio Button Group */}
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`bpType-${index}`}
                value="Existing"
                checked={resonator.bpType === "Existing"}
                onChange={() =>
                  handleResonatorChange(index, "bpType", "Existing")
                }
              />
              Existing
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`bpType-${index}`}
                value="New"
                checked={resonator.bpType === "New"}
                onChange={() => handleResonatorChange(index, "bpType", "New")}
              />
              New
            </label>
          </div>

          {/* Resonator Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="BP/N"
              value={resonator.bpNumber || ""}
              onChange={(value) =>
                handleResonatorChange(index, "bpNumber", value)
              }
              disabled={resonator.bpType === "New"}
            />
            <Input
              label="Resonator Size"
              type="number"
              value={resonator.resonatorSize || ""}
              onChange={(value) =>
                handleResonatorChange(index, "resonatorSize", value)
              }
              required
            />
            <Input
              label="Dielectric Constant"
              value={resonator.dielectricConstant || ""}
              onChange={(value) =>
                handleResonatorChange(index, "dielectricConstant", value)
              }
              required
            />
            <Input
              label="Resonator Length"
              type="number"
              value={resonator.resonatorLength || ""}
              onChange={(value) =>
                handleResonatorChange(index, "resonatorLength", value)
              }
              required
            />
            <Input
              label="Resonator Frequency"
              type="number"
              value={resonator.resonatorFrequency || ""}
              onChange={(value) =>
                handleResonatorChange(index, "resonatorFrequency", value)
              }
              required
            />
          </div>

          {/* Comments Text Area */}
          <div className="mt-4">
            <TextArea
              label="Comments"
              value={resonator.comments}
              onChange={(val) => handleResonatorChange(index, "comments", val)}
              placeholder="Add any additional comments"
              multiline
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResonatorDetails;
