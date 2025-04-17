import React, { createContext, useReducer, useContext } from "react";

const Page21Context = createContext();

const initialState = {
  currentStep: 0,
  submitted: false,
  components: [],
  Inductor: [],
  Capacitor: [],
  AirCoil: [],
  Transformer: [],
  canMaterial: "",
  canProcess: "",
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
    shieldRequired: "No",
    numberOfShields: "",
    shields: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_SUBMITTED":
      return { ...state, submitted: action.payload };

    case "SET_CAN_MATERIAL":
      return { ...state, canMaterial: action.payload };

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
