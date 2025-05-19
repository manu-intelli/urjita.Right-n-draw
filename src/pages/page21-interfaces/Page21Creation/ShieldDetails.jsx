// import React, { useEffect } from "react";
// import { usePage21Context } from "../../../context/Page21Context";
// import { Input, Select } from "../../../components/common/ReusableComponents";

// const yesNoOptions = [
//   { label: "Yes", value: "Yes" },
//   { label: "No", value: "No" },
// ];

// const ShieldDetails = () => {
//   const { state, dispatch } = usePage21Context();
//   const { shieldsList } = state;
//   const { shieldRequired, numberOfShields, shields } = shieldsList;

//   const handleOthersChange = (field, value) => {
//     dispatch({
//       type: "UPDATE_SHIELDS",
//       payload: {
//         shieldsList: {
//           ...shieldsList,
//           [field]: value,
//         },
//       },
//     });
//   };

//   const handleShieldChange = (index, field, value) => {
//     const updatedShields = shields.map((shield, i) => {
//       if (i !== index) return shield;

//       // Handle partType change
//       if (field === "partType") {
//         return {
//           ...shield,
//           partType: value,
//           partNumber: value === "New" ? "TBD" : "", // Set based on selection
//         };
//       }

//       // For other fields like partNumber
//       return {
//         ...shield,
//         [field]: value,
//       };
//     });

//     dispatch({
//       type: "UPDATE_SHIELDS",
//       payload: {
//         shieldsList: {
//           ...shieldsList,
//           shields: updatedShields,
//         },
//       },
//     });
//   };

//   useEffect(() => {
//     if (shieldRequired !== "Yes") {
//       // Reset shields when shieldRequired is "No"
//       dispatch({
//         type: "UPDATE_SHIELDS",
//         payload: {
//           shieldsList: {
//             ...shieldsList,
//             shields: [],
//           },
//         },
//       });
//       return;
//     }

//     var count = parseInt(numberOfShields || "0", 10);
//     if (count < 0) count = 0; // Prevent negative values
//     const updated = [...(shields || [])];

//     while (updated.length < count) {
//       // Initialize new shields with empty partNumber when partType is "New"
//       updated.push({ partType: "New", partNumber: "TBD" });
//     }

//     if (updated.length > count) {
//       updated.splice(count);
//     }

//     dispatch({
//       type: "UPDATE_SHIELDS",
//       payload: {
//         shieldsList: {
//           ...shieldsList,
//           shields: updated,
//         },
//       },
//     });
//   }, [numberOfShields, shieldRequired]);

//   return (
//     <div className="border p-4 rounded-md shadow-sm mb-6">
//       <h2 className="text-lg font-semibold mb-4">Shield Details</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//         <Select
//           label="Shield Required"
//           value={shieldRequired}
//           options={yesNoOptions}
//           onChange={(value) => handleOthersChange("shieldRequired", value)}
//           required
//         />
//         {shieldRequired === "Yes" && (
//           <Input
//             label="Number of Shields"
//             type="number"
//             value={numberOfShields || ""}
//             onChange={(value) => handleOthersChange("numberOfShields", value)}
//             required
//           />
//         )}
//       </div>

//       {shieldRequired === "Yes" &&
//         shields.map((shield, index) => (
//           <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50">
//             <h3 className="font-semibold mb-2">Shield {index + 1}</h3>

//             <div className="flex gap-3">
//               {["Existing", "New"].map((option) => (
//                 <label
//                   key={option}
//                   className="flex items-center gap-1.5 text-sm"
//                 >
//                   <input
//                     type="radio"
//                     name={`partType-${index}`}
//                     value={option}
//                     checked={shield.partType === option}
//                     onChange={() =>
//                       handleShieldChange(index, "partType", option)
//                     }
//                     className="h-3.5 w-3.5"
//                   />
//                   {option}
//                 </label>
//               ))}
//             </div>
//             <div className="grid grid-cols-1 md:w-1/3 gap-4 mb-4">
//               <Input
//                 label="B-P/N"
//                 value={shield.partNumber || ""}
//                 onChange={(value) =>
//                   handleShieldChange(index, "partNumber", value)
//                 }
//                 disabled={shield.partType === "New"}
//               />
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default ShieldDetails;

import React, { useEffect } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, Select } from "../../../components/common/ReusableComponents";

const OPTIONS = {
  yesNo: [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ],
  partType: ["Existing", "New"],
};

const ShieldDetails = () => {
  const { state, dispatch } = usePage21Context();
  const { shieldsList } = state;
  const { shieldRequired, numberOfShields, shields } = shieldsList;

  const handleFieldChange = (field, value) => {
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

  const handleShieldUpdate = (index, field, value) => {
    const updatedShields = shields.map((shield, i) => {
      if (i !== index) return shield;

      if (field === "partType") {
        return {
          ...shield,
          partType: value,
          partNumber: value === "New" ? "TBD" : "",
        };
      }

      return {
        ...shield,
        [field]: value,
      };
    });

    handleFieldChange("shields", updatedShields);
  };

  useEffect(() => {
    if (shieldRequired !== "Yes") {
      handleFieldChange("shields", []);
      return;
    }

    const count = Math.max(0, parseInt(numberOfShields || "0", 10));
    const updated = [...(shields || [])];

    // Adjust shields array length to match count
    while (updated.length < count) {
      updated.push({ partType: "New", partNumber: "TBD" });
    }
    if (updated.length > count) {
      updated.splice(count);
    }

    if (updated.length !== shields?.length) {
      handleFieldChange("shields", updated);
    }
  }, [numberOfShields, shieldRequired]);

  return (
    <div className="space-y-4 p-4 border rounded-md shadow-sm bg-white">
      <h2 className="text-lg font-semibold text-gray-800">Shield Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Shield Required"
          value={shieldRequired}
          options={OPTIONS.yesNo}
          onChange={(value) => handleFieldChange("shieldRequired", value)}
          required
        />

        {shieldRequired === "Yes" && (
          <Input
            label="Number of Shields"
            type="number"
            min="0"
            value={numberOfShields || ""}
            onChange={(value) => handleFieldChange("numberOfShields", value)}
            required
          />
        )}
      </div>

      {shieldRequired === "Yes" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {shields.map((shield, index) => (
            <div
              key={index}
              className="p-3 border rounded-md bg-whte-50 space-y-3"
            >
              <h3 className="font-medium text-gray-700">Shield {index + 1}</h3>

              <div className="flex gap-4 items-center">
                {OPTIONS.partType.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      name={`partType-${index}`}
                      value={option}
                      checked={shield.partType === option}
                      onChange={() =>
                        handleShieldUpdate(index, "partType", option)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    {option}
                  </label>
                ))}
              </div>

              <div className="w-full">
                <Input
                  label="B-P/N"
                  value={shield.partNumber || ""}
                  onChange={(value) =>
                    handleShieldUpdate(index, "partNumber", value)
                  }
                  disabled={shield.partType === "New"}
                  className="bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShieldDetails;
