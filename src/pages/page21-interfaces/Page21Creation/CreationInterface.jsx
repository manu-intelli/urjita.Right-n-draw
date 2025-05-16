import React, { useEffect, useRef, useState } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import { FormSection } from "../../../components/common/ReusableComponents";
import rightArrow from "../../../assets/rightArrow.svg";
import logo from "../../../assets/logo.svg";

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
import Page21PDFDocument, {
  generatePDF,
} from "../../pdf-creators/Page21/PDFDocumentCreationInterface";
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

    const formData = {
      currentStep: 11,
      submitted: false,
      opNumber: "Parthi0233-T",
      opuNumber: "Parthi0233-T",
      eduNumber: "Parthi0233-T",
      modelFamily: "FamilyA",
      modelName: "Parthi0233-T",
      technology: "lumped",
      revisionNumber: "1",
      impedance: "50 ohms",
      customImpedance: "1",
      package: "Connectorized",
      ports: {
        numberOfPorts: 3,
        portDetails: [
          {
            connectorType: "TestConnector1",
            connectorGender: "Male",
          },
          {
            connectorType: "TestConnector1",
            connectorGender: "Male",
          },
          {
            connectorType: "TestConnector3",
            connectorGender: "Female",
          },
        ],
      },
      enclosureDetails: {
        partType: "Existing",
        partNumber: "0146576877-T",
      },
      topcoverDetails: {
        partType: "New",
        partNumber: "4678798-5",
      },
      caseStyle: "ModifyExisting",
      selectedCaseStyle: "Case A",
      caseDimensions: {
        length: "20",
        width: "10",
        height: "5",
        pinOuts: "5",
      },
      bottomSolderMask: "Full solder mask",
      halfMoonRequirement: "Yes",
      viaHolesRequirement: "Yes",
      signalLaunchType: "PCB",
      coverType: "Open",
      designRuleViolation: "No",
      schematicFile: {},
      similarModel: "SimilarModelDeaign",
      capacitor: {
        numWithBpn: 2,
        numWithoutBpn: 2,
        withBpn: [
          {
            name: "c1",
            bpn: "0146576666877-T",
          },
          {
            name: "c2",
            bpn: "014657687777-T",
          },
        ],
        withoutBpn: [
          {
            name: "c3",
            supplierName: "parthi",
            supplierNumber: "577899",
            qualificationStaus: "Qualification",
            airCoilDetailsComment: "",
          },
          {
            name: "c4",
            supplierName: "april_12_test2",
            supplierNumber: "577899ghghgjhhj",
            qualificationStaus: "Approval",
            airCoilDetailsComment: "",
          },
        ],
      },
      inductor: {
        numWithBpn: 1,
        numWithoutBpn: 2,
        withBpn: [
          {
            name: "L1",
            bpn: "456578798890-U",
          },
        ],
        withoutBpn: [
          {
            name: "L3",
            supplierName: "April_04_testdev",
            supplierNumber: "april_16_64",
            qualificationStaus: "Qualification",
            airCoilDetailsComment: "",
          },
          {
            name: "L4",
            supplierName: "april_16_64",
            supplierNumber: "ap_15_t3",
            qualificationStaus: "Approval",
            airCoilDetailsComment: "",
          },
        ],
      },
      airCoil: {
        numWithBpn: 2,
        numWithoutBpn: 2,
        withBpn: [
          {
            name: "AC!",
            bpn: "546767-Y",
          },
          {
            name: "AC2",
            bpn: "546767-Y65",
          },
        ],
        withoutBpn: [
          {
            name: "",
            supplierName: "",
            supplierNumber: "",
            qualificationStaus: "",
            airCoilDetailsComment: "gffhgjhktestin without bp number",
          },
          {
            name: "",
            supplierName: "",
            supplierNumber: "",
            qualificationStaus: "",
            airCoilDetailsComment: "gffhgjhktestin without bp number",
          },
        ],
      },
      resistor: {
        numWithBpn: 2,
        numWithoutBpn: 2,
        withBpn: [
          {
            name: "R1",
            bpn: "665676-t",
          },
          {
            name: "R2",
            bpn: "66575676-tu",
          },
        ],
        withoutBpn: [
          {
            name: "R4",
            supplierName: "67899",
            supplierNumber: "456667879",
            qualificationStaus: "Qualification",
            airCoilDetailsComment: "",
          },
          {
            name: "R3",
            supplierName: "parthi",
            supplierNumber: "8867678890",
            qualificationStaus: "Approval",
            airCoilDetailsComment: "",
          },
        ],
      },
      transformers: {
        transformersList: [
          {
            coreType: "double",
            wireType: "single",
            coreBPN: ["6768789-ct", "5776789-ct"],
            wireGauge: ["65677676"],
            numberOfTurns: "3",
          },
        ],
        numberOfTransformers: 1,
      },
      isExistingCanAvailable: "No",
      canMaterial: "Metal",
      canProcess: "Etched",
      customCanMaterial: "",
      can: {
        material: "metal",
        makingProcess: "etched",
      },
      pcbs: [
        {
          id: 1,
          name: "Base PCB",
          material: "",
          thickness: "",
          layers: "",
          mountingOrientation: "Horizontal",
          comments: "",
          isExistingCanAvailable: "",
          bpNumber: "",
          customMaterial: "",
          substrateThickness: "",
          rfLayerThickness: "",
          overallThickness: "",
          copperThickness: "",
        },
      ],
      pcbList: [
        {
          name: "Base PCB",
          material: "",
          thickness: "",
          layers: "",
          mountingOrientation: "Horizontal",
          comments: "",
          isExistingCanAvailable: "Yes",
          bpNumber: "0146576877-T",
          customMaterial: "",
          substrateThickness: "",
          rfLayerThickness: "",
          overallThickness: "",
          copperThickness: "",
        },
        {
          name: "",
          material: "",
          thickness: "",
          layers: "",
          mountingOrientation: "Vertical",
          comments: "Testing Comments",
          isExistingCanAvailable: "No",
          bpNumber: "",
          customMaterial: "",
          substrateThickness: "4",
          rfLayerThickness: "",
          overallThickness: "",
          copperThickness: "5",
        },
        {
          name: "Other PCB",
          material: "",
          thickness: "",
          layers: "",
          mountingOrientation: "Horizontal",
          comments: "Testing comment3",
          isExistingCanAvailable: "No",
          bpNumber: "",
          customMaterial: "",
          substrateThickness: "5",
          rfLayerThickness: "",
          overallThickness: "",
          copperThickness: "8",
        },
      ],
      shieldsList: {
        shieldRequired: "Yes",
        numberOfShields: "2",
        shields: [
          {
            partType: "New",
            partNumber: "TBD",
          },
          {
            partType: "Existing",
            partNumber: "dgdhgfjgkhljjj-3346",
          },
        ],
      },
      fingersList: {
        fingerRequired: "Yes",
        numberOfFingers: "2",
        fingers: [
          {
            partType: "New",
            partNumber: "TBD",
          },
          {
            partType: "Existing",
            partNumber: "4675897",
          },
        ],
      },
      cooperFlapDetails: {
        numberOfFlaps: "2",
        flaps: [
          {
            bpType: "New",
            bpNumber: "TBD",
            length: "5",
            width: "3",
            thickness: "3",
          },
          {
            bpType: "Existing",
            bpNumber: "TBD",
            length: "",
            width: "",
            thickness: "",
          },
        ],
      },
      resonatorList: {
        numberOfResonators: "",
        resonators: [],
      },
      ltcc: {
        numberOfLtcc: 3,
        ltccItems: [
          {
            modelName: "6786970980",
          },
          {
            modelName: "6786908",
          },
          {
            modelName: "567869709",
          },
        ],
      },
      comments: "Testing Additional RequireMent Comments",
    };
    // generatePDF(formData);

    // Reset form and go back to step one
    // dispatch({ type: "RESET_FORM" });
    dispatch({ type: "SET_CURRENT_STEP", payload: 0 });
    dispatch({ type: "SET_SUBMITTED", payload: false });

    // Optionally show a success message
    alert("Form submitted successfully! The form has been reset.");
  };

  const setCurrentStep = (step) => {
    dispatch({ type: "SET_CURRENT_STEP", payload: step });
  };

  const TECHNOLOGY_STEP_MAP = {
    lumped: STEP_ORDER.filter((step) => step !== STEPS.RESONATORS),

    ceramic_resonators: STEP_ORDER, // Includes all steps

    docs_diplexer: STEP_ORDER.filter(
      (step) =>
        ![
          STEPS.RESONATORS,
          STEPS.COPPER_FLAPS,
          STEPS.FINGERS,
          STEPS.LTCC,
        ].includes(step)
    ),

    thin_film: STEP_ORDER.filter(
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

  const actionType = "Creation"; // or "rejected"
  const userEmail = "parthiban@example.com";
  const selectedComponent = "Sample";

  const generateSamplePDF = () => {
    Page21PDFDocument(state);
  };
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
