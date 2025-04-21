import React, { useEffect } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input } from "../../../components/common/ReusableComponents";

const CooperFlapDetails = () => {
  const { state, dispatch } = usePage21Context();
  const { cooperFlapDetails } = state;
  const { numberOfFlaps, flaps } = cooperFlapDetails;

  const handleOthersChange = (field, value) => {
    dispatch({
      type: "UPDATE_COOPER_FLAP_DETAILS",
      payload: {
        cooperFlapDetails: {
          ...cooperFlapDetails,
          [field]: value,
        },
      },
    });
  };

  const handleFlapChange = (index, field, value) => {
    const updatedFlaps = flaps.map((flap, i) => {
      if (i !== index) return flap;

      if (field === "bpType") {
        return {
          ...flap,
          bpType: value,
          ...(value === "Existing"
            ? { length: "", width: "", thickness: "" }
            : {}),
        };
      }

      return {
        ...flap,
        [field]: value,
      };
    });

    dispatch({
      type: "UPDATE_COOPER_FLAP_DETAILS",
      payload: {
        cooperFlapDetails: {
          ...cooperFlapDetails,
          flaps: updatedFlaps,
        },
      },
    });
  };

  useEffect(() => {
    const count = parseInt(numberOfFlaps || "0", 10);
    const updated = [...(flaps || [])];

    while (updated.length < count) {
      updated.push({
        bpType: "New",
        bpNumber: "TBD",
        length: "",
        width: "",
        thickness: "",
      });
    }

    if (updated.length > count) {
      updated.splice(count);
    }

    dispatch({
      type: "UPDATE_COOPER_FLAP_DETAILS",
      payload: {
        cooperFlapDetails: {
          ...cooperFlapDetails,
          flaps: updated,
        },
      },
    });
  }, [numberOfFlaps]);

  return (
    <div className="border p-4 rounded-md shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input
          label="Number of Flaps"
          type="number"
          value={numberOfFlaps || ""}
          onChange={(value) => handleOthersChange("numberOfFlaps", value)}
          required
        />
      </div>

      {flaps.map((flap, index) => (
        <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Flap {index + 1}</h3>

          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`bpType-${index}`}
                value="Existing"
                checked={flap.bpType === "Existing"}
                onChange={() => handleFlapChange(index, "bpType", "Existing")}
              />
              Existing
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`bpType-${index}`}
                value="New"
                checked={flap.bpType === "New"}
                onChange={() => handleFlapChange(index, "bpType", "New")}
              />
              New
            </label>
          </div>

          <Input
            label="B-P/N"
            value={flap.bpNumber || ""}
            onChange={(value) => handleFlapChange(index, "bpNumber", value)}
            disabled={flap.bpType === "New"}
          />

          {flap.bpType === "New" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Input
                label="Length"
                value={flap.length || ""}
                onChange={(value) => handleFlapChange(index, "length", value)}
              />
              <Input
                label="Width"
                value={flap.width || ""}
                onChange={(value) => handleFlapChange(index, "width", value)}
              />
              <Input
                label="Thickness"
                value={flap.thickness || ""}
                onChange={(value) =>
                  handleFlapChange(index, "thickness", value)
                }
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CooperFlapDetails;
