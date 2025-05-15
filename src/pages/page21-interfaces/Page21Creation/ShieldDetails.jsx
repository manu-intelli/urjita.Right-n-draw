import React, { useEffect } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, Select } from "../../../components/common/ReusableComponents";

const yesNoOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const ShieldDetails = () => {
  const { state, dispatch } = usePage21Context();
  const { shieldsList } = state;
  const { shieldRequired, numberOfShields, shields } = shieldsList;

  const handleOthersChange = (field, value) => {
    dispatch({
      type: "UPDATE_SHIELDS",
      payload: {
        shieldsList: {
          ...shieldsList,
          [field]: value,
        },
      },
    });
  };

  const handleShieldChange = (index, field, value) => {
    const updatedShields = shields.map((shield, i) => {
      if (i !== index) return shield;

      // Handle partType change
      if (field === "partType") {
        return {
          ...shield,
          partType: value,
          partNumber: value === "New" ? "TBD" : "", // Set based on selection
        };
      }

      // For other fields like partNumber
      return {
        ...shield,
        [field]: value,
      };
    });

    dispatch({
      type: "UPDATE_SHIELDS",
      payload: {
        shieldsList: {
          ...shieldsList,
          shields: updatedShields,
        },
      },
    });
  };

  useEffect(() => {
    if (shieldRequired !== "Yes") {
      // Reset shields when shieldRequired is "No"
      dispatch({
        type: "UPDATE_SHIELDS",
        payload: {
          shieldsList: {
            ...shieldsList,
            shields: [],
          },
        },
      });
      return;
    }

    const count = parseInt(numberOfShields || "0", 10);
    if (count < 0) count = 0; // Prevent negative values
    const updated = [...(shields || [])];

    while (updated.length < count) {
      // Initialize new shields with empty partNumber when partType is "New"
      updated.push({ partType: "New", partNumber: "TBD" });
    }

    if (updated.length > count) {
      updated.splice(count);
    }

    dispatch({
      type: "UPDATE_SHIELDS",
      payload: {
        shieldsList: {
          ...shieldsList,
          shields: updated,
        },
      },
    });
  }, [numberOfShields, shieldRequired]);

  return (
    <div className="border p-4 rounded-md shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-4">Shield Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select
          label="Shield Required"
          value={shieldRequired}
          options={yesNoOptions}
          onChange={(value) => handleOthersChange("shieldRequired", value)}
          required
        />
        {shieldRequired === "Yes" && (
          <Input
            label="Number of Shields"
            type="number"
            value={numberOfShields || ""}
            onChange={(value) => handleOthersChange("numberOfShields", value)}
            required
          />
        )}
      </div>

      {shieldRequired === "Yes" &&
        shields.map((shield, index) => (
          <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50">
            <h3 className="font-semibold mb-2">Shield {index + 1}</h3>

            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`partType-${index}`}
                  value="Existing"
                  checked={shield.partType === "Existing"}
                  onChange={() =>
                    handleShieldChange(index, "partType", "Existing")
                  }
                />
                Existing
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`partType-${index}`}
                  value="New"
                  checked={shield.partType === "New"}
                  onChange={() => handleShieldChange(index, "partType", "New")}
                />
                New
              </label>
            </div>

            <Input
              label="B-P/N"
              value={shield.partNumber || ""}
              onChange={(value) =>
                handleShieldChange(index, "partNumber", value)
              }
              disabled={shield.partType === "New"}
            />
          </div>
        ))}
    </div>
  );
};

export default ShieldDetails;
