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

  const partState = state[partType];

  const {
    numWithBpn,
    numWithoutBp,
    withBpn: partsWithBpn,
    withoutBpn: partsWithoutBpn,
  } = partState;

  const qualificationOptions = [
    { label: "Qualification", value: "Qualification" },
    { label: "Approval", value: "Approval" },
  ];

  const handleCountChange = (value, isWithBpn) => {
    const field = isWithBpn ? "numWithBpn" : "numWithoutBpn";
    const count = parseInt(value, 10) || 0;

    // Create empty array with count number of objects
    const listKey = isWithBpn ? "withBpn" : "withoutBpn";
    const defaultItem = isWithBpn
      ? { name: "", bpn: "" }
      : {
          name: "",
          supplierName: "",
          supplierNumber: "",
          qualificationStaus: "",
          airCoilDetailsComment: "", // Include airCoilDetailsComment for consistency
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

    dispatch({
      type: "REMOVE_ITEM",
      partType,
      listKey,
      index,
    });

    const newCount = (isWithBpn ? partsWithBpn : partsWithoutBpn).length - 1;
    const countField = isWithBpn ? "numWithBpn" : "numWithoutBp";
    dispatch({
      type: "SET_COUNT",
      partType,
      field: countField,
      value: newCount,
    });
  };

  return (
    <>
      {/* Ask for Number of Parts */}
      <div className="sticky top-0 bg-white z-10 p-6 w-full shadow-md rounded-lg">
        <div className="flex gap-6">
          <div className="flex-1">
            <Input
              label={`Number of ${title} with BP/N`}
              type="number"
              value={numWithBpn}
              onChange={(val) => handleCountChange(val, true)}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <Input
              label={`Number of ${title} without BP/N`}
              type="number"
              value={numWithoutBp}
              onChange={(val) => handleCountChange(val, false)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Parts with BPN */}
      {partsWithBpn.length > 0 && (
        <div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <h3 className="text-md font-semibold text-gray-800">
              {title} with BP/N
            </h3>
          </div>
          <div className="space-y-4">
            {partsWithBpn.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-50"
              >
                <div className="flex-1 mx-2 min-w-[200px]">
                  <Input
                    label={`${title} ${index + 1} Name`}
                    value={item.name}
                    onChange={(value) =>
                      handleChange(index, "name", value, true)
                    }
                    placeholder="Enter Name"
                  />
                </div>
                <div className="flex-1 mx-2 min-w-[200px]">
                  <Input
                    label="BPN"
                    value={item.bpn}
                    onChange={(value) =>
                      handleChange(index, "bpn", value, true)
                    }
                    placeholder="Enter BPN"
                  />
                </div>
                <div className="flex items-center justify-center mx-2 mt-7">
                  <button
                    onClick={() => handleRemoveRow(index, true)}
                    className="text-red-600 hover:text-red-700 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Parts without BPN */}
      {partsWithoutBpn.length > 0 && (
        <div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <h3 className="text-md font-semibold text-gray-800">
              {title} without BP/N
            </h3>
          </div>
          <div className="space-y-4">
            {partsWithoutBpn.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-50"
              >
                <div className="flex-1 mx-2 min-w-[200px]">
                  <Input
                    label={`${title} ${index + 1} Name`}
                    value={item.name}
                    onChange={(value) =>
                      handleChange(index, "name", value, false)
                    }
                    placeholder="Enter Name"
                  />
                </div>
                <div className="flex-1 mx-2 min-w-[200px]">
                  <Input
                    label="Supplier Name"
                    value={item.supplierName}
                    onChange={(value) =>
                      handleChange(index, "supplierName", value, false)
                    }
                    placeholder="Enter Supplier Name"
                  />
                </div>
                <div className="flex-1 mx-2 min-w-[200px]">
                  <Input
                    label="Supplier P/N"
                    value={item.supplierNumber}
                    onChange={(value) =>
                      handleChange(index, "supplierNumber", value, false)
                    }
                    placeholder="Enter Supplier P/N"
                  />
                </div>
                {title !== "Air Coil" ? (
                  <div className="flex-1 mx-2 min-w-[200px]">
                    <Select
                      label="Qualification Status"
                      value={item.qualificationStaus}
                      options={qualificationOptions}
                      onChange={(value) =>
                        handleChange(index, "qualificationStaus", value, false)
                      }
                      required
                    />
                  </div>
                ) : (
                  <div className="flex-1 mx-2 min-w-[400px]">
                    <TextArea
                      label="Aircoil Details Comment"
                      value={item.airCoilDetailsComment} // Use this for storing the approval comment
                      onChange={(value) =>
                        handleChange(
                          index,
                          "airCoilDetailsComment",
                          value,
                          false
                        )
                      }
                      multiline
                      required
                    />
                  </div>
                )}

                <div className="flex items-center justify-center mx-2 mt-7">
                  <button
                    onClick={() => handleRemoveRow(index, false)}
                    className="text-red-600 hover:text-red-700 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PartDetails;
