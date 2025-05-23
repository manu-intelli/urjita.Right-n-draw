import React, { createContext, useReducer, useContext } from "react";

const Page21Context = createContext();

export const ACTIONS = {
  // ... your existing action types
  SET_SUBMITTING: "SET_SUBMITTING",
  SET_SUBMIT_ERROR: "SET_SUBMIT_ERROR",
  RESET_SUBMISSION: "RESET_SUBMISSION",
};

const initialState = {
  currentStep: 0,
  loading: false,
  submitted: false,
  isSubmitting: false,
  submitError: null,
  specialRequirements: "",
  selectedComponents: ["pcb"], // Store as array
  opNumber: "",
  opuNumber: "",
  eduNumber: "",
  modelFamily: "",
  modelName: "",
  technology: "",
  revisionNumber: "",
  impedance: "",
  customImpedance: "",
  interfaces: "",
  ports: {
    numberOfPorts: "",
    portDetails: [], // array of { connectorType, connectorGender }
  },
  enclosureDetails: {
    partType: "Existing", // or "New"
    partNumber: "",
  },

  topcoverDetails: {
    partType: "New", // or "New"
    partNumber: "",
  },
  caseStyle: "Existing",
  selectedCaseStyle: "",
  caseDimensions: {
    length: "",
    width: "",
    height: "",
    pinOuts: "",
  },
  bottomSolderMask: "",
  halfMoonRequirement: "",
  viaHolesRequirement: "",
  signalLaunchType: "",
  coverType: "",
  designRuleViolation: "",
  schematicFile: null,
  similarModel: "",
  components: [],
  capacitor: {
    numWithBpn: "",
    numWithoutBpn: "",
    withBpn: [],
    withoutBpn: [],
  },
  inductor: {
    numWithBpn: "",
    numWithoutBpn: "",
    withBpn: [],
    withoutBpn: [],
  },
  airCoil: {
    numWithBpn: "",
    numWithoutBpn: "",
    withBpn: [],
    withoutBpn: [],
  },
  resistor: {
    numWithBpn: "",
    numWithoutBpn: "",
    withBpn: [],
    withoutBpn: [],
  },
  transformers: {
    transformersList: [],
    numberOfTransformers: "",
  },
  can: {
    isExistingCanAvailable: "No",
    canMaterial: "",
    canProcess: "",
    customCanMaterial: "",
    bpNumber: "",
  },
  pcbList: [
    {
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
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.payload,
      };

    case ACTIONS.SET_SUBMIT_ERROR:
      return {
        ...state,
        submitError: action.payload,
      };

    case ACTIONS.RESET_SUBMISSION:
      return {
        ...state,
        isSubmitting: false,
        submitError: null,
      };
    case "SET_FIELD":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };

    case "SET_SELECTED_COMPONENTS":
      return {
        ...state,
        selectedComponents: new Set(action.payload),
      };

    case "TOGGLE_COMPONENT":
      const componentId = action.payload;
      return {
        ...state,
        selectedComponents: state.selectedComponents.includes(componentId)
          ? state.selectedComponents.filter((id) => id !== componentId)
          : [...state.selectedComponents, componentId],
      };
    case "SET_CASE_DIMENSIONS":
      // If payload has 'field' property, it's a single field update
      if (action.payload.field) {
        return {
          ...state,
          caseDimensions: {
            ...state.caseDimensions,
            [action.payload.field]: action.payload.value,
          },
        };
      }
      // Otherwise it's a bulk update of multiple fields
      return {
        ...state,
        caseDimensions: {
          ...state.caseDimensions,
          ...action.payload,
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
      return {
        ...state,
        pcbList: action.payload,
      };

    case "SET_COMPONENTS":
      return {
        ...state,
        components: action.payload, // payload should be an array
      };
    case "UPDATE_PART": {
      const { partType, index, field, value } = action;
      const updatedParts = [...state[partType]];
      const currentPart = updatedParts[index] || {};
      updatedParts[index] = { ...currentPart, [field]: value };

      return {
        ...state,
        [partType]: updatedParts,
      };
    }

    case "UPDATE_PART_FIELDS": {
      const { partType, index, fields } = action;
      const updatedParts = [...state[partType]];
      const currentPart = updatedParts[index] || {};
      updatedParts[index] = { ...currentPart, ...fields };

      return {
        ...state,
        [partType]: updatedParts,
      };
    }

    case "REMOVE_PART": {
      const { partType, index } = action;
      const updatedParts = [...state[partType]];
      updatedParts.splice(index, 1);
      return {
        ...state,
        [partType]: updatedParts,
      };
    }
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
    case "SET_NUMBER_OF_PORTS":
      const numberOfPorts = parseInt(action.value, 10) || 0;
      return {
        ...state,
        ports: {
          numberOfPorts,
          portDetails: Array.from({ length: numberOfPorts }, (_, i) => ({
            connectorType: "",
            connectorGender: "",
          })),
        },
      };

    case "UPDATE_PORT":
      return {
        ...state,
        ports: {
          ...state.ports,
          portDetails: state.ports.portDetails.map((port, i) =>
            i === action.index
              ? { ...port, [action.field]: action.value }
              : port
          ),
        },
      };

    case "ADD_PORT":
      return {
        ...state,
        ports: {
          ...state.ports,
          numberOfPorts: state.ports.numberOfPorts + 1,
          portDetails: [
            ...state.ports.portDetails,
            { connectorType: "", connectorGender: "" },
          ],
        },
      };

    case "REMOVE_PORT":
      return {
        ...state,
        ports: {
          ...state.ports,
          numberOfPorts: state.ports.numberOfPorts - 1,
          portDetails: state.ports.portDetails.filter(
            (_, i) => i !== action.index
          ),
        },
      };

    case "RESET_PORTS":
      return {
        ...state,
        ports: {
          numberOfPorts: "",
          portDetails: [],
        },
      };

    case "UPDATE_ENCLOSURE_DETAILS":
      return {
        ...state,
        enclosureDetails: {
          ...state.enclosureDetails,
          [action.field]: action.value,
        },
      };

    case "UPDATE_TOPCOVER_DETAILS":
      return {
        ...state,
        topcoverDetails: {
          ...state.topcoverDetails,
          [action.field]: action.value,
        },
      };

    case "SET_COUNT": {
      const { partType, field, value } = action;
      return {
        ...state,
        [partType]: {
          ...state[partType],
          [field]: value,
        },
      };
    }

    case "SET_ITEMS": {
      const { partType, field, value } = action;
      return {
        ...state,
        [partType]: {
          ...state[partType],
          [field]: value,
        },
      };
    }

    case "UPDATE_ITEM": {
      const { partType, listKey, index, key, value } = action;
      const updatedList = [...state[partType][listKey]];
      updatedList[index] = {
        ...updatedList[index],
        [key]: value,
      };
      return {
        ...state,
        [partType]: {
          ...state[partType],
          [listKey]: updatedList,
        },
      };
    }

    case "REMOVE_ITEM": {
      const { partType, listKey, index } = action;
      const filteredList = state[partType][listKey].filter(
        (_, i) => i !== index
      );
      return {
        ...state,
        [partType]: {
          ...state[partType],
          [listKey]: filteredList,
        },
      };
    }

    case "transformer_update_number":
      return {
        ...state,
        transformers: {
          ...state.transformers,
          numberOfTransformers: action.number,
        },
      };

    case "transformer_transformer_add_multiple":
      return {
        ...state,
        transformers: {
          ...state.transformers,
          transformersList: [
            ...(state.transformers?.transformersList || []),
            ...action.items,
          ],
        },
      };

    case "transformer_transformer_set_length":
      return {
        ...state,
        transformers: {
          ...state.transformers,
          transformersList: (state.transformers?.transformersList || []).slice(
            0,
            action.length
          ),
        },
      };

    case "transformer_transformer_update":
      return {
        ...state,
        transformers: {
          ...state.transformers,
          transformersList: state.transformers?.transformersList.map(
            (item, idx) =>
              idx === action.index
                ? { ...item, [action.field]: action.value }
                : item
          ),
        },
      };

    case "transformer_transformer_update_fields":
      return {
        ...state,
        transformers: {
          ...state.transformers,
          transformersList: state.transformers?.transformersList.map(
            (item, idx) =>
              idx === action.index ? { ...item, ...action.fields } : item
          ),
        },
      };

    case "transformer_transformer_replace_all":
      return {
        ...state,
        transformers: {
          ...state.transformers,
          transformersList: action.items,
        },
      };

    // case "UPDATE_CAN":
    //   return {
    //     ...state,
    //     can: {
    //       ...state.can,
    //       [action.field]: action.value,
    //     },
    //   };

    case "UPDATE_CAN":
      const newCanState = {
        ...state.can,
        [action.field]: action.value,
      };

      // Clear dependent fields when isExistingCanAvailable changes
      if (action.field === "isExistingCanAvailable") {
        if (action.value === "Yes") {
          newCanState.canMaterial = "";
          newCanState.canProcess = "";
          newCanState.customCanMaterial = "";
        } else {
          newCanState.bpNumber = "";
        }
      }

      // Clear custom material when canMaterial changes away from "Others"
      if (action.field === "canMaterial" && action.value !== "Others") {
        newCanState.customCanMaterial = "";
      }

      // Clear process when material is cleared
      if (action.field === "canMaterial" && action.value === "") {
        newCanState.canProcess = "";
      }

      return {
        ...state,
        can: newCanState,
      };
    case "ADD_PCB":
      return {
        ...state,
        pcbs: [
          ...state.pcbs,
          {
            id: state.pcbs.length + 1,
            name: "",
            basePCB: "",
            material: "",
            thickness: "",
            layers: "",
            mountingOrientation: "",
          },
        ],
      };
    case "UPDATE_PCB":
      return {
        ...state,
        pcbs: state.pcbs.map((pcb) =>
          pcb.id === action.id ? { ...pcb, [action.field]: action.value } : pcb
        ),
      };
    case "REMOVE_PCB":
      return {
        ...state,
        pcbs: state.pcbs.filter((pcb) => pcb.id !== action.id),
      };
    case "RESET_FORM":
      return { ...initialState };
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
