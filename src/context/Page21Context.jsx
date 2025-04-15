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
  const { type, payload, partType, index } = action;

  switch (type) {
    case "SET_CURRENT_STEP":
      return { ...state, currentStep: payload };

    case "SET_SUBMITTED":
      return { ...state, submitted: payload };

    case "ADD_PART":
      return {
        ...state,
        [partType]: [
          ...state[partType],
          {
            hasBp: "No",
            hasSupplier: "No",
            qualification: "Qualification",
          },
        ],
      };

    case "REMOVE_PART":
      return {
        ...state,
        [partType]: state[partType].filter((_, i) => i !== index),
      };

    case "UPDATE_PART":
      return {
        ...state,
        [partType]: state[partType].map((item, i) =>
          i === index ? { ...item, ...payload } : item
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
