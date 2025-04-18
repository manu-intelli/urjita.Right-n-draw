import React from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { FormSection } from "../../../components/common/ReusableComponents";
import PartDetails from "./Parts";
import { Button } from "../../../components/common/ReusableComponents"; // Assuming you have a Button component
import ComponentsDetails from "./Components";
import OtherDetails from "./OthersData";
import ProjectForm from "./GeneralDetails";

export const STEPS = {
  GENERAL_DETAILS: "general_details",
  COMPONENTS: "components",
  CHIP_AIRCOILS: "chip_aircoils",
  CHIP_INDUCTORS: "chip_inductors",
  CHIP_CAPACITORS: "chip_capacitors",
  TRANSFORMER_WOUND_INDUCTORS: "transformer_wound_inductors",
  OTHERS: "others",
};

export const STEP_ORDER = [
  STEPS.GENERAL_DETAILS,
  STEPS.COMPONENTS,
  STEPS.CHIP_AIRCOILS,
  STEPS.CHIP_INDUCTORS,
  STEPS.CHIP_CAPACITORS,
  STEPS.TRANSFORMER_WOUND_INDUCTORS,
  STEPS.OTHERS,
];

const CreationInterface = () => {
  const { state, dispatch } = usePage21Context();
  const { currentStep, submitted } = state;

  const handleSubmit = () => {
    dispatch({ type: "SET_SUBMITTED", payload: true });
  };

  const setCurrentStep = (step) => {
    dispatch({ type: "SET_CURRENT_STEP", payload: step });
  };

  const renderStepContent = () => {
    const stepKey = STEP_ORDER[currentStep];
    if (stepKey === STEPS.GENERAL_DETAILS) {
      return (
        <FormSection title={`Project Details`}>
          <div className="md:col-span-2">
            <ProjectForm />
          </div>
        </FormSection>
      );
    }

    // Handle COMPONENTS step separately
    if (stepKey === STEPS.COMPONENTS) {
      return (
        <FormSection title={`${STEPS.COMPONENTS} Details`}>
          <div className="md:col-span-2">
            <ComponentsDetails />
          </div>
        </FormSection>
      );
    }
    if (stepKey === STEPS.OTHERS) {
      return (
        <FormSection title={`${STEPS.COMPONENTS} Details`}>
          <div className="md:col-span-2">
            <OtherDetails />
          </div>
        </FormSection>
      );
    }

    // Handle all other part-based steps
    let partType = null;
    switch (stepKey) {
      case STEPS.CHIP_CAPACITORS:
        partType = "Capacitor";
        break;
      case STEPS.CHIP_AIRCOILS:
        partType = "AirCoil";
        break;
      case STEPS.CHIP_INDUCTORS:
        partType = "Inductor";
        break;
      case STEPS.TRANSFORMER_WOUND_INDUCTORS:
        partType = "Transformer";
        break;
      default:
        return <p className="text-gray-500 p-4">No content for this step.</p>;
    }

    return (
      <>
        <FormSection title={`${partType} Details`}>
          {state[partType]?.map((item, index) => (
            <div key={index} className="md:col-span-2">
              <PartDetails item={item} index={index} partType={partType} />
            </div>
          ))}
        </FormSection>

        <Button
          variant="primary"
          onClick={() => dispatch({ type: "ADD_PART", partType })}
        >
          + Add {partType}
        </Button>
      </>
    );
  };

  const renderStepIndicator = () => (
    <div className="flex justify-between items-center mb-4 px-4">
      {STEP_ORDER.map((stepKey, index) => (
        <div key={stepKey} className="flex items-center flex-1 last:flex-none">
          <div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center font-medium shadow-sm
              ${
                currentStep === index
                  ? "bg-blue-600 text-white ring-4 ring-blue-100"
                  : currentStep > index
                  ? "bg-green-400 text-white"
                  : "bg-white border-2 border-gray-200 text-gray-400"
              }
              transition-all duration-200 relative z-10
            `}
          >
            {currentStep > index ? (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              index + 1
            )}
          </div>
          {index < STEP_ORDER.length - 1 && (
            <div className="flex-1 relative">
              <div
                className={`
                  absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1
                  ${currentStep > index ? "bg-green-400" : "bg-gray-200"}
                  transition-colors duration-300
                `}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-900 p-4 sm:p-8 md:p-16">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 w-full max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 md:px-8 py-4 border-b border-neutral-200">
          <div className="w-full text-center">
            <h1 className="text-2xl font-semibold text-neutral-900 mb-6">
              Page 21 Creation Interface
            </h1>
            {renderStepIndicator()}
          </div>
        </div>

        <div className="flex-1">
          <div className="px-4 sm:px-6 md:px-8 py-6">{renderStepContent()}</div>
        </div>

        <div className="px-4 sm:px-6 md:px-8 py-4 border-t border-neutral-200">
          <div className="max-w-7xl mx-auto flex justify-between">
            <div>
              {!submitted && currentStep > 0 && (
                <Button
                  variant="secondary"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}
            </div>

            <Button
              variant="primary"
              onClick={
                currentStep === STEP_ORDER.length - 1
                  ? handleSubmit
                  : () => setCurrentStep(currentStep + 1)
              }
            >
              {currentStep === STEP_ORDER.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationInterface;
