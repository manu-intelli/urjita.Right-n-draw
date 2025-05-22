import React, { useState, useRef } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { Input, Select, TextArea } from "../../../components/common/ReusableComponents";
import { BOTTOM_SOLIDER_MASK_OPTIONS, CONNECTOR_GENDER_OPTIONS, COVER_TYPE_OPTIONS, IMPEDANCE_OPTIONS, INTERFACE_OPTIONS, SIGNAL_LAUNCH_TYPE_OPTIONS, YES_OR_NO_OPTIONS } from "../../../Utils/dropDownOptions";




const EXISTING_CASE_STYLES = [
  { label: "Case A", value: "Case A" },
  { label: "Case B", value: "Case B" },
  { label: "Case C", value: "Case C" },
  { label: "Case D", value: "Case D" },
];



const GeneralDetails = () => {
  const { state, dispatch } = usePage21Context();
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  // Centralized field reset logic
  const resetDependentFields = (field, value) => {
    const resetActions = {
      impedance: (value) => {
        if (value !== "Others") {
          dispatch({ type: "SET_FIELD", payload: { field: "customImpedance", value: "" } });
        }
      },
      
      interfaces: (value) => {
        if (value !== "Connectorized") {
          dispatch({ type: "SET_NUMBER_OF_PORTS", value: "" });
          dispatch({ type: "RESET_PORTS" });
          dispatch({ 
            type: "UPDATE_ENCLOSURE_DETAILS", 
            payload: { 
              partType: "Existing",
              partNumber: ""
            }
          });
          dispatch({ 
            type: "UPDATE_TOPCOVER_DETAILS", 
            payload: { 
              partType: "Existing",
              partNumber: ""
            }
          });
        }
      },
      
      caseStyle: (value) => {
        if (value !== "New") {
          dispatch({ 
            type: "SET_CASE_DIMENSIONS", 
            payload: { 
              length: "", 
              width: "", 
              height: "" 
            } 
          });
        }
        
        if (value === "New") {
          dispatch({ type: "SET_FIELD", payload: { field: "selectedCaseStyle", value: "" } });
          dispatch({ type: "SET_CASE_DIMENSIONS", payload: { pinOuts: "" } });
        }
      },
      
      coverType: (value) => {
        if (value !== "Open") {
          dispatch({ 
            type: "UPDATE_CAN", 
            payload: {
              isExistingCanAvailable: "No",
              bpNumber: "",
              canMaterial: "",
              canProcess: "",
              customCanMaterial: ""
            }
          });
        }
      }
    };

    if (resetActions[field]) {
      resetActions[field](value);
    }
  };

  // Handlers
  const handleChange = (field, value) => {
    dispatch({ type: "SET_FIELD", payload: { field, value } });
    resetDependentFields(field, value);
  };

  const handleCaseDimensionsChange = (field, value) => {
    dispatch({ type: "SET_CASE_DIMENSIONS", payload: { field, value } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch({ type: "SET_FILE", payload: { file } });
      const isPreviewable = file.type === "application/pdf" || file.type.startsWith("image/");
      setPreviewUrl(isPreviewable ? URL.createObjectURL(file) : null);
    }
  };

  const clearSchematic = () => {
    dispatch({ type: "REMOVE_FILE" });
    if (fileInputRef.current) fileInputRef.current.value = "";
    setPreviewUrl(null);
  };

  const handleNumberOfPortsChange = (value) => {
    if (value === "") {
      dispatch({ type: "SET_NUMBER_OF_PORTS", value: "" });
      return;
    }

    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 2 && parsed <= 6) {
      dispatch({ type: "SET_NUMBER_OF_PORTS", value: parsed });
    }
  };

  const handlePortChange = (index, field, value) => {
    dispatch({ type: "UPDATE_PORT", index, field, value });
  };

  const handleEnclosureChange = (field, value) => {
    dispatch({ type: "UPDATE_ENCLOSURE_DETAILS", field, value });
  };

  const handleTopcoverChange = (field, value) => {
    dispatch({ type: "UPDATE_TOPCOVER_DETAILS", field, value });
  };

  // Helper components
  const renderPortFields = () => {
    return state.ports.portDetails.map((port, index) => {
      const portLabel = state.ports.numberOfPorts === 2
        ? index === 0 ? "Input Port" : "Output Port"
        : index === 0 ? "Input Port" : `Channel ${index}`;

      return (
        <div key={index} className="bg-gray-50 p-2 rounded-md space-y-2">
          <h3 className="text-xs font-medium text-gray-600">{portLabel}</h3>
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Connector Type"
              value={port.connectorType}
              onChange={(value) => handlePortChange(index, "connectorType", value)}
              compact
            />
            <Select
              label="Connector Gender"
              options={CONNECTOR_GENDER_OPTIONS}
              value={port.connectorGender}
              onChange={(value) => handlePortChange(index, "connectorGender", value)}
              compact
            />
          </div>
        </div>
      );
    });
  };

  const renderEnclosureDetails = () => (
    <div className="bg-blue-50 p-2 rounded-md space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {["enclosure", "topcover"].map((type) => (
          <div key={type} className="space-y-2">
            <h3 className="text-xs font-medium text-gray-700">
              {type === "enclosure" ? "Enclosure" : "Topcover"} Details
            </h3>
            <div className="flex space-x-3">
              {["Existing", "New"].map((option) => (
                <label key={option} className="inline-flex items-center space-x-1.5">
                  <input
                    type="radio"
                    name={`${type}Type-${option}`}
                    value={option}
                    checked={state[`${type}Details`].partType === option}
                    onChange={() => 
                      type === "enclosure" 
                        ? handleEnclosureChange("partType", option)
                        : handleTopcoverChange("partType", option)
                    }
                    className="h-3 w-3 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            <Input
              label="Part Number"
              value={
                state[`${type}Details`].partType === "New"
                  ? "TBD"
                  : state[`${type}Details`]?.partNumber || ""
              }
              onChange={(value) => 
                type === "enclosure"
                  ? handleEnclosureChange(
                      "partNumber",
                      state.enclosureDetails.partType === "New" ? "TBD" : value
                    )
                  : handleTopcoverChange(
                      "partNumber",
                      state.topcoverDetails.partType === "New" ? "TBD" : value
                    )
              }
              disabled={state[`${type}Details`].partType === "New"}
              compact
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderCaseStyleFields = () => {
    if (state.caseStyle === "New") {
      return (
        <div className="grid grid-cols-3 gap-2">
          {["length", "width", "height"].map((dimension) => (
            <Input
              key={dimension}
              label={dimension.charAt(0).toUpperCase() + dimension.slice(1)}
              type="number"
              value={state.caseDimensions[dimension] || ""}
              onChange={(value) => handleCaseDimensionsChange(dimension, Number(value))}
              required
              disabled={state.caseStyle === "Existing"}
              compact
            />
          ))}
        </div>
      );
    } else if (state.caseStyle) {
      return (
        <div className="space-y-2">
          <Select
            label="Selected Case Style"
            value={state.selectedCaseStyle}
            options={EXISTING_CASE_STYLES}
            onChange={(value) => handleChange("selectedCaseStyle", value)}
            required
            compact
          />
          <TextArea
            label="PinOuts"
            value={state.caseDimensions?.pinOuts || ""}
            onChange={(value) => handleCaseDimensionsChange("pinOuts", Number(value))}
            required
            //disabled={state.caseStyle === "Existing"}
            compact
            rows={2}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-3">
          {/* Impedance */}
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Impedance"
              value={state.impedance}
              options={IMPEDANCE_OPTIONS}
              onChange={(value) => handleChange("impedance", value)}
              required
              compact
            />
            <Select
              label="Interfaces"
              value={state.interfaces}
              options={INTERFACE_OPTIONS}
              onChange={(value) => handleChange("interfaces", value)}
              required
              compact
            />
          </div>

          {state.impedance === "Others" && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Custom Impedance"
                type="number"
                value={state.customImpedance || ""}
                onChange={(value) => handleChange("customImpedance", value)}
                required
                compact
              />
            </div>
          )}

          {state.interfaces === "Connectorized" && (
            <div className="space-y-2 pl-2 border-l-2 border-blue-100">
              <Input
                label="Number of Ports"
                type="number"
                value={state.ports.numberOfPorts || ""}
                onChange={handleNumberOfPortsChange}
                max={6}
                compact
              />
              {Array.isArray(state.ports.portDetails) && renderPortFields()}
              {renderEnclosureDetails()}
            </div>
          )}

          {/* Case Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Case Style
            </label>
            <div className="flex flex-wrap gap-2">
              {["Existing", "ModifyExisting", "New"].map((option) => (
                <label key={option} className="inline-flex items-center space-x-1.5">
                  <input
                    type="radio"
                    name="caseStyle"
                    value={option}
                    checked={state.caseStyle === option}
                    onChange={() => handleChange("caseStyle", option)}
                    className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    {option === "ModifyExisting" ? "Modify Existing" : option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {renderCaseStyleFields()}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {/* Technical Options */}
          {state?.technology !== "thin_film" && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Select
                  label="Bottom Solder Mask"
                  value={state.bottomSolderMask}
                  options={BOTTOM_SOLIDER_MASK_OPTIONS}
                  onChange={(value) => handleChange("bottomSolderMask", value)}
                  required
                  compact
                />
                <Select
                  label="Half Moon Requirement"
                  value={state.halfMoonRequirement}
                  options={YES_OR_NO_OPTIONS}
                  onChange={(value) => handleChange("halfMoonRequirement", value)}
                  required
                  compact
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Select
                  label="Via Holes Requirement"
                  value={state.viaHolesRequirement}
                  options={YES_OR_NO_OPTIONS}
                  onChange={(value) => handleChange("viaHolesRequirement", value)}
                  required
                  compact
                />
                <Select
                  label="Signal Launch Type"
                  value={state.signalLaunchType}
                  options={SIGNAL_LAUNCH_TYPE_OPTIONS}
                  onChange={(value) => handleChange("signalLaunchType", value)}
                  required
                  compact
                />
              </div>
            </div>
          )}

          {/* Cover and Design Rules */}
          <div className="grid grid-cols-2 gap-2">
            <Select
              label="Cover Type"
              value={state.coverType}
              options={COVER_TYPE_OPTIONS}
              onChange={(value) => handleChange("coverType", value)}
              required
              compact
            />
            {state?.technology !== "docs_diplexer" && (
              <Select
                label="Design Rule Violation"
                value={state.designRuleViolation}
                options={YES_OR_NO_OPTIONS}
                onChange={(value) => handleChange("designRuleViolation", value)}
                required
                compact
              />
            )}
          </div>

          {/* Similar Model */}
          {state?.technology !== "docs_diplexer" && (
            <Input
              label="Similar Model"
              value={state.similarModel || ""}
              onChange={(value) => handleChange("similarModel", value)}
              required
              compact
            />
          )}
        </div>
      </div>

      {/* Schematic Upload */}
      {state?.technology !== "docs_diplexer" && (
        <div className="mt-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Schematic
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
            <div className="text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png"
                className="hidden"
                id="schematic-upload"
              />
              <label
                htmlFor="schematic-upload"
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-xs text-gray-500">Drag & drop files here or click to browse</p>
                <p className="text-xs text-gray-400">Supported formats: PDF, DWG, DXF, JPG, PNG</p>
              </label>
            </div>
            {state.schematicFile && (
              <div className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded-md">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-700 truncate max-w-xs">
                    {state.schematicFile.name}
                  </span>
                </div>
                <button onClick={clearSchematic} className="text-red-500 hover:text-red-700 text-xs font-medium">
                  Remove
                </button>
              </div>
            )}
          </div>
          {previewUrl && (
            <div className="mt-4">
              <iframe
                src={previewUrl}
                className="w-full h-96 border border-gray-200 rounded-md"
                title="Schematic Preview"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GeneralDetails;