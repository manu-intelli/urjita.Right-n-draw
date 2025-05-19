// import React, { useEffect } from "react";
// import { usePage21Context } from "../../../context/Page21Context";
// import { Input, Select } from "../../../components/common/ReusableComponents";

// const yesNoOptions = [
//   { label: "Yes", value: "Yes" },
//   { label: "No", value: "No" },
// ];

// const FingerDetails = () => {
//   const { state, dispatch } = usePage21Context();
//   const { fingersList } = state; // Updated key
//   const { fingerRequired, numberOfFingers, fingers } = fingersList;

//   const handleOthersChange = (field, value) => {
//     dispatch({
//       type: "UPDATE_FINGERS", // You'll need to handle this action in your reducer
//       payload: {
//         fingersList: {
//           ...fingersList,
//           [field]: value,
//         },
//       },
//     });
//   };

//   const handleFingerChange = (index, field, value) => {
//     const updatedFingers = fingers.map((finger, i) => {
//       if (i !== index) return finger;

//       if (field === "partType") {
//         return {
//           ...finger,
//           partType: value,
//           partNumber: value === "New" ? "TBD" : "",
//         };
//       }

//       return {
//         ...finger,
//         [field]: value,
//       };
//     });

//     dispatch({
//       type: "UPDATE_FINGERS",
//       payload: {
//         fingersList: {
//           ...fingersList,
//           fingers: updatedFingers,
//         },
//       },
//     });
//   };

//   useEffect(() => {
//     if (fingerRequired !== "Yes") {
//       dispatch({
//         type: "UPDATE_FINGERS",
//         payload: {
//           fingersList: {
//             ...fingersList,
//             fingers: [],
//           },
//         },
//       });
//       return;
//     }

//     const count = parseInt(numberOfFingers || "0", 10);
//     const updated = [...(fingers || [])];

//     while (updated.length < count) {
//       updated.push({ partType: "New", partNumber: "TBD" });
//     }

//     if (updated.length > count) {
//       updated.splice(count);
//     }

//     dispatch({
//       type: "UPDATE_FINGERS",
//       payload: {
//         fingersList: {
//           ...fingersList,
//           fingers: updated,
//         },
//       },
//     });
//   }, [numberOfFingers, fingerRequired]);

//   return (
//     <div className="border p-4 rounded-md shadow-sm mb-6">
//       <h2 className="text-lg font-semibold mb-4">Finger Details</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         <Select
//           label="Finger Required"
//           value={fingerRequired}
//           options={yesNoOptions}
//           onChange={(value) => handleOthersChange("fingerRequired", value)}
//           required
//         />
//         {fingerRequired === "Yes" && (
//           <Input
//             label="Number of Fingers"
//             type="number"
//             value={numberOfFingers || ""}
//             onChange={(value) => handleOthersChange("numberOfFingers", value)}
//             required
//           />
//         )}
//       </div>

//       {fingerRequired === "Yes" &&
//         fingers.map((finger, index) => (
//           <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50">
//             <h3 className="font-semibold mb-2">Finger {index + 1}</h3>

//             <div className="flex gap-4 mb-4">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name={`partType-${index}`}
//                   value="Existing"
//                   checked={finger.partType === "Existing"}
//                   onChange={() =>
//                     handleFingerChange(index, "partType", "Existing")
//                   }
//                 />
//                 Existing
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name={`partType-${index}`}
//                   value="New"
//                   checked={finger.partType === "New"}
//                   onChange={() => handleFingerChange(index, "partType", "New")}
//                 />
//                 New
//               </label>
//             </div>

//             <Input
//               label="B-P/N"
//               value={finger.partNumber || ""}
//               onChange={(value) =>
//                 handleFingerChange(index, "partNumber", value)
//               }
//               disabled={finger.partType === "New"}
//             />
//           </div>
//         ))}
//     </div>
//   );
// };

// export default FingerDetails;

import React, { useEffect } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, Select } from "../../../components/common/ReusableComponents";
import { Trash2 } from "lucide-react";

const yesNoOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const FingerDetails = () => {
  const { state, dispatch } = usePage21Context();
  const { fingersList } = state;
  const { fingerRequired, numberOfFingers, fingers } = fingersList;

  const handleOthersChange = (field, value) => {
    dispatch({
      type: "UPDATE_FINGERS",
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

  const handleRemoveFinger = (index) => {
    const updatedFingers = fingers.filter((_, i) => i !== index);
    dispatch({
      type: "UPDATE_FINGERS",
      payload: {
        fingersList: {
          ...fingersList,
          fingers: updatedFingers,
          numberOfFingers: updatedFingers.length.toString(),
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
            numberOfFingers: "0",
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
    <div className="border p-6 rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Finger Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Select
          label="Finger Required"
          value={fingerRequired}
          options={yesNoOptions}
          onChange={(value) => handleOthersChange("fingerRequired", value)}
          required
          containerClass="w-full"
        />
        {fingerRequired === "Yes" && (
          <Input
            label="Number of Fingers"
            type="number"
            min="0"
            value={numberOfFingers || ""}
            onChange={(value) => handleOthersChange("numberOfFingers", value)}
            required
            containerClass="w-full"
          />
        )}
      </div>

      {fingerRequired === "Yes" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {fingers.map((finger, index) => (
            <div
              key={index}
              className="p-3 border rounded-md bg-whte-50 space-y-3"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Finger {index + 1}</h3>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors"
                  onClick={() => handleRemoveFinger(index)}
                  aria-label="Remove finger"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">Part Type</label>
                  <div className="flex gap-6">
                    {["Existing", "New"].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`partType-${index}`}
                          value={type}
                          checked={finger.partType === type}
                          onChange={() =>
                            handleFingerChange(index, "partType", type)
                          }
                          className="h-4 w-4"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <Input
                  label="B-P/N"
                  value={finger.partNumber || ""}
                  onChange={(value) =>
                    handleFingerChange(index, "partNumber", value)
                  }
                  disabled={finger.partType === "New"}
                  containerClass="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FingerDetails;
