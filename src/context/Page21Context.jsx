import React, { createContext, useReducer, useContext } from "react";

const Page21Context = createContext();

const initialState = {
  currentStep: 0,
  submitted: false,

  opNumber: "",
  opuNumber: "",
  eduNumber: "",
  modelFamily: "",
  modelName: "",
  impedance: "",
  customImpedance: "",
  package: "",
  caseStyle: "Existing",
  selectedCaseStyle: "",
  caseDimensions: {
    length: "20",
    width: "10",
    height: "5",
  },
  bottomSolderMask: "",
  halfMoonRequirement: "",
  viaHolesRequirement: "",
  signalPassing: "",
  coverType: "",
  designRuleViolation: "",
  schematicFile: null,
  similarModel: "",
  components: [],
  Inductor: [],
  Capacitor: [],
  AirCoil: [],
  Transformer: [],
  canMaterial: "",
  canProcess: "",
  customCanMaterial: "",
  pcbList: [
    {
      name: "Base PCB",
      material: "",
      thickness: "",
      layers: "",
      mountingOrientation: "",
      comments: "",
    },
  ],
  shieldsList: {
    shieldRequired: "Yes",
    numberOfShields: "",
    shields: [],
  },
  fingersList: {
    fingerRequired: "No",
    numberOfFingers: "",
    fingers: [],
  },
  cooperFlapDetails: {
    numberOfFlaps: "",
    flaps: [],
  },
  resonatorList: {
    numberOfResonators: "",
    resonators: [], // array of resonator objects
  },
  ltcc: {
    numberOfLtcc: 0,
    ltccItems: [],
  },
  comments: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case "SET_CASE_DIMENSIONS":
      return {
        ...state,
        caseDimensions: {
          ...state.caseDimensions,
          [action.payload.field]: action.payload.value,
        },
      };
    case "SET_FILE":
      return {
        ...state,
        schematicFile: action.payload.file,
      };
    case "REMOVE_FILE":
      return {
        ...state,
        schematicFile: null,
      };
    case "SET_CURRENT_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_SUBMITTED":
      return { ...state, submitted: action.payload };
    case "SET_CAN_MATERIAL":
      return { ...state, canMaterial: action.payload };
    case "SET_CUSTOM_CAN_MATERIAL":
      return { ...state, customCanMaterial: action.payload };
    case "SET_CAN_PROCESS":
      return { ...state, canProcess: action.payload };

    case "SET_PCB_LIST":
      return { ...state, pcbList: action.payload };

    case "SET_COMPONENTS":
      return {
        ...state,
        components: action.payload, // payload should be an array
      };
    case "ADD_PART":
      return {
        ...state,
        [action.partType]: [...(state[action.partType] || []), {}],
      };
    case "REMOVE_PART":
      return {
        ...state,
        [action.partType]: state[action.partType].filter(
          (_, i) => i !== action.index
        ),
      };
    case "UPDATE_PART":
      return {
        ...state,
        [action.partType]: state[action.partType].map((part, i) =>
          i === action.index ? { ...part, [action.field]: action.value } : part
        ),
      };
    case "UPDATE_PART_FIELDS":
      return {
        ...state,
        [action.partType]: state[action.partType].map((part, i) =>
          i === action.index ? { ...part, ...action.fields } : part
        ),
      };
    case "UPDATE_SHIELDS":
      console.log("Updated others field", action.payload);

      return {
        ...state,
        shieldsList: {
          ...state.shieldsList,
          ...action.payload.shieldsList, // Spread to update the entire 'others' object
        },
      };

    case "UPDATE_FINGERS":
      console.log("Updated  fingers", action.payload);

      return {
        ...state,
        fingersList: {
          ...state.fingersList,
          ...action.payload.fingersList, // Spread to update the entire 'others' object
        },
      };

    case "UPDATE_COOPER_FLAP_DETAILS":
      return {
        ...state,
        cooperFlapDetails: action.payload.cooperFlapDetails,
      };
    case "UPDATE_RESONATORS":
      return {
        ...state,
        resonatorList: {
          ...state.resonatorList,
          ...action.payload.resonatorList,
        },
      };
    case "SET_LTCC_FIELD":
      return {
        ...state,
        ltcc: {
          ...state.ltcc,
          [action.field]: action.value,
        },
      };

    default:
      return state;
  }
};
export const Page21Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Page21Context.Provider value={{ state, dispatch }}>
      {children}
    </Page21Context.Provider>
  );
};

export const usePage21Context = () => useContext(Page21Context);
