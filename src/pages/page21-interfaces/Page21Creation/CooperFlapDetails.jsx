// import React, { useEffect } from "react";
// import { usePage21Context } from "../../../context/Page21Context";
// import { Input } from "../../../components/common/ReusableComponents";

// const CooperFlapDetails = () => {
//   const { state, dispatch } = usePage21Context();
//   const { cooperFlapDetails } = state;
//   const { numberOfFlaps, flaps } = cooperFlapDetails;

//   const handleOthersChange = (field, value) => {
//     dispatch({
//       type: "UPDATE_COOPER_FLAP_DETAILS",
//       payload: {
//         cooperFlapDetails: {
//           ...cooperFlapDetails,
//           [field]: value,
//         },
//       },
//     });
//   };

//   const handleFlapChange = (index, field, value) => {
//     const updatedFlaps = flaps.map((flap, i) => {
//       if (i !== index) return flap;

//       if (field === "bpType") {
//         return {
//           ...flap,
//           bpType: value,
//           bpNumber: value === "New" ? "TBD" : "",
//           ...(value === "Existing"
//             ? {
//                 length: "",
//                 width: "",
//                 thickness: "",
//               }
//             : {}),
//         };
//       }

//       return {
//         ...flap,
//         [field]: value,
//       };
//     });

//     dispatch({
//       type: "UPDATE_COOPER_FLAP_DETAILS",
//       payload: {
//         cooperFlapDetails: {
//           ...cooperFlapDetails,
//           flaps: updatedFlaps,
//         },
//       },
//     });
//   };

//   useEffect(() => {
//     var count = parseInt(numberOfFlaps || "0", 10);
//     if (count < 0) count = 0; // Prevent negative values
//     const updated = [...(flaps || [])];

//     while (updated.length < count) {
//       updated.push({
//         bpType: "New",
//         bpNumber: "TBD",
//         length: "",
//         width: "",
//         thickness: "",
//       });
//     }

//     if (updated.length > count) {
//       updated.splice(count);
//     }

//     dispatch({
//       type: "UPDATE_COOPER_FLAP_DETAILS",
//       payload: {
//         cooperFlapDetails: {
//           ...cooperFlapDetails,
//           flaps: updated,
//         },
//       },
//     });
//   }, [numberOfFlaps]);

//   return (
//     <div className="border p-4 rounded-md shadow-sm mb-6">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//         <Input
//           label="Number of Flaps"
//           type="number"
//           value={numberOfFlaps || ""}
//           onChange={(value) => handleOthersChange("numberOfFlaps", value)}
//           required
//         />
//       </div>

//       {flaps.map((flap, index) => (
//         <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50">
//           <h3 className="font-semibold mb-2">Flap {index + 1}</h3>

//           <div className="flex gap-4 mb-4">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name={`bpType-${index}`}
//                 value="Existing"
//                 checked={flap.bpType === "Existing"}
//                 onChange={() => handleFlapChange(index, "bpType", "Existing")}
//               />
//               Existing
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name={`bpType-${index}`}
//                 value="New"
//                 checked={flap.bpType === "New"}
//                 onChange={() => handleFlapChange(index, "bpType", "New")}
//               />
//               New
//             </label>
//           </div>

//           <Input
//             label="B-P/N"
//             value={flap.bpNumber || ""}
//             onChange={(value) => handleFlapChange(index, "bpNumber", value)}
//             disabled={flap.bpType === "New"}
//           />

//           {flap.bpType === "New" && (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//               <Input
//                 label="Length"
//                 value={flap.length || ""}
//                 onChange={(value) => handleFlapChange(index, "length", value)}
//               />
//               <Input
//                 label="Width"
//                 value={flap.width || ""}
//                 onChange={(value) => handleFlapChange(index, "width", value)}
//               />
//               <Input
//                 label="Thickness"
//                 value={flap.thickness || ""}
//                 onChange={(value) =>
//                   handleFlapChange(index, "thickness", value)
//                 }
//               />
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CooperFlapDetails;

import React, { useEffect } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input } from "../../../components/common/ReusableComponents";

const CooperFlapDetails = () => {
  const { state, dispatch } = usePage21Context();
  const { cooperFlapDetails } = state;
  const { numberOfFlaps, flaps } = cooperFlapDetails;

  const updateFlapDetails = (updates) => {
    dispatch({
      type: "UPDATE_COOPER_FLAP_DETAILS",
      payload: {
        cooperFlapDetails: {
          ...cooperFlapDetails,
          ...updates,
        },
      },
    });
  };

  const handleFlapUpdate = (index, updates) => {
    const updatedFlaps = flaps.map((flap, i) =>
      i === index ? { ...flap, ...updates } : flap
    );
    updateFlapDetails({ flaps: updatedFlaps });
  };

  const handleBpTypeChange = (index, bpType) => {
    const updates = {
      bpType,
      bpNumber: bpType === "New" ? "TBD" : "",
      ...(bpType === "Existing"
        ? {
            length: "",
            width: "",
            thickness: "",
          }
        : {}),
    };
    handleFlapUpdate(index, updates);
  };

  useEffect(() => {
    const count = Math.max(0, parseInt(numberOfFlaps || "0", 10));
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

    if (updated.length !== flaps?.length) {
      updateFlapDetails({ flaps: updated });
    }
  }, [numberOfFlaps]);

  return (
    <div className="space-y-4 p-4 border rounded-md shadow-sm bg-white">
      <h2 className="text-lg font-semibold text-gray-800">
        Cooper Flap Details
      </h2>

      <div className="w-full md:w-1/3">
        <Input
          label="Number of Flaps"
          type="number"
          min="0"
          value={numberOfFlaps || ""}
          onChange={(value) => updateFlapDetails({ numberOfFlaps: value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {flaps.map((flap, index) => (
          <div
            key={index}
            className="p-3 border rounded-md bg-whte-50 space-y-3"
          >
            <h3 className="font-medium text-gray-700">Flap {index + 1}</h3>

            <div className="flex gap-4 items-center">
              {["Existing", "New"].map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={`bpType-${index}`}
                    value={option}
                    checked={flap.bpType === option}
                    onChange={() => handleBpTypeChange(index, option)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="w-full">
              <Input
                label="B-P/N"
                value={flap.bpNumber || ""}
                onChange={(value) =>
                  handleFlapUpdate(index, { bpNumber: value })
                }
                disabled={flap.bpType === "New"}
                className="bg-white"
              />
            </div>

            {flap.bpType === "New" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  label="Length"
                  value={flap.length || ""}
                  onChange={(value) =>
                    handleFlapUpdate(index, { length: value })
                  }
                  className="bg-white"
                />
                <Input
                  label="Width"
                  value={flap.width || ""}
                  onChange={(value) =>
                    handleFlapUpdate(index, { width: value })
                  }
                  className="bg-white"
                />
                <Input
                  label="Thickness"
                  value={flap.thickness || ""}
                  onChange={(value) =>
                    handleFlapUpdate(index, { thickness: value })
                  }
                  className="bg-white"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CooperFlapDetails;
