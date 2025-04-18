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
  caseStyle: "existing",
  selectedCaseStyle: "",
  caseDimensions: {
    length: "",
    width: "",
    height: "",
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
  others: {
    shieldRequired: "Yes",
    numberOfShields: "",
    shields: [],
  },
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
    case "UPDATE_OTHERS":
      console.log("Updated others field", action.payload);

      return {
        ...state,
        others: {
          ...state.others,
          ...action.payload.others, // Spread to update the entire 'others' object
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
