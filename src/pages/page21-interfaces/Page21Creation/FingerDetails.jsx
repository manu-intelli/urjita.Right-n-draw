import React, { useEffect } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, Select } from "../../../components/common/ReusableComponents";

const yesNoOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const FingerDetails = () => {
  const { state, dispatch } = usePage21Context();
  const { fingersList } = state; // Updated key
  const { fingerRequired, numberOfFingers, fingers } = fingersList;

  const handleOthersChange = (field, value) => {
    dispatch({
      type: "UPDATE_FINGERS", // You'll need to handle this action in your reducer
      payload: {
        fingersList: {
          ...fingersList,
          [field]: value,
        },
      },
    });
  };

  const handleFingerChange = (index, field, value) => {
    const updatedFingers = fingers.map((finger, i) => {
      if (i !== index) return finger;

      if (field === "partType") {
        return {
          ...finger,
          partType: value,
          partNumber: value === "New" ? "TBD" : "",
        };
      }

      return {
        ...finger,
        [field]: value,
      };
    });

    dispatch({
      type: "UPDATE_FINGERS",
      payload: {
        fingersList: {
          ...fingersList,
          fingers: updatedFingers,
        },
      },
    });
  };

  useEffect(() => {
    if (fingerRequired !== "Yes") {
      dispatch({
        type: "UPDATE_FINGERS",
        payload: {
          fingersList: {
            ...fingersList,
            fingers: [],
          },
        },
      });
      return;
    }

    const count = parseInt(numberOfFingers || "0", 10);
    const updated = [...(fingers || [])];

    while (updated.length < count) {
      updated.push({ partType: "New", partNumber: "TBD" });
    }

    if (updated.length > count) {
      updated.splice(count);
    }

    dispatch({
      type: "UPDATE_FINGERS",
      payload: {
        fingersList: {
          ...fingersList,
          fingers: updated,
        },
      },
    });
  }, [numberOfFingers, fingerRequired]);

  return (
    <div className="border p-4 rounded-md shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-4">Finger Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select
          label="Finger Required"
          value={fingerRequired}
          options={yesNoOptions}
          onChange={(value) => handleOthersChange("fingerRequired", value)}
          required
        />
        {fingerRequired === "Yes" && (
          <Input
            label="Number of Fingers"
            type="number"
            value={numberOfFingers || ""}
            onChange={(value) => handleOthersChange("numberOfFingers", value)}
            required
          />
        )}
      </div>

      {fingerRequired === "Yes" &&
        fingers.map((finger, index) => (
          <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50">
            <h3 className="font-semibold mb-2">Finger {index + 1}</h3>

            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`partType-${index}`}
                  value="Existing"
                  checked={finger.partType === "Existing"}
                  onChange={() =>
                    handleFingerChange(index, "partType", "Existing")
                  }
                />
                Existing
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`partType-${index}`}
                  value="New"
                  checked={finger.partType === "New"}
                  onChange={() => handleFingerChange(index, "partType", "New")}
                />
                New
              </label>
            </div>

            <Input
              label="B-P/N"
              value={finger.partNumber || ""}
              onChange={(value) =>
                handleFingerChange(index, "partNumber", value)
              }
              disabled={finger.partType === "New"}
            />
          </div>
        ))}
    </div>
  );
};

export default FingerDetails;
