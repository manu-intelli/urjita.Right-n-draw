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
