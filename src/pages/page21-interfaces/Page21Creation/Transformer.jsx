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
          coreType: "single",
          wireType: "single",
          coreBPN: [""],
          wireGauge: [""],
          numberOfTurns: "",
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
      handleBulkChange(index, { wireGauge: [""] });
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
    <div className="p-6">
      <div className="mb-6">
        <Input
          label="Number of Transformers"
          type="number"
          min={0}
          value={transformersList.length}
          onChange={handleTransformerCountChange}
        />
      </div>

      {transformersList.map((item, index) => (
        <div key={index} className="border p-4 rounded-md shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Transformer {index + 1}</h3>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemovePart(index)}
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <label className="block font-medium mb-1">Core Type</label>
                <div className="flex gap-4">
                  {["single", "double"].map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`coreType-${index}`}
                        value={type}
                        checked={item.coreType === type}
                        onChange={() => handleChange(index, "coreType", type)}
                      />
                      {type.charAt(0).toUpperCase() + type.slice(1)} Core
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:w-1/2">
                {(item.coreBPN || []).map((val, i) => (
                  <Input
                    key={i}
                    label={`Core BP/N ${item.coreBPN.length > 1 ? i + 1 : ""}`}
                    value={val}
                    onChange={(value) =>
                      handleArrayChange(index, "coreBPN", i, value)
                    }
                    required
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <label className="block font-medium mb-1">Wire Type</label>
                <div className="flex gap-4">
                  {["single", "double"].map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`wireType-${index}`}
                        value={type}
                        checked={item.wireType === type}
                        onChange={() => handleChange(index, "wireType", type)}
                      />
                      {type.charAt(0).toUpperCase() + type.slice(1)} Wire
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:w-1/2">
                {(item.wireGauge || []).map((val, i) => (
                  <Input
                    key={i}
                    label="Wire Gauge"
                    value={val}
                    onChange={(value) =>
                      handleArrayChange(index, "wireGauge", i, value)
                    }
                    required
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Number of Turns"
                value={item.numberOfTurns}
                onChange={(value) =>
                  handleChange(index, "numberOfTurns", value)
                }
                required
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransformersPage;
