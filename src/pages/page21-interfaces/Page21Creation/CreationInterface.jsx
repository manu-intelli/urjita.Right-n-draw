import React, { useEffect, useRef, useState } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { FormSection } from "../../../components/common/ReusableComponents";

import { Button } from "../../../components/common/ReusableComponents"; // Assuming you have a Button component
import ComponentsDetails from "./Components";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Or any icon set
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
export const STEPS = {
  BASIC_DETAILS: "basicDetails",
  GENERAL_DETAILS: "general_details",
  COMPONENTS: "components",
  CHIP_AIRCOILS: "chip_aircoils",
  CHIP_INDUCTORS: "chip_inductors",
  CHIP_CAPACITORS: "chip_capacitors",
  CHIP_RESISTORS: "chip_resistor",
  TRANSFORMER_WOUND_INDUCTORS: "transformer_wound_inductors",
  SHEIDS: "shields",
  FINGERS: "fingers",
  COPPER_FLAPS: "cooper_Flaps",
  RESONATORS: "resonators",
  LTCC: "ltcc",
  OTHERS: "others",
};

export const STEP_ORDER = [
  STEPS.BASIC_DETAILS,
  STEPS.GENERAL_DETAILS,
  STEPS.COMPONENTS,
  STEPS.CHIP_CAPACITORS,
  STEPS.CHIP_INDUCTORS,
  STEPS.CHIP_AIRCOILS,
  STEPS.TRANSFORMER_WOUND_INDUCTORS,
  STEPS.SHEIDS,
  STEPS.COPPER_FLAPS,
  STEPS.RESONATORS,
  STEPS.FINGERS,
  STEPS.CHIP_RESISTORS,
  STEPS.LTCC,
];

const CreationInterface = () => {
  const { state, dispatch } = usePage21Context();
  const { currentStep, submitted, technology } = state;

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Form submitted", state);

    // Reset form and go back to step one
    dispatch({ type: "RESET_FORM" });
    dispatch({ type: "SET_CURRENT_STEP", payload: 0 });
    dispatch({ type: "SET_SUBMITTED", payload: true });

    // Optionally show a success message
    alert("Form submitted successfully! The form has been reset.");
  };

  const setCurrentStep = (step) => {
    dispatch({ type: "SET_CURRENT_STEP", payload: step });
  };

  const TECHNOLOGY_STEP_MAP = {
    lumped: STEP_ORDER.filter((step) => step !== STEPS.RESONATORS),

    ceramic_resonators: STEP_ORDER, // Includes all steps

    thin_film: STEP_ORDER.filter(
      (step) =>
        ![
          STEPS.RESONATORS,
          STEPS.COPPER_FLAPS,
          STEPS.FINGERS,
          STEPS.LTCC,
        ].includes(step)
    ),

    docs_diplexer: STEP_ORDER.filter(
      (step) =>
        ![
          STEPS.RESONATORS,
          STEPS.CHIP_AIRCOILS,
          STEPS.CHIP_INDUCTORS,
          STEPS.CHIP_CAPACITORS,
          STEPS.CHIP_RESISTORS,
          STEPS.TRANSFORMER_WOUND_INDUCTORS,
          STEPS.SHEIDS,
          STEPS.FINGERS,
          STEPS.COPPER_FLAPS,
          STEPS.LTCC,
        ].includes(step)
    ),
  };

  // Get steps based on the selected technology

  // const renderStepContent = () => {
  //   // const stepKey = STEP_ORDER[currentStep];
  //   const stepKey = stepsForSelectedTechnology[currentStep];

  //   if (stepKey === STEPS.BASIC_DETAILS) {
  //     return (
  //       <FormSection title="General Details">
  //         <div className="md:col-span-2">
  //           <div className="overflow-y-auto mt-4 space-y-6 pr-1 h-[50vh]">
  //             <BasicDetails />
  //           </div>
  //         </div>
  //       </FormSection>
  //     );
  //   }

  //   if (stepKey === STEPS.GENERAL_DETAILS) {
  //     return (
  //       <FormSection title="General Details">
  //         <div className="md:col-span-2">
  //           <div className="overflow-y-auto mt-4 space-y-6 pr-1 h-[50vh]">
  //             <GeneralDetails />
  //           </div>
  //         </div>
  //       </FormSection>
  //     );
  //   }
  //   if (stepKey === STEPS.TRANSFORMER_WOUND_INDUCTORS) {
  //     return (
  //       <FormSection title="Transformer or Wound Inductors Details">
  //         <div className="md:col-span-2">
  //           <div className="overflow-y-auto mt-4 space-y-6 pr-1 h-[50vh]">
  //             <TransformersPage />
  //           </div>
  //         </div>
  //       </FormSection>
  //     );
  //   }

  //   // Handle COMPONENTS step separately
  //   if (stepKey === STEPS.COMPONENTS) {
  //     return (
  //       <FormSection title={`${STEPS.COMPONENTS} Details`}>
  //         <div className="md:col-span-2">
  //           <div className="overflow-y-auto mt-4 space-y-6 pr-1 h-[50vh]">
  //             <ComponentsDetails />
  //           </div>
  //         </div>
  //       </FormSection>
  //     );
  //   }
  //   if (stepKey === STEPS.SHEIDS) {
  //     return (
  //       <FormSection title={`Shield Details`}>
  //         <div className="md:col-span-2">
  //           <div className="overflow-y-auto mt-4 space-y-6 pr-1 h-[50vh]">
  //             <ShieldDetails />
  //           </div>
  //         </div>
  //       </FormSection>
  //     );
  //   }

  //   if (stepKey === STEPS.FINGERS) {
  //     return (
  //       <FormSection title={`Fingers Details`}>
  //         <div className="md:col-span-2">
  //           <div className="overflow-y-auto mt-4 space-y-6 pr-1 h-[50vh]">
  //             <FingerDetails />
  //           </div>
  //         </div>
  //       </FormSection>
  //     );
  //   }

  //   if (stepKey === STEPS.COPPER_FLAPS) {
  //     return (
  //       <FormSection title={`Copper Flaps Details`}>
  //         <div className="md:col-span-2">
  //           <div className="overflow-y-auto mt-4 space-y-6 pr-1 h-[50vh]">
  //             <CooperFlapDetails />
  //           </div>
  //         </div>
  //       </FormSection>
  //     );
  //   }

  //   if (stepKey === STEPS.RESONATORS) {
  //     return (
  //       <FormSection title={`Resonator Details`}>
  //         <div className="md:col-span-2">
  //           <div className="overflow-y-auto mt-4 space-y-6 pr-1 h-[50vh]">
  //             <ResonatorDetails />
  //           </div>
  //         </div>
  //       </FormSection>
  //     );
  //   }
  //   if (stepKey === STEPS.LTCC) {
  //     return (
  //       <FormSection title={`Ltcc Details`}>
  //         <div className="md:col-span-2">
  //           <div className="overflow-y-auto mt-4 space-y-6 pr-1 h-[50vh]">
  //             <LtccDetails />
  //           </div>
  //         </div>
  //       </FormSection>
  //     );
  //   }

  //   // Handle all other part-based steps
  //   let partType = null;
  //   let title = "";

  //   switch (stepKey) {
  //     case STEPS.CHIP_CAPACITORS:
  //       partType = "capacitor";
  //       title = "Capacitor";
  //       break;
  //     case STEPS.CHIP_RESISTORS:
  //       partType = "resistor";
  //       title = "Resistor";
  //       break;
  //     case STEPS.CHIP_AIRCOILS:
  //       partType = "airCoil";
  //       title = "Air Coil";
  //       break;
  //     case STEPS.CHIP_INDUCTORS:
  //       partType = "inductor";
  //       title = "Inductor";
  //       break;
  //     // case STEPS.TRANSFORMER_WOUND_INDUCTORS:
  //     //   partType = "transformer";
  //     //   title = "Transformer";
  //     //   break;
  //     default:
  //       return <p className="text-gray-500 p-4">No content for this step.</p>;
  //   }

  //   return (
  //     <>
  //       <FormSection title={`${title} Details`}>
  //         <div className="md:col-span-2">
  //           <div className="overflow-y-auto mt-4 space-y-6 pr-1 h-[50vh]">
  //             <PartTable partType={partType} title={title} />
  //           </div>
  //         </div>
  //       </FormSection>
  //     </>
  //   );
  // };
  const stepsForSelectedTechnology =
    TECHNOLOGY_STEP_MAP[state.technology] || [];
  console.log("stepsForSelectedTechnology", stepsForSelectedTechnology);

  const STEP_COMPONENT_MAP = {
    [STEPS.BASIC_DETAILS]: {
      component: BasicDetails,
      title: "General Details",
    },
    [STEPS.GENERAL_DETAILS]: {
      component: GeneralDetails,
      title: "General Details",
    },
    [STEPS.TRANSFORMER_WOUND_INDUCTORS]: {
      component: TransformersPage,
      title: "Transformer or Wound Inductors Details",
    },
    [STEPS.COMPONENTS]: {
      component: ComponentsDetails,
      title: "Components Details",
    },
    [STEPS.SHEIDS]: { component: ShieldDetails, title: "Shield Details" },
    [STEPS.FINGERS]: { component: FingerDetails, title: "Fingers Details" },
    [STEPS.COPPER_FLAPS]: {
      component: CooperFlapDetails,
      title: "Copper Flaps Details",
    },
    [STEPS.RESONATORS]: {
      component: ResonatorDetails,
      title: "Resonator Details",
    },
    [STEPS.LTCC]: { component: LtccDetails, title: "Ltcc Details" },
  };

  const PART_STEP_MAP = {
    [STEPS.CHIP_CAPACITORS]: { type: "capacitor", title: "Capacitor" },
    [STEPS.CHIP_RESISTORS]: { type: "resistor", title: "Resistor" },
    [STEPS.CHIP_AIRCOILS]: { type: "airCoil", title: "Air Coil" },
    [STEPS.CHIP_INDUCTORS]: { type: "inductor", title: "Inductor" },
  };

  const stepsWithBasic = [
    STEPS.BASIC_DETAILS,
    ...stepsForSelectedTechnology.filter((s) => s !== STEPS.BASIC_DETAILS),
  ];

  const renderStepContent = () => {
    const stepKey = stepsWithBasic[currentStep];
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
        const stepWidth = 200;
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
          stepsWithBasic.length - maxVisibleSteps,
          prev + maxVisibleSteps
        )
      );
    };

    const visibleSteps = stepsWithBasic.slice(
      visibleStart,
      visibleStart + maxVisibleSteps
    );

    return (
      <div className="flex items-center w-full px-4 mb-4">
        {visibleStart > 0 && (
          <button onClick={handlePrev} className="mr-2 p-2">
            ◀
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
                  {/* Line to the left */}
                  {index > 0 && (
                    <div className="absolute left-0 top-5 w-1/2 h-1 bg-gray-200 z-0">
                      <div
                        className={`h-full ${
                          currentStep > actualIndex - 1 ? "bg-green-400" : ""
                        }`}
                      />
                    </div>
                  )}

                  {/* Step circle */}
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

                  {/* Step label */}
                  <div className="mt-2 text-xs text-center text-gray-700 px-1 min-w-[70px] break-words">
                    {stepKey}
                  </div>

                  {/* Line to the right */}
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

        {visibleStart + maxVisibleSteps < stepsWithBasic.length && (
          <button onClick={handleNext} className="ml-2 p-2">
            ▶
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

            {stepsWithBasic.length > 1 && renderStepIndicator()}
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
                currentStep === stepsWithBasic?.length - 1
                  ? handleSubmit
                  : () => setCurrentStep(currentStep + 1)
              }
            >
              {currentStep === stepsWithBasic?.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </div>
      {/* <CapacitorTables /> */}
    </div>
  );
};

export default CreationInterface;
