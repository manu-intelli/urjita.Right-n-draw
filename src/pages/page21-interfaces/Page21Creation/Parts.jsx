import React from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, Select } from "../../../components/common/ReusableComponents";
import { Trash2 } from "lucide-react";
import {
  QUALIFICATION_STATUS_OPTIONS,
  YES_OR_NO_OPTIONS,
} from "../../../Utils/dropDownOptions";

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
          ...(partType === "airCoil" && {
            wiregauge: "",
            innnerDiameter: "",
            numberOfTurns: "",
            lengthOfAircoil: "",
            widthOfAircoil: "",
            lBendAircoil: "",
            shorterLegAircoil: "",
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
                    label={`${title} Name ${index + 1}`}
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
                      label={`${title} Name ${index + 1}`}
                      value={item.name}
                      onChange={(value) =>
                        handleChange(index, "name", value, false)
                      }
                      placeholder="Enter name"
                      compact
                    />

                    {partType !== "airCoil" ? (
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
                          options={QUALIFICATION_STATUS_OPTIONS}
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
                          options={YES_OR_NO_OPTIONS}
                          onChange={(value) =>
                            handleChange(index, "lBendAircoil", value, false)
                          }
                          compact
                        />
                        <Select
                          label="Shorter Leg"
                          value={item.ShorterLegAircoil}
                          options={YES_OR_NO_OPTIONS}
                          onChange={(value) =>
                            handleChange(
                              index,
                              "shorterLegAircoil",
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
