import React from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, TextArea } from "../../../components/common/ReusableComponents";

const OtherSpecialComponents = () => {
  const { state, dispatch } = usePage21Context();

  return (
    <div className="border p-4 rounded-md shadow-sm mb-6">
      {/* Comments */}
      <div className="md:col-span-2 mt-4">
        <h3 className="font-semibold text-lg mb-2">Any Special Requirements</h3>
        <TextArea
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
      </div>
    </div>
  );
};

export default OtherSpecialComponents;
