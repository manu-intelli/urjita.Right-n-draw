import React, { createContext, useReducer, useContext } from "react";

const Page21Context = createContext();

const initialState = {
  currentStep: 0,
  submitted: false,
  Inductor: [],
  Capacitor: [],
  AirCoil: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_SUBMITTED":
      return { ...state, submitted: action.payload };
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
