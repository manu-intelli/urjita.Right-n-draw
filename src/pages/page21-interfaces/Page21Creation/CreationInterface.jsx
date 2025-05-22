import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { usePage21Context } from "../../../context/Page21Context";
import {
  FormSection,
  Button,
} from "../../../components/common/ReusableComponents";
import rightArrow from "../../../assets/rightArrow.svg";
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
import { generatePDF } from "../../pdf-creators/Page21/PDFDocumentCreationInterface";
import { COMPONENT_STEP_MAP, STEPS } from "../../../constants";
import OtherSpecialComponents from "./OtherComponent";
import {
  validateBasicDetails,
  validateCooperFlaps,
  validateFingers,
  validateGeneralDetails,
  validateLtcc,
  validatePartDetails,
  validatePcbDetails,
  validateResonators,
  validateShields,
  validateSpecialRequirements,
  validateTransformers,
} from "./ValidationHelpers";

// Custom hook for step validation
const useStepValidation = (currentStep, stepsForSelectedComponents, state) => {
  return useMemo(() => {
    const stepKey = stepsForSelectedComponents[currentStep];

    if (!stepKey) return { isValid: true, errors: null };

    try {
      // Enhanced part validation that matches your existing functions
      const validatePartState = (partType, partState) => {
        if (!partState)
          return { isValid: false, errors: ["Part configuration missing"] };

        const isValid = validatePartDetails(partType, partState);
        const errors = isValid
          ? null
          : getPartValidationErrors(partType, partState);

        return { isValid, errors };
      };

      // Mapping of step keys to validation functions
      const VALIDATION_MAP = {
        // Part validations
        [STEPS.CHIP_CAPACITORS]: () =>
          validatePartState("capacitor", state.capacitor),
        [STEPS.CHIP_RESISTORS]: () =>
          validatePartState("resistor", state.resistor),
        [STEPS.CHIP_AIRCOILS]: () =>
          validatePartState("airCoil", state.airCoil),
        [STEPS.CHIP_INDUCTORS]: () =>
          validatePartState("inductor", state.inductor),

        // Step validations
        [STEPS.BASIC_DETAILS]: () => {
          const { isValid, errors } = validateBasicDetails(state);
          return { isValid, errors };
        },
        [STEPS.GENERAL_DETAILS]: () => {
          const { isValid, errors } = validateGeneralDetails(state);
          return { isValid, errors };
        },
        [STEPS.COMPONENTS]: () => {
          const { isValid, errors } = validatePcbDetails(state);
          return { isValid, errors };
        },
        [STEPS.RESONATORS]: () => {
          const { isValid, errors } = validateResonators(state.resonatorList);
          return { isValid, errors };
        },
        [STEPS.TRANSFORMER_OR_WOUND_INDUCTORS]: () => {
          const { isValid, errors } = validateTransformers(state.transformers);
          return { isValid, errors };
        },
        [STEPS.LTCC]: () => {
          const { isValid, errors } = validateLtcc(state.ltcc);
          return { isValid, errors };
        },
        [STEPS.COPPER_FLAPS]: () => {
          const { isValid, errors } = validateCooperFlaps(
            state.cooperFlapDetails
          );
          return { isValid, errors };
        },
        [STEPS.FINGERS]: () => {
          const { isValid, errors } = validateFingers(state.fingersList);
          return { isValid, errors };
        },
        [STEPS.SHIELDS]: () => {
          const { isValid, errors } = validateShields(state.shieldsList);
          return { isValid, errors };
        },
        [STEPS.OTHER]: () => {
          const { isValid, errors } = validateSpecialRequirements(
            state.specialRequirements
          );
          return { isValid, errors };
        },
      };

      // Get the appropriate validation function
      const validationFn = VALIDATION_MAP[stepKey];

      if (validationFn) {
        const result = validationFn();
        console.log(`Validation result for ${stepKey}:`, result);
        return result;
      }

      // Default case for steps without specific validation
      return { isValid: true, errors: null };
    } catch (error) {
      console.error("Validation error:", error);
      return { isValid: false, errors: { general: "Validation failed" } };
    }
  }, [
    currentStep,
    stepsForSelectedComponents,
    state.capacitor,
    state.resistor,
    state.airCoil,
    state.inductor,
    state.resonatorList,
    state.transformers,
    state.ltcc,
    state.cooperFlapDetails,
    state.fingersList,
    state.shieldsList,
    state, // For basic/general details that might need full state
  ]);
};

const CreationInterface = () => {
  const { state, dispatch } = usePage21Context();
  const { currentStep, submitted, selectedComponents = [] } = state;

  // Memoize the steps based on selected components
  const stepsForSelectedComponents = useMemo(() => {
    const mandatorySteps = [STEPS.BASIC_DETAILS, STEPS.GENERAL_DETAILS];
    const additionalSteps = new Set();

    selectedComponents.forEach((componentId) => {
      const steps = COMPONENT_STEP_MAP[componentId] || [];
      steps.forEach((step) => additionalSteps.add(step));
    });

    return [...mandatorySteps, ...Array.from(additionalSteps)];
  }, [selectedComponents]);

  // Step validation hook
  const { isValid: isCurrentStepValid } = useStepValidation(
    currentStep,
    stepsForSelectedComponents,
    state
  );

  // Determine if next button should be disabled
  const isNextDisabled = useMemo(
    () => !isCurrentStepValid,
    [isCurrentStepValid]
  );

  // Memoized step component map
  const STEP_COMPONENT_MAP = useMemo(
    () => ({
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
        stepName: "Transformer",
      },
      [STEPS.COMPONENTS]: {
        component: ComponentsDetails,
        title: "Component Configuration",
        stepName: "PCB Config",
      },
      [STEPS.SHIELDS]: {
        component: ShieldDetails,
        title: "Shield Specifications",
        stepName: "Shields",
      },
      [STEPS.FINGERS]: {
        component: FingerDetails,
        title: "Finger Specifications",
        stepName: "Fingers",
      },
      [STEPS.COPPER_FLAPS]: {
        component: CooperFlapDetails,
        title: "Copper Flaps Specifications",
        stepName: "Copper Flaps ",
      },
      [STEPS.RESONATORS]: {
        component: ResonatorDetails,
        title: "Resonator Specifications",
        stepName: "Resonators",
      },
      [STEPS.LTCC]: {
        component: LtccDetails,
        title: "LTCC Specifications",
        stepName: "LTCC",
      },
      [STEPS.OTHER]: {
        component: OtherSpecialComponents,
        title: "Special Requirements",
        stepName: "Special Req",
      },
    }),
    []
  );

  // Memoized part step map
  const PART_STEP_MAP = useMemo(
    () => ({
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
    }),
    []
  );

  // Memoized renderStepContent function
  const renderStepContent = useCallback(() => {
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
  }, [
    currentStep,
    stepsForSelectedComponents,
    STEP_COMPONENT_MAP,
    PART_STEP_MAP,
  ]);

  // Memoized handleSubmit function
  const handleSubmit = useCallback(
    (formData) => {
      dispatch({ type: "SET_CURRENT_STEP", payload: 0 });
      dispatch({ type: "SET_SUBMITTED", payload: false });
      generatePDF(formData);

      alert("Form submitted successfully! The form has been reset.");
    },
    [dispatch]
  );

  // Memoized setCurrentStep function
  const setCurrentStep = useCallback(
    (step) => {
      dispatch({ type: "SET_CURRENT_STEP", payload: step });
    },
    [dispatch]
  );

  // Optimized handleNext function
  const handleNext = useCallback(() => {
    if (!isCurrentStepValid) return;

    if (currentStep < stepsForSelectedComponents.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit(state);
    }
  }, [
    currentStep,
    isCurrentStepValid,
    stepsForSelectedComponents.length,
    setCurrentStep,
    handleSubmit,
  ]);

  // Step indicator component
  const StepIndicator = useCallback(() => {
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
  }, [
    currentStep,
    stepsForSelectedComponents,
    STEP_COMPONENT_MAP,
    PART_STEP_MAP,
  ]);

  return (
    <div className="min-h-screen bg-neutral-900 p-4 sm:p-8 md:p-16">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 w-full max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 md:px-8 py-4 border-b border-neutral-200">
          <div className="w-full text-center">
            <h1 className="text-2xl font-semibold text-neutral-900 mb-6">
              PiBase Creation Interface
            </h1>

            {stepsForSelectedComponents.length > 1 && <StepIndicator />}
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
              onClick={handleNext}
              disabled={isNextDisabled}
              className={isNextDisabled ? "opacity-50 cursor-not-allowed" : ""}
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

export default React.memo(CreationInterface);
