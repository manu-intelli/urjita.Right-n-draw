// import React from "react";
// import { usePage21Context } from "../../../context/Page21Context";
// import {
//   Input,
//   Select,
//   TextArea,
// } from "../../../components/common/ReusableComponents";
// import { Trash2 } from "lucide-react";

// const PartDetails = ({ partType, title }) => {
//   const { state, dispatch } = usePage21Context();

//   const partState = state[partType] || {
//     numWithBpn: 0,
//     numWithoutBpn: 0,
//     withBpn: [],
//     withoutBpn: [],
//   };

//   const {
//     numWithBpn,
//     numWithoutBpn,
//     withBpn: partsWithBpn,
//     withoutBpn: partsWithoutBpn,
//   } = partState;

//   const qualificationOptions = [
//     { label: "Qualification", value: "Qualification" },
//     { label: "Approval", value: "Approval" },
//   ];

//   const handleCountChange = (value, isWithBpn) => {
//     var count = parseInt(value, 10) || 0;
//     if (count < 0) count = 0; // Prevent negative values
//     const field = isWithBpn ? "numWithBpn" : "numWithoutBpn";
//     const listKey = isWithBpn ? "withBpn" : "withoutBpn";

//     const defaultItem = isWithBpn
//       ? { name: "", bpn: "" }
//       : {
//           name: "",
//           supplierName: "",
//           supplierNumber: "",
//           qualificationStaus: "",
//           ...(title === "Air Coil" && { airCoilDetailsComment: "" }),
//         };

//     const newList = Array.from({ length: count }, () => ({ ...defaultItem }));

//     dispatch({ type: "SET_COUNT", partType, field, value: count });
//     dispatch({ type: "SET_ITEMS", partType, field: listKey, value: newList });
//   };

//   const handleChange = (index, key, value, isWithBpn) => {
//     const listKey = isWithBpn ? "withBpn" : "withoutBpn";
//     dispatch({
//       type: "UPDATE_ITEM",
//       partType,
//       listKey,
//       index,
//       key,
//       value,
//     });
//   };

//   const handleRemoveRow = (index, isWithBpn) => {
//     const listKey = isWithBpn ? "withBpn" : "withoutBpn";
//     const updatedList = [...(isWithBpn ? partsWithBpn : partsWithoutBpn)];
//     updatedList.splice(index, 1);

//     dispatch({
//       type: "REMOVE_ITEM",
//       partType,
//       listKey,
//       index,
//     });

//     const newCount = updatedList.length;
//     const countField = isWithBpn ? "numWithBpn" : "numWithoutBpn";
//     dispatch({
//       type: "SET_COUNT",
//       partType,
//       field: countField,
//       value: newCount,
//     });
//   };

//   return (
//     <>
//       {/* Number of Parts Inputs */}
//       <div className="sticky top-0 bg-white z-10 p-6 w-full shadow-md rounded-lg">
//         <div className="flex gap-6">
//           <div className="flex-1">
//             <Input
//               label={`Number of ${title} with B-P/N`}
//               type="number"
//               value={numWithBpn}
//               onChange={(val) => handleCountChange(val, true)}
//               className="w-full"
//             />
//           </div>
//           <div className="flex-1">
//             <Input
//               label={`Number of ${title} without B-P/N`}
//               type="number"
//               value={numWithoutBpn}
//               onChange={(val) => handleCountChange(val, false)}
//               className="w-full"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Parts WITH BPN */}
//       {partsWithBpn.length > 0 && (
//         <div>
//           <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
//             <h3 className="text-md font-semibold text-gray-800">
//               {title} with B-P/N
//             </h3>
//           </div>
//           <div className="space-y-4">
//             {partsWithBpn.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex flex-wrap bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-50"
//               >
//                 <div className="flex-1 mx-2 min-w-[200px]">
//                   <Input
//                     label={`${title} ${index + 1} Name`}
//                     value={item.name}
//                     onChange={(value) =>
//                       handleChange(index, "name", value, true)
//                     }
//                     placeholder="Enter Name"
//                   />
//                 </div>
//                 <div className="flex-1 mx-2 min-w-[200px]">
//                   <Input
//                     label="BPN"
//                     value={item.bpn}
//                     onChange={(value) =>
//                       handleChange(index, "bpn", value, true)
//                     }
//                     placeholder="Enter BPN"
//                   />
//                 </div>
//                 <div className="flex items-center justify-center mx-2 mt-7">
//                   <button
//                     onClick={() => handleRemoveRow(index, true)}
//                     className="text-red-600 hover:text-red-700 transition"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Parts WITHOUT BPN */}
//       {partsWithoutBpn.length > 0 && (
//         <div>
//           <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
//             <h3 className="text-md font-semibold text-gray-800">
//               {title} without B-P/N
//             </h3>
//           </div>
//           <div className="space-y-4">
//             {partsWithoutBpn.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex flex-wrap bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-50"
//               >
//                 <div className="flex-1 mx-2 min-w-[200px]">
//                   <Input
//                     label={`${title} ${index + 1} Name`}
//                     value={item.name}
//                     onChange={(value) =>
//                       handleChange(index, "name", value, false)
//                     }
//                     placeholder="Enter Name"
//                   />
//                 </div>
//                 {title !== "Air Coil" ? (
//                   <>
//                     <div className="flex-1 mx-2 min-w-[200px]">
//                       <Input
//                         label="Supplier Name"
//                         value={item.supplierName}
//                         onChange={(value) =>
//                           handleChange(index, "supplierName", value, false)
//                         }
//                         placeholder="Enter Supplier Name"
//                       />
//                     </div>
//                     <div className="flex-1 mx-2 min-w-[200px]">
//                       <Input
//                         label="Supplier P/N"
//                         value={item.supplierNumber}
//                         onChange={(value) =>
//                           handleChange(index, "supplierNumber", value, false)
//                         }
//                         placeholder="Enter Supplier P/N"
//                       />
//                     </div>
//                     <div className="flex-1 mx-2 min-w-[200px]">
//                       <Select
//                         label="Qualification Status"
//                         value={item.qualificationStaus}
//                         options={qualificationOptions}
//                         onChange={(value) =>
//                           handleChange(
//                             index,
//                             "qualificationStaus",
//                             value,
//                             false
//                           )
//                         }
//                         required
//                       />
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="flex-1 mx-2 min-w-[150px]">
//                       <Input
//                         label="wire gauge"
//                         value={item.wiregauge}
//                         onChange={(value) =>
//                           handleChange(index, "wiregauge", value, false)
//                         }
//                         required
//                       />
//                     </div>
//                     <div className="flex-1 mx-2 min-w-[150px]">
//                       <Input
//                         label="Innner Diameter"
//                         value={item.innnerDiameter}
//                         onChange={(value) =>
//                           handleChange(index, "innnerDiameter", value, false)
//                         }
//                         required
//                       />
//                     </div>
//                     <div className="flex-1 mx-2 min-w-[150px]">
//                       <Input
//                         label="Number of Truns"
//                         value={item.numberOfTurns}
//                         onChange={(value) =>
//                           handleChange(index, "numberOfTurns", value, false)
//                         }
//                         required
//                       />
//                     </div>

//                     <div className="flex-1 mx-2 min-w-[150px]">
//                       <Input
//                         label="Length Of Aircoil"
//                         value={item.lengthOfAircoil}
//                         onChange={(value) =>
//                           handleChange(index, "lengthOfAircoil", value, false)
//                         }
//                         required
//                       />
//                     </div>
//                     <div className="flex-1 mx-2 min-w-[150px]">
//                       <Input
//                         label="width Of Aircoil"
//                         value={item.widthOfAircoil}
//                         onChange={(value) =>
//                           handleChange(index, "widthOfAircoil", value, false)
//                         }
//                         required
//                       />
//                     </div>
//                     <div className="flex-1 mx-2 min-w-[120px]">
//                       <Select
//                         label="LBend Aircoil"
//                         value={item.lBendAircoil}
//                         options={qualificationOptions}
//                         onChange={(value) =>
//                           handleChange(index, "lBendAircoil", value, false)
//                         }
//                         required
//                       />
//                     </div>
//                     <div className="flex-1 mx-2 min-w-[120px]">
//                       <Select
//                         label="Shorter leg aircoil"
//                         value={item.ShorterLegAircoil}
//                         options={qualificationOptions}
//                         onChange={(value) =>
//                           handleChange(index, "ShorterLegAircoil", value, false)
//                         }
//                         required
//                       />
//                     </div>
//                   </>
//                 )}
//                 <div className="flex items-center justify-center mx-2 mt-7">
//                   <button
//                     onClick={() => handleRemoveRow(index, false)}
//                     className="text-red-600 hover:text-red-700 transition"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PartDetails;

import React from "react";
import { usePage21Context } from "../../../context/Page21Context";
import {
  Input,
  Select,
  TextArea,
} from "../../../components/common/ReusableComponents";
import { Trash2 } from "lucide-react";

const PartDetails = ({ partType, title }) => {
  const { state, dispatch } = usePage21Context();

  const partState = state[partType] || {
    numWithBpn: 0,
    numWithoutBpn: 0,
    withBpn: [],
    withoutBpn: [],
  };

  const {
    numWithBpn,
    numWithoutBpn,
    withBpn: partsWithBpn,
    withoutBpn: partsWithoutBpn,
  } = partState;

  const qualificationOptions = [
    { label: "Qualification", value: "Qualification" },
    { label: "Approval", value: "Approval" },
  ];

  const yesNoOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const handleCountChange = (value, isWithBpn) => {
    let count = parseInt(value, 10) || 0;
    if (count < 0) count = 0;
    const field = isWithBpn ? "numWithBpn" : "numWithoutBpn";
    const listKey = isWithBpn ? "withBpn" : "withoutBpn";

    const defaultItem = isWithBpn
      ? { name: "", bpn: "" }
      : {
          name: "",
          supplierName: "",
          supplierNumber: "",
          qualificationStaus: "",
          ...(title === "Air Coil" && {
            wiregauge: "",
            innnerDiameter: "",
            numberOfTurns: "",
            lengthOfAircoil: "",
            widthOfAircoil: "",
            lBendAircoil: "",
            ShorterLegAircoil: "",
            airCoilDetailsComment: "",
          }),
        };

    const newList = Array.from({ length: count }, () => ({ ...defaultItem }));

    dispatch({ type: "SET_COUNT", partType, field, value: count });
    dispatch({ type: "SET_ITEMS", partType, field: listKey, value: newList });
  };

  const handleChange = (index, key, value, isWithBpn) => {
    const listKey = isWithBpn ? "withBpn" : "withoutBpn";
    dispatch({
      type: "UPDATE_ITEM",
      partType,
      listKey,
      index,
      key,
      value,
    });
  };

  const handleRemoveRow = (index, isWithBpn) => {
    const listKey = isWithBpn ? "withBpn" : "withoutBpn";
    const updatedList = [...(isWithBpn ? partsWithBpn : partsWithoutBpn)];
    updatedList.splice(index, 1);

    dispatch({
      type: "REMOVE_ITEM",
      partType,
      listKey,
      index,
    });

    const newCount = updatedList.length;
    const countField = isWithBpn ? "numWithBpn" : "numWithoutBpn";
    dispatch({
      type: "SET_COUNT",
      partType,
      field: countField,
      value: newCount,
    });
  };

  return (
    <div className="space-y-6">
      {/* Number of Parts Inputs */}
      <div className="sticky top-0 bg-white z-10 p-4 shadow-sm rounded-lg border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label={`Number of ${title} with B-P/N`}
            type="number"
            value={numWithBpn}
            onChange={(val) => handleCountChange(val, true)}
            compact
          />
          <Input
            label={`Number of ${title} without B-P/N`}
            type="number"
            value={numWithoutBpn}
            onChange={(val) => handleCountChange(val, false)}
            compact
          />
        </div>
      </div>

      {/* Parts WITH BPN */}
      {partsWithBpn.length > 0 && (
        <div className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700">
              {title} with B-P/N
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {partsWithBpn.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-shadow"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                  <Input
                    label={`${title} Name`}
                    value={item.name}
                    onChange={(value) =>
                      handleChange(index, "name", value, true)
                    }
                    placeholder="Enter name"
                    compact
                  />
                  <Input
                    label="B-P/N"
                    value={item.bpn}
                    onChange={(value) =>
                      handleChange(index, "bpn", value, true)
                    }
                    placeholder="Enter B-P/N"
                    compact
                  />
                  <button
                    onClick={() => handleRemoveRow(index, true)}
                    className="flex items-center justify-center text-red-500 hover:text-red-700 transition-colors h-9"
                  >
                    <Trash2 size={16} className="mr-1" />
                    <span className="text-xs">Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Parts WITHOUT BPN */}
      {partsWithoutBpn.length > 0 && (
        <div className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700">
              {title} without B-P/N
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {partsWithoutBpn.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-shadow"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <Input
                      label={`${title} Name`}
                      value={item.name}
                      onChange={(value) =>
                        handleChange(index, "name", value, false)
                      }
                      placeholder="Enter name"
                      compact
                    />

                    {title !== "Air Coil" ? (
                      <>
                        <Input
                          label="Supplier Name"
                          value={item.supplierName}
                          onChange={(value) =>
                            handleChange(index, "supplierName", value, false)
                          }
                          placeholder="Enter supplier"
                          compact
                        />
                        <Input
                          label="Supplier P/N"
                          value={item.supplierNumber}
                          onChange={(value) =>
                            handleChange(index, "supplierNumber", value, false)
                          }
                          placeholder="Enter P/N"
                          compact
                        />
                        <Select
                          label="Qualification Status"
                          value={item.qualificationStaus}
                          options={qualificationOptions}
                          onChange={(value) =>
                            handleChange(
                              index,
                              "qualificationStaus",
                              value,
                              false
                            )
                          }
                          compact
                        />
                      </>
                    ) : (
                      <>
                        <Input
                          label="Wire Gauge"
                          value={item.wiregauge}
                          onChange={(value) =>
                            handleChange(index, "wiregauge", value, false)
                          }
                          compact
                        />
                        <Input
                          label="Inner Diameter"
                          value={item.innnerDiameter}
                          onChange={(value) =>
                            handleChange(index, "innnerDiameter", value, false)
                          }
                          compact
                        />
                        <Input
                          label="Number of Turns"
                          value={item.numberOfTurns}
                          onChange={(value) =>
                            handleChange(index, "numberOfTurns", value, false)
                          }
                          compact
                        />
                        <Input
                          label="Length"
                          value={item.lengthOfAircoil}
                          onChange={(value) =>
                            handleChange(index, "lengthOfAircoil", value, false)
                          }
                          compact
                        />
                        <Input
                          label="Width"
                          value={item.widthOfAircoil}
                          onChange={(value) =>
                            handleChange(index, "widthOfAircoil", value, false)
                          }
                          compact
                        />
                        <Select
                          label="L-Bend Aircoil"
                          value={item.lBendAircoil}
                          options={yesNoOptions}
                          onChange={(value) =>
                            handleChange(index, "lBendAircoil", value, false)
                          }
                          compact
                        />
                        <Select
                          label="Shorter Leg"
                          value={item.ShorterLegAircoil}
                          options={yesNoOptions}
                          onChange={(value) =>
                            handleChange(
                              index,
                              "ShorterLegAircoil",
                              value,
                              false
                            )
                          }
                          compact
                        />
                      </>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleRemoveRow(index, false)}
                      className="flex items-center text-red-500 hover:text-red-700 transition-colors text-sm"
                    >
                      <Trash2 size={16} className="mr-1" />
                      <span className="text-xs">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PartDetails;
