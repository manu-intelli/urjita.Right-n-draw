// import React from "react";
// import { usePage21Context } from "../../../context/Page21Context";
// import { Input } from "../../../components/common/ReusableComponents";
// import { Trash2 } from "lucide-react";

// const TransformersPage = () => {
//   const { state, dispatch } = usePage21Context();
//   const transformersList = state.transformers?.transformersList || [];

//   const handleTransformerCountChange = (count) => {
//     const number = parseInt(count) || 0;
//     const currentLength = transformersList.length;

//     if (number > currentLength) {
//       const newTransformers = Array.from(
//         { length: number - currentLength },
//         () => ({
//           name: "",
//           coreType: "single",
//           wireType: "single",
//           coreBPN: [""],
//           wireGauge: [""],
//           numberOfTurns: "",
//         })
//       );

//       dispatch({
//         type: "transformer_transformer_add_multiple",
//         items: newTransformers,
//       });
//     } else if (number < currentLength) {
//       dispatch({
//         type: "transformer_transformer_set_length",
//         length: number,
//       });
//     }
//   };

//   const handleChange = (index, field, value) => {
//     dispatch({
//       type: "transformer_transformer_update",
//       index,
//       field,
//       value,
//     });

//     if (field === "coreType") {
//       handleBulkChange(index, {
//         coreBPN: value === "double" ? ["", ""] : [""],
//       });
//     }

//     if (field === "wireType") {
//       handleBulkChange(index, { wireGauge: [""] });
//     }
//   };

//   const handleBulkChange = (index, fields) => {
//     dispatch({
//       type: "transformer_transformer_update_fields",
//       index,
//       fields,
//     });
//   };

//   const handleArrayChange = (index, field, i, value) => {
//     const updatedArray = [...(transformersList[index][field] || [])];
//     updatedArray[i] = value;
//     dispatch({
//       type: "transformer_transformer_update",
//       index,
//       field,
//       value: updatedArray,
//     });
//   };

//   const handleRemovePart = (index) => {
//     const updated = transformersList.filter((_, i) => i !== index);
//     dispatch({
//       type: "transformer_transformer_replace_all",
//       items: updated,
//     });
//   };

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <Input
//           label="Number of Transformers"
//           type="number"
//           min={0}
//           value={transformersList.length}
//           onChange={handleTransformerCountChange}
//         />
//       </div>

//       {transformersList.map((item, index) => (
//         <div key={index} className="border p-4 rounded-md shadow-sm mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold">Transformer {index + 1}</h3>
//             <button
//               className="text-red-500 hover:text-red-700"
//               onClick={() => handleRemovePart(index)}
//             >
//               <Trash2 size={18} />
//             </button>
//           </div>

//           <div className="grid grid-cols-1 gap-6">
//             <div className="md:w-1/2">
//               <Input
//                 label={`Transformer ${index + 1} Name`}
//                 value={item.name || ""}
//                 onChange={(value) => handleChange(index, "name", value)}
//                 placeholder="Enter Name"
//               />
//             </div>
//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="md:w-1/2">
//                 <label className="block font-medium mb-1">Core Type</label>
//                 <div className="flex gap-4">
//                   {["single", "double"].map((type) => (
//                     <label key={type} className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name={`coreType-${index}`}
//                         value={type}
//                         checked={item.coreType === type}
//                         onChange={() => handleChange(index, "coreType", type)}
//                       />
//                       {type.charAt(0).toUpperCase() + type.slice(1)} Core
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div className="md:w-1/2">
//                 {(item.coreBPN || []).map((val, i) => (
//                   <Input
//                     key={i}
//                     label={`Core B-P/N ${item.coreBPN.length > 1 ? i + 1 : ""}`}
//                     value={val}
//                     onChange={(value) =>
//                       handleArrayChange(index, "coreBPN", i, value)
//                     }
//                     required
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="md:w-1/2">
//                 <label className="block font-medium mb-1">Wire Type</label>
//                 <div className="flex gap-4">
//                   {["single", "double"].map((type) => (
//                     <label key={type} className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name={`wireType-${index}`}
//                         value={type}
//                         checked={item.wireType === type}
//                         onChange={() => handleChange(index, "wireType", type)}
//                       />
//                       {type.charAt(0).toUpperCase() + type.slice(1)} Wire
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div className="md:w-1/2">
//                 {(item.wireGauge || []).map((val, i) => (
//                   <Input
//                     key={i}
//                     label="Wire Gauge"
//                     value={val}
//                     onChange={(value) =>
//                       handleArrayChange(index, "wireGauge", i, value)
//                     }
//                     required
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Input
//                 label="Number of Turns"
//                 value={item.numberOfTurns}
//                 onChange={(value) =>
//                   handleChange(index, "numberOfTurns", value)
//                 }
//                 required
//               />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TransformersPage;

import React from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input } from "../../../components/common/ReusableComponents";
import { Trash2 } from "lucide-react";

const TransformersPage = () => {
  const { state, dispatch } = usePage21Context();
  const transformersList = state.transformers?.transformersList || [];

  const handleTransformerCountChange = (count) => {
    const number = parseInt(count) || 0;
    const currentLength = transformersList.length;

    if (number > currentLength) {
      const newTransformers = Array.from(
        { length: number - currentLength },
        () => ({
          name: "",
          coreType: "single",
          wireType: "single",
          coreBPN: [""],
          wireGauge: [""],
          numberOfTurns: "",
          orientation: "",
        })
      );

      dispatch({
        type: "transformer_transformer_add_multiple",
        items: newTransformers,
      });
    } else if (number < currentLength) {
      dispatch({
        type: "transformer_transformer_set_length",
        length: number,
      });
    }
  };

  const handleChange = (index, field, value) => {
    dispatch({
      type: "transformer_transformer_update",
      index,
      field,
      value,
    });

    if (field === "coreType") {
      handleBulkChange(index, {
        coreBPN: value === "double" ? ["", ""] : [""],
      });
    }

    if (field === "wireType") {
      handleBulkChange(index, {
        wireGauge: value === "double" ? ["", ""] : [""],
      });
    }
  };

  const handleBulkChange = (index, fields) => {
    dispatch({
      type: "transformer_transformer_update_fields",
      index,
      fields,
    });
  };

  const handleArrayChange = (index, field, i, value) => {
    const updatedArray = [...(transformersList[index][field] || [])];
    updatedArray[i] = value;
    dispatch({
      type: "transformer_transformer_update",
      index,
      field,
      value: updatedArray,
    });
  };

  const handleRemovePart = (index) => {
    const updated = transformersList.filter((_, i) => i !== index);
    dispatch({
      type: "transformer_transformer_replace_all",
      items: updated,
    });
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 w-full sm:w-1/3">
        <Input
          label="Number of Transformers"
          type="number"
          min={0}
          value={transformersList.length}
          onChange={handleTransformerCountChange}
        />
      </div>

      {transformersList.map((item, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Transformer {index + 1}</h3>
            <button
              className="text-red-500 hover:text-red-700 transition-colors"
              onClick={() => handleRemovePart(index)}
              aria-label="Remove transformer"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Top Row - Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Input
                label={`Transformer ${index + 1} Name`}
                value={item.name || ""}
                onChange={(value) => handleChange(index, "name", value)}
                placeholder="Enter Name"
              />
              <Input
                label="Number of Turns"
                value={item.numberOfTurns}
                onChange={(value) =>
                  handleChange(index, "numberOfTurns", value)
                }
                required
              />
              <Input
                label="Orientation"
                value={item.orientation}
                onChange={(value) => handleChange(index, "orientation", value)}
                required
              />
            </div>

            {/* Core and Wire Configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Core Type Section */}
              <div className="space-y-4 p-3 border rounded-md bg-gray-50">
                <div>
                  <label className="block font-medium mb-2">Core Config</label>
                  <div className="flex flex-wrap gap-4 mb-3">
                    {["single", "double"].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`coreType-${index}`}
                          value={type}
                          checked={item.coreType === type}
                          onChange={() => handleChange(index, "coreType", type)}
                          className="h-4 w-4"
                        />
                        {type.charAt(0).toUpperCase() + type.slice(1)} Core
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(item.coreBPN || []).map((val, i) => (
                    <Input
                      key={i}
                      label={`Core B-P/N ${
                        item.coreBPN.length > 1 ? i + 1 : ""
                      }`}
                      value={val}
                      onChange={(value) =>
                        handleArrayChange(index, "coreBPN", i, value)
                      }
                      required
                      containerClass="w-full"
                    />
                  ))}
                </div>
              </div>

              {/* Wire Type Section */}
              <div className="space-y-4 p-3 border rounded-md bg-gray-50">
                <div>
                  <label className="block font-medium mb-2">
                    Wire gauge Config
                  </label>
                  <div className="flex flex-wrap gap-4 mb-3">
                    {["single", "double"].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`wireType-${index}`}
                          value={type}
                          checked={item.wireType === type}
                          onChange={() => handleChange(index, "wireType", type)}
                          className="h-4 w-4"
                        />
                        {type.charAt(0).toUpperCase() + type.slice(1)} Wire
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(item.wireGauge || []).map((val, i) => (
                    <Input
                      key={i}
                      label={`Wire Gauge ${
                        item.wireGauge.length > 1 ? i + 1 : ""
                      }`}
                      value={val}
                      onChange={(value) =>
                        handleArrayChange(index, "wireGauge", i, value)
                      }
                      required
                      containerClass="w-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransformersPage;
