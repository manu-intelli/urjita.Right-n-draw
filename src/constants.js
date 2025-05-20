export const BASIC_DETAILS_LENGTH = 7;

export const BASIC_KEY_LABEL = {
  oppNumber: "OPP Number",
  opuNumber: "OPU Number",
  eduNumber: "EDU Number",
  modelName: "MODEL Name",
  partNumber: "PART Number",
  component: "COMPONENT",
  revisionNumber: "REVISION Number",
  rejectionComment: "Rejection Comment",
  approvalComment: "Approval Comment",
};

export const USER_COLS = [
  {
    label: "S.No",
    key: "id",
  },
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Role",
    key: "role",
  },
  {
    label: "Full Name",
    key: "full_name",
  },
];

export const basicInfoFields = [
  {
    label: "OPP Number",
    key: "oppNumber",
  },
  {
    label: "OPU Number",
    key: "opuNumber",
  },
  {
    label: "EDU Number",
    key: "eduNumber",
  },
  {
    label: "Model Name",
    key: "modelName",
  },
  {
    label: "Part Number",
    key: "partNumber",
  },
  {
    label: "Revision Number",
    key: "revisionNumber",
  },
];

export const COMPONENT_TYPES = Object.freeze({
  PCB: "pcb",
  CAN: "can",
  CHIP_CAPACITOR: "chip-capacitor",
  CHIP_INDUCTOR: "chip-inductor",
  CHIP_RESISTOR: "chip-resistor",
  TRANSFORMER: "transformer",
  CHIP_RESONATOR: "chip-resonator",
  AIR_COIL: "air-coil",
  SHIELD: "shield",
  FINGER: "finger",
  COPPER_FLAP: "copper-flap",
  LTCC: "ltcc",
  OTHER: "other",
});

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
