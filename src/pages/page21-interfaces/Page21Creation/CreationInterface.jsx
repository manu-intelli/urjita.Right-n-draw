import React, { useEffect, useRef, useState } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { FormSection } from "../../../components/common/ReusableComponents";
import rightArrow from "../../../assets/rightArrow.svg";
import { Button } from "../../../components/common/ReusableComponents";
import ComponentsDetails from "./Components";
import ShieldDetails from "./ShieldDetails";
import FingerDetails from "./FingerDetails";
import CooperFlapDetails from "./CooperFlapDetails";
import ResonatorDetails from "./ResonatorDetails";
import LtccDetails from "./LTCC";
import PartTable from "./Parts";
import GeneralDetails from "./GeneralDetails";
import TransformersPage from "./Transformer";
import "./page21.css";
import BasicDetails from "./BasicDetails";
import Page21PDFDocument from "../../pdf-creators/Page21/PDFDocumentCreationInterface";
import { COMPONENT_TYPES } from "../../../constants";
import OtherSpecialComponents from "./OtherComponent";

export const STEPS = {
  BASIC_DETAILS: "basicDetails",
  GENERAL_DETAILS: "general_details",
  COMPONENTS: "components",
  CHIP_AIRCOILS: "chip_aircoils",
  CHIP_INDUCTORS: "chip_inductors",
  CHIP_CAPACITORS: "chip_capacitors",
  CHIP_RESISTORS: "chip_resistor",
  TRANSFORMER_OR_WOUND_INDUCTORS: "transformer_or_wound_inductors",
  SHIELDS: "shields",
  FINGERS: "fingers",
  COPPER_FLAPS: "cooper_flaps",
  RESONATORS: "resonators",
  LTCC: "ltcc",
  OTHER: "other",
};

export const COMPONENT_STEP_MAP = Object.freeze({
  [COMPONENT_TYPES.PCB]: [STEPS.COMPONENTS],
  [COMPONENT_TYPES.CAN]: [STEPS.COMPONENTS],
  [COMPONENT_TYPES.CHIP_CAPACITOR]: [STEPS.CHIP_CAPACITORS],
  [COMPONENT_TYPES.CHIP_INDUCTOR]: [STEPS.CHIP_INDUCTORS],
  [COMPONENT_TYPES.CHIP_RESISTOR]: [STEPS.CHIP_RESISTORS],
  [COMPONENT_TYPES.TRANSFORMER]: [STEPS.TRANSFORMER_OR_WOUND_INDUCTORS],
  [COMPONENT_TYPES.CHIP_RESONATOR]: [STEPS.RESONATORS],
  [COMPONENT_TYPES.AIR_COIL]: [STEPS.CHIP_AIRCOILS],
  [COMPONENT_TYPES.SHIELD]: [STEPS.SHIELDS],
  [COMPONENT_TYPES.FINGER]: [STEPS.FINGERS],
  [COMPONENT_TYPES.COPPER_FLAP]: [STEPS.COPPER_FLAPS],
  [COMPONENT_TYPES.LTCC]: [STEPS.LTCC],
  [COMPONENT_TYPES.OTHER]: [STEPS.OTHER], // Explicitly handle "other" components
});

const CreationInterface = () => {
  const { state, dispatch } = usePage21Context();
  const { currentStep, submitted, selectedComponents = [] } = state;

  const getStepsForSelectedComponents = () => {
    const mandatorySteps = [STEPS.BASIC_DETAILS, STEPS.GENERAL_DETAILS];
    const additionalSteps = new Set();

    selectedComponents.forEach((componentId) => {
      const steps = COMPONENT_STEP_MAP[componentId] || [];
      steps.forEach((step) => additionalSteps.add(step));
    });

    // if (selectedComponents.length > 0) {
    //   additionalSteps.add(STEPS.COMPONENTS);
    // }

    return [...mandatorySteps, ...Array.from(additionalSteps)];
  };

  const stepsForSelectedComponents = getStepsForSelectedComponents();

  console.log("stepsForSelectedComponents", stepsForSelectedComponents);

  const handleSubmit = () => {
    console.log("Form submitted", state);
    dispatch({ type: "SET_CURRENT_STEP", payload: 0 });
    dispatch({ type: "SET_SUBMITTED", payload: false });
    alert("Form submitted successfully! The form has been reset.");
  };

  const setCurrentStep = (step) => {
    dispatch({ type: "SET_CURRENT_STEP", payload: step });
  };

  const STEP_COMPONENT_MAP = {
    [STEPS.BASIC_DETAILS]: {
      component: BasicDetails,
      title: "Basic Information",
      stepName: "Basic Info",
    },
    [STEPS.GENERAL_DETAILS]: {
      component: GeneralDetails,
      title: "General Specifications",
      stepName: "General Specs",
    },
    [STEPS.TRANSFORMER_OR_WOUND_INDUCTORS]: {
      component: TransformersPage,
      title: "Transformer/Wound Inductors Specifications",
      stepName: "Transformer Specs",
    },
    [STEPS.COMPONENTS]: {
      component: ComponentsDetails,
      title: "Component Configuration",
      stepName: "Component Config",
    },
    [STEPS.SHIELDS]: {
      component: ShieldDetails,
      title: "Shield Specifications",
      stepName: "Shield Specs",
    },
    [STEPS.FINGERS]: {
      component: FingerDetails,
      title: "Finger Specifications",
      stepName: "Finger Specs",
    },
    [STEPS.COPPER_FLAPS]: {
      component: CooperFlapDetails,
      title: "Copper Flaps Specifications",
      stepName: "Copper Flaps Specs",
    },
    [STEPS.RESONATORS]: {
      component: ResonatorDetails,
      title: "Resonator Specifications",
      stepName: "Resonator Specs",
    },
    [STEPS.LTCC]: {
      component: LtccDetails,
      title: "Ltcc Specifications",
      stepName: "Ltcc Specs",
    },
    [STEPS.OTHER]: {
      component: OtherSpecialComponents,
      title: "Special Requirements",
      stepName: "Special Req",
    },
  };

  const PART_STEP_MAP = {
    [STEPS.CHIP_CAPACITORS]: {
      type: "capacitor",
      title: " Chip Capacitor",
      stepName: "Chip Capacitor",
    },
    [STEPS.CHIP_RESISTORS]: {
      type: "resistor",
      title: " Chip Resistor",
      stepName: "Chip Resistor",
    },
    [STEPS.CHIP_AIRCOILS]: {
      type: "airCoil",
      title: " Chip Air Coil",
      stepName: "Chip Aircoil",
    },
    [STEPS.CHIP_INDUCTORS]: {
      type: "inductor",
      title: "Chip Inductor",
      stepName: "Chip Inductor",
    },
  };

  const renderStepContent = () => {
    const stepKey = stepsForSelectedComponents[currentStep];

    if (!stepKey) {
      return <p className="text-gray-500 p-4">No content for this step.</p>;
    }

    if (STEP_COMPONENT_MAP[stepKey]) {
      const { component: StepComponent, title } = STEP_COMPONENT_MAP[stepKey];
      return (
        <FormSection title={title}>
          <div className="md:col-span-2">
            <div className="overflow-y-auto mt-4 space-y-6 pr-1 h-[50vh]">
              <StepComponent />
            </div>
          </div>
        </FormSection>
      );
    }

    if (PART_STEP_MAP[stepKey]) {
      const { type, title } = PART_STEP_MAP[stepKey];
      return (
        <FormSection title={`${title} Details`}>
          <div className="md:col-span-2">
            <div className="overflow-y-auto mt-4 space-y-6 pr-1 h-[50vh]">
              <PartTable partType={type} title={title} />
            </div>
          </div>
        </FormSection>
      );
    }

    return <p className="text-gray-500 p-4">No content for this step.</p>;
  };

  const renderStepIndicator = () => {
    const containerRef = useRef(null);
    const currentStepRef = useRef(null);
    const [visibleStart, setVisibleStart] = useState(0);
    const [maxVisibleSteps, setMaxVisibleSteps] = useState(6);

    useEffect(() => {
      const handleResize = () => {
        const screenWidth = window.innerWidth;
        const stepWidth = 240;
        setMaxVisibleSteps(Math.max(3, Math.floor(screenWidth / stepWidth)));
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
      if (currentStepRef.current && containerRef.current) {
        currentStepRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }

      if (currentStep < visibleStart) {
        setVisibleStart(currentStep);
      } else if (currentStep >= visibleStart + maxVisibleSteps) {
        setVisibleStart(currentStep - maxVisibleSteps + 1);
      }
    }, [currentStep, maxVisibleSteps]);

    const handlePrev = () => {
      setVisibleStart((prev) => Math.max(0, prev - maxVisibleSteps));
    };

    const handleNext = () => {
      setVisibleStart((prev) =>
        Math.min(
          stepsForSelectedComponents.length - maxVisibleSteps,
          prev + maxVisibleSteps
        )
      );
    };

    const visibleSteps = stepsForSelectedComponents.slice(
      visibleStart,
      visibleStart + maxVisibleSteps
    );

    return (
      <div className="flex items-center w-full px-4 mb-4">
        {visibleStart > 0 && (
          <button onClick={handlePrev} className="w-10 h-10 mb-5">
            <img src={rightArrow} alt="leftArrow" className="-scale-x-100" />
          </button>
        )}

        <div ref={containerRef} className="flex-1 overflow-hidden relative">
          <div className="flex items-center w-full">
            {visibleSteps.map((stepKey, index) => {
              const actualIndex = visibleStart + index;
              const isCompleted = currentStep > actualIndex;
              const isCurrent = currentStep === actualIndex;

              return (
                <div
                  key={stepKey}
                  className="flex-1 flex flex-col items-center relative"
                >
                  {index > 0 && (
                    <div className="absolute left-0 top-5 w-1/2 h-1 bg-gray-200 z-0">
                      <div
                        className={`h-full ${
                          currentStep > actualIndex - 1 ? "bg-green-400" : ""
                        }`}
                      />
                    </div>
                  )}

                  <div
                    ref={isCurrent ? currentStepRef : null}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium shadow-sm z-10
                      ${
                        isCurrent
                          ? "bg-blue-600 text-white ring-4 ring-blue-100"
                          : isCompleted
                          ? "bg-green-400 text-white"
                          : "bg-white border-2 border-gray-200 text-gray-400"
                      }
                      transition-all duration-200`}
                  >
                    {isCompleted ? (
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
                      actualIndex + 1
                    )}
                  </div>

                  <div className="mt-2 text-xs text-center text-gray-700 px-1 min-w-[70px] break-words">
                    {STEP_COMPONENT_MAP[stepKey]?.stepName ||
                      PART_STEP_MAP[stepKey]?.stepName ||
                      stepKey}
                  </div>

                  {index < visibleSteps.length - 1 && (
                    <div className="absolute right-0 top-5 w-1/2 h-1 bg-gray-200 z-0">
                      <div
                        className={`h-full ${
                          currentStep > actualIndex ? "bg-green-400" : ""
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {visibleStart + maxVisibleSteps < stepsForSelectedComponents.length && (
          <button onClick={handleNext} className="w-10 h-10 mb-5">
            <img src={rightArrow} alt="rightArrow" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-900 p-4 sm:p-8 md:p-16">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 w-full max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 md:px-8 py-4 border-b border-neutral-200">
          <div className="w-full text-center">
            <h1 className="text-2xl font-semibold text-neutral-900 mb-6">
              Page 21 Creation Interface
            </h1>

            {stepsForSelectedComponents.length > 1 && renderStepIndicator()}
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
                currentStep === stepsForSelectedComponents.length - 1
                  ? handleSubmit
                  : () => setCurrentStep(currentStep + 1)
              }
            >
              {currentStep === stepsForSelectedComponents.length - 1
                ? "Submit"
                : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationInterface;
