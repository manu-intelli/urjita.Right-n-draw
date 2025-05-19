// import React, { useEffect } from "react";
// import { usePage21Context } from "../../../context/Page21Context";
// import { Input, TextArea } from "../../../components/common/ReusableComponents"; // Ensure TextArea is imported

// const ResonatorDetails = () => {
//   const { state, dispatch } = usePage21Context();
//   const { resonatorList } = state;
//   const { numberOfResonators, resonators = [] } = resonatorList;

//   // Update the number of resonators
//   const handleOthersChange = (field, value) => {
//     dispatch({
//       type: "UPDATE_RESONATORS",
//       payload: {
//         resonatorList: {
//           ...resonatorList,
//           [field]: value,
//         },
//       },
//     });
//   };

//   // Handle changes in individual resonators
//   const handleResonatorChange = (index, field, value) => {
//     const updatedResonators = resonators.map((resonator, i) => {
//       if (i !== index) return resonator;

//       if (field === "bpType") {
//         const isNew = value === "New";
//         return {
//           ...resonator,
//           bpType: value,

//           bpNumber: isNew ? "TBD" : "",
//         };
//       }

//       return {
//         ...resonator,
//         [field]: value,
//       };
//     });

//     dispatch({
//       type: "UPDATE_RESONATORS",
//       payload: {
//         resonatorList: {
//           ...resonatorList,
//           resonators: updatedResonators,
//         },
//       },
//     });
//   };

//   useEffect(() => {
//     const count = parseInt(numberOfResonators || "0", 10);
//     const updated = [...resonators];

//     while (updated.length < count) {
//       updated.push({
//         bpType: "New",
//         bpNumber: "TBD",
//         resonatorSize: "",
//         dielectricConstant: "",
//         resonatorLength: "",
//         resonatorFrequency: "",
//         comments: "",
//       });
//     }

//     if (updated.length > count) {
//       updated.splice(count);
//     }

//     dispatch({
//       type: "UPDATE_RESONATORS",
//       payload: {
//         resonatorList: {
//           ...resonatorList,
//           resonators: updated,
//         },
//       },
//     });
//   }, [numberOfResonators]);

//   return (
//     <div className="border p-4 rounded-md shadow-sm mb-6">
//       {/* Input for Number of Resonators */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//         <Input
//           label="Number of Resonators"
//           type="number"
//           min={0}
//           value={numberOfResonators || ""}
//           onChange={(value) => {
//             const parsed = parseInt(value, 10);
//             handleOthersChange(
//               "numberOfResonators",
//               isNaN(parsed) ? "" : parsed
//             );
//           }}
//           required
//         />
//       </div>

//       {/* Loop through all resonators */}
//       {resonators.map((resonator, index) => (
//         <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50">
//           <h3 className="font-semibold mb-2">Resonator {index + 1}</h3>

//           {/* BP Type Radio Button Group */}
//           <div className="flex gap-4 mb-4">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name={`bpType-${index}`}
//                 value="Existing"
//                 checked={resonator.bpType === "Existing"}
//                 onChange={() =>
//                   handleResonatorChange(index, "bpType", "Existing")
//                 }
//               />
//               B-P/N to be used/modified
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name={`bpType-${index}`}
//                 value="New"
//                 checked={resonator.bpType === "New"}
//                 onChange={() => handleResonatorChange(index, "bpType", "New")}
//               />
//               New
//             </label>
//           </div>

//           {/* Resonator Input Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Input
//               label="B-P/N"
//               value={resonator.bpNumber || ""}
//               onChange={(value) =>
//                 handleResonatorChange(index, "bpNumber", value)
//               }
//               disabled={resonator.bpType === "New"}
//             />
//             <Input
//               label="Resonator Size"
//               type="number"
//               value={resonator.resonatorSize || ""}
//               onChange={(value) =>
//                 handleResonatorChange(index, "resonatorSize", value)
//               }
//               required
//             />
//             <Input
//               label="Dielectric Constant"
//               value={resonator.dielectricConstant || ""}
//               onChange={(value) =>
//                 handleResonatorChange(index, "dielectricConstant", value)
//               }
//               required
//             />
//             <Input
//               label="Resonator Length"
//               type="number"
//               value={resonator.resonatorLength || ""}
//               onChange={(value) =>
//                 handleResonatorChange(index, "resonatorLength", value)
//               }
//               required
//             />
//             <Input
//               label="Resonator Frequency"
//               type="number"
//               value={resonator.resonatorFrequency || ""}
//               onChange={(value) =>
//                 handleResonatorChange(index, "resonatorFrequency", value)
//               }
//               required
//             />
//           </div>

//           {/* Comments Text Area */}
//           <div className="mt-4">
//             <TextArea
//               label="Comments"
//               value={resonator.comments}
//               onChange={(val) => handleResonatorChange(index, "comments", val)}
//               placeholder="Add any additional comments"
//               multiline
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ResonatorDetails;
import React, { useEffect } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, TextArea } from "../../../components/common/ReusableComponents";
import { Trash2 } from "lucide-react";

const ResonatorDetails = () => {
  const { state, dispatch } = usePage21Context();
  const { resonatorList } = state;
  const { numberOfResonators, resonators = [] } = resonatorList;

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

  const handleResonatorChange = (index, field, value) => {
    const updatedResonators = resonators.map((resonator, i) => {
      if (i !== index) return resonator;

      if (field === "bpType") {
        const isNew = value === "New";
        return {
          ...resonator,
          bpType: value,
          bpNumber: isNew ? "TBD" : "",
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

  const handleRemoveResonator = (index) => {
    const updatedResonators = resonators.filter((_, i) => i !== index);
    dispatch({
      type: "UPDATE_RESONATORS",
      payload: {
        resonatorList: {
          ...resonatorList,
          resonators: updatedResonators,
          numberOfResonators: updatedResonators.length.toString(),
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
        assemblyType: "TAB",
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
    <div className="border p-4 md:p-6 rounded-lg shadow-sm mb-6 bg-white">
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          Resonator Details
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="col-span-1">
          <Input
            label="Number of Resonators"
            type="number"
            min="0"
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
      </div>

      {resonators.length > 0 && (
        <div className="space-y-4 md:space-y-6">
          {resonators.map((resonator, index) => (
            <div
              key={index}
              className="border p-4 md:p-6 rounded-md bg-gray-50"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <h3 className="text-md md:text-lg font-medium text-gray-800">
                  Resonator {index + 1}
                </h3>
                <button
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors self-end md:self-auto"
                  onClick={() => handleRemoveResonator(index)}
                  aria-label="Remove resonator"
                >
                  <Trash2 size={18} />
                  <span className="text-sm">Remove</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name={`bpType-${index}`}
                        value="Existing"
                        checked={resonator.bpType === "Existing"}
                        onChange={() =>
                          handleResonatorChange(index, "bpType", "Existing")
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      B-P/N to be used/modified
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name={`bpType-${index}`}
                        value="New"
                        checked={resonator.bpType === "New"}
                        onChange={() =>
                          handleResonatorChange(index, "bpType", "New")
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      New
                    </label>
                  </div>

                  <div className="w-full md:w-1/3">
                    <Input
                      label="B-P/N"
                      value={resonator.bpNumber || ""}
                      onChange={(value) =>
                        handleResonatorChange(index, "bpNumber", value)
                      }
                      disabled={resonator.bpType === "New"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    type="number"
                    step="0.01"
                    value={resonator.dielectricConstant || ""}
                    onChange={(value) =>
                      handleResonatorChange(index, "dielectricConstant", value)
                    }
                    required
                  />
                  <Input
                    label="Resonator Length"
                    type="number"
                    step="0.01"
                    value={resonator.resonatorLength || ""}
                    onChange={(value) =>
                      handleResonatorChange(index, "resonatorLength", value)
                    }
                    required
                  />
                  <Input
                    label="Resonator Frequency"
                    type="number"
                    step="0.001"
                    value={resonator.resonatorFrequency || ""}
                    onChange={(value) =>
                      handleResonatorChange(index, "resonatorFrequency", value)
                    }
                    required
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resonator Assembly
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name={`assemblyType-${index}`}
                        value="TAB"
                        checked={resonator.assemblyType === "TAB"}
                        onChange={() =>
                          handleResonatorChange(index, "assemblyType", "TAB")
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      TAB
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name={`assemblyType-${index}`}
                        value="Wire"
                        checked={resonator.assemblyType === "Wire"}
                        onChange={() =>
                          handleResonatorChange(index, "assemblyType", "Wire")
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      Wire
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <TextArea
                    label="Comments"
                    value={resonator.comments}
                    onChange={(val) =>
                      handleResonatorChange(index, "comments", val)
                    }
                    placeholder="Add any additional comments"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResonatorDetails;
