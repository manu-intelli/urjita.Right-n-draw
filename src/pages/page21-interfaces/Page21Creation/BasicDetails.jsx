import React, { useEffect } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, Select } from "../../../components/common/ReusableComponents";
import { COMPONENT_TYPES, COMPONENTS } from "../../../constants";
import { TECHNOLOGY_OPTIONS } from "../../../Utils/dropDownOptions";

const modelFamilyOptions = [
  { label: "Family A", value: "FamilyA" },
  { label: "FamilyB", value: "FamilyB" },
  { label: "Family C", value: "FamilyC" },
];

const BasicDetails = () => {
  const { state, dispatch } = usePage21Context();
  const { selectedComponents = [] } = state; // Now using array from context

  const handleChange = (field, value) => {
    dispatch({ type: "SET_FIELD", payload: { field, value } });
  };

  const toggleComponent = (id) => {
    dispatch({ type: "TOGGLE_COMPONENT", payload: id });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white shadow rounded-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            label="OP Number"
            value={state.opNumber || ""}
            onChange={(value) => handleChange("opNumber", value)}
            required
          />
          <Input
            label="OPU Number"
            value={state.opuNumber || ""}
            onChange={(value) => handleChange("opuNumber", value)}
            required
          />
          <Input
            label="EDU Number"
            value={state.eduNumber || ""}
            onChange={(value) => handleChange("eduNumber", value)}
            required
          />
          <Select
            label="Model Family"
            value={state.modelFamily}
            options={modelFamilyOptions}
            onChange={(value) => handleChange("modelFamily", value)}
            required
          />
          <Input
            label="Model Name"
            value={state.modelName || ""}
            onChange={(value) => handleChange("modelName", value)}
            required
          />
          <Select
            label="Technology"
            value={state.technology}
            options={TECHNOLOGY_OPTIONS}
            onChange={(value) => handleChange("technology", value)}
            required
          />
        </div>
      </div>

      {/* <div className="p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Component Selection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {COMPONENTS.map(({ id, name, icon: Icon, description }) => {
            const isSelected = selectedComponents.includes(id);
            return (
              <div
                key={id}
                onClick={() => toggleComponent(id)}
                className={`
                  cursor-pointer rounded-xl p-6 transition-all duration-300 transform hover:scale-105
                  ${
                    isSelected
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-lg ${
                      isSelected ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <Icon
                      size={24}
                      className={isSelected ? "text-white" : "text-gray-700"}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{name}</h3>
                    <p className="text-sm opacity-75">{description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Selected Components
          </h2>
          <div className="flex flex-wrap gap-3">
            {selectedComponents.length > 0 ? (
              selectedComponents.map((id) => {
                const component = COMPONENTS.find((c) => c.id === id);
                return (
                  <span
                    key={id}
                    className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium"
                  >
                    {component?.name}
                  </span>
                );
              })
            ) : (
              <p className="text-gray-500 italic">No components selected</p>
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BasicDetails;
