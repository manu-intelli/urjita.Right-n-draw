import React from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, TextArea } from "../../../components/common/ReusableComponents";

const LtccDetails = () => {
  const { state, dispatch } = usePage21Context();
  const { numberOfLtcc = 0, ltccItems = [] } = state.ltcc || {};

  // Handle Number of LTCCs Change
  const handleNumberChange = (value) => {
    const parsed = parseInt(value, 10);
    const count = isNaN(parsed) ? 0 : parsed;

    dispatch({ type: "SET_LTCC_FIELD", field: "numberOfLtcc", value: count });

    const newLtccItems = Array.from({ length: count }, (_, i) => ({
      ...(ltccItems[i] || { modelName: "" }),
    }));

    dispatch({
      type: "SET_LTCC_FIELD",
      field: "ltccItems",
      value: newLtccItems,
    });
  };

  // Handle Model Name change
  const handleModelChange = (index, key, value) => {
    const updated = [...ltccItems];
    updated[index][key] = value;

    dispatch({ type: "SET_LTCC_FIELD", field: "ltccItems", value: updated });
  };

  return (
    <div className="border p-4 rounded-md shadow-sm mb-6">
      {/* Number of LTCCs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="w-full md:w-1/2">
          <Input
            label="Number of LTCCs"
            type="number"
            min={0}
            value={numberOfLtcc}
            onChange={handleNumberChange}
            required
          />
        </div>
      </div>

      {/* LTCC Inputs */}
      {ltccItems.map((ltcc, index) => (
        <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50">
          <h3 className="font-semibold mb-2">LTCC {index + 1}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full md:w-1/2">
              <Input
                label="Model Name"
                value={ltcc.modelName || ""}
                onChange={(value) =>
                  handleModelChange(index, "modelName", value)
                }
              />
            </div>
          </div>
        </div>
      ))}

      {/* Comments */}
      {/* <div className="md:col-span-2 mt-4">
        <h3 className="font-semibold text-lg mb-2">Any Special Requirements</h3>
        <TextArea
          label="Any Special Requirements"
          value={state?.specialRequirements}
          onChange={(value) =>
            dispatch({
              type: "SET_FIELD",
              payload: { field: "specialRequirements", value },
            })
          }
          placeholder="Add any Special Requirements that are not covered above"
          multiline
        />
      </div> */}
    </div>
  );
};

export default LtccDetails;
