/**
 * Validates a single part type's details
 * @param {string} partType - The type of part (e.g., 'capacitor', 'resistor')
 * @param {object} partState - The state object for this part type
 * @returns {boolean} True if the part details are valid
 */
export const validatePartDetails = (partType, partState) => {
  console.log("partType, partState", partType, partState);

  if (!partState || typeof partState !== "object") return false;

  // Safely destructure with defaults and ensure proper types
  const numWithBpn = Math.max(0, parseInt(partState.numWithBpn) || 0);
  const numWithoutBpn = Math.max(0, parseInt(partState.numWithoutBpn) || 0);
  const withBpn = Array.isArray(partState.withBpn) ? partState.withBpn : [];
  const withoutBpn = Array.isArray(partState.withoutBpn)
    ? partState.withoutBpn
    : [];

  // Validate counts match array lengths
  if (numWithBpn !== withBpn.length || numWithoutBpn !== withoutBpn.length) {
    return false;
  }

  // Early exit if no parts to validate
  if (numWithBpn === 0 && numWithoutBpn === 0) return true;

  // Validate parts with BPN
  const withBpnValid = withBpn.every(
    (item) =>
      item &&
      typeof item === "object" &&
      item?.name?.trim() &&
      item?.bpn?.trim()
  );

  // Validate parts without BPN
  const withoutBpnValid = withoutBpn.every((item) => {
    if (!item || typeof item !== "object" || !item?.name?.trim()) {
      return false;
    }

    if (partType === "airCoil") {
      return validateAirCoil(item);
    }

    return (
      item?.supplierName?.trim() &&
      item?.supplierNumber?.trim() &&
      item?.qualificationStaus !== undefined
    );
  });

  return withBpnValid && withoutBpnValid;
};

/**
 * Special validation for Air Coil parts
 * @param {object} item - The air coil item to validate
 * @returns {boolean} True if valid
 */
const validateAirCoil = (item) => {
  if (!item || typeof item !== "object") return false;

  const requiredFields = [
    "wiregauge",
    "innnerDiameter",
    "numberOfTurns",
    "lengthOfAircoil",
    "widthOfAircoil",
    "lBendAircoil",
    "shorterLegAircoil",
  ];

  return requiredFields.every((field) => {
    const value = item[field];
    return value !== undefined && value !== null && value !== "";
  });
};

/**
 * Validates all parts in the form state
 * @param {object} state - The complete form state
 * @returns {boolean} True if all parts are valid
 */
export const isFormValid = (state) => {
  if (!state || typeof state !== "object") return false;

  const partTypes = ["inductor", "airCoil", "capacitor", "resistor"];

  return partTypes.every((partType) => {
    const partState = state[partType];

    // If part type doesn't exist in state, it's valid
    if (!partState) return true;

    return validatePartDetails(partType, partState);
  });
};

/**
 * Gets validation errors for a specific part type
 * @param {string} partType - The type of part
 * @param {object} partState - The part's state
 * @returns {Array} List of error messages
 */
export const getPartValidationErrors = (partType, partState) => {
  const errors = [];

  if (!partState || typeof partState !== "object") {
    return ["Part configuration missing or invalid"];
  }

  // Safely get counts and arrays
  const numWithBpn = Math.max(0, parseInt(partState.numWithBpn) || 0);
  const numWithoutBpn = Math.max(0, parseInt(partState.numWithoutBpn) || 0);
  const withBpn = Array.isArray(partState.withBpn) ? partState.withBpn : [];
  const withoutBpn = Array.isArray(partState.withoutBpn)
    ? partState.withoutBpn
    : [];

  // Check counts
  if (numWithBpn !== withBpn.length) {
    errors.push(
      `With BPN count mismatch (expected ${numWithBpn}, got ${withBpn.length})`
    );
  }

  if (numWithoutBpn !== withoutBpn.length) {
    errors.push(
      `Without BPN count mismatch (expected ${numWithoutBpn}, got ${withoutBpn.length})`
    );
  }

  // Check parts with BPN
  withBpn.forEach((item, index) => {
    if (!item || typeof item !== "object") {
      errors.push(`With BPN item ${index + 1}: Invalid item structure`);
      return;
    }

    if (!item?.name?.trim()) {
      errors.push(`With BPN item ${index + 1}: Name is required`);
    }
    if (!item?.bpn?.trim()) {
      errors.push(`With BPN item ${index + 1}: BPN is required`);
    }
  });

  // Check parts without BPN
  withoutBpn.forEach((item, index) => {
    if (!item || typeof item !== "object") {
      errors.push(`Without BPN item ${index + 1}: Invalid item structure`);
      return;
    }

    if (!item?.name?.trim()) {
      errors.push(`Without BPN item ${index + 1}: Name is required`);
    }

    if (partType === "airCoil") {
      const airCoilErrors = getAirCoilValidationErrors(item);
      airCoilErrors.forEach((err) =>
        errors.push(`Without BPN item ${index + 1}: ${err}`)
      );
    } else {
      if (!item?.supplierName?.trim()) {
        errors.push(`Without BPN item ${index + 1}: Supplier name is required`);
      }
      if (!item?.supplierNumber?.trim()) {
        errors.push(
          `Without BPN item ${index + 1}: Supplier number is required`
        );
      }
      if (item?.qualificationStaus === undefined) {
        errors.push(
          `Without BPN item ${index + 1}: Qualification status is required`
        );
      }
    }
  });

  return errors;
};

/**
 * Gets validation errors for air coil specific fields
 * @param {object} item - The air coil item
 * @returns {Array} List of error messages
 */
const getAirCoilValidationErrors = (item) => {
  if (!item || typeof item !== "object") return ["Invalid air coil structure"];

  const errors = [];
  const fields = [
    { key: "wiregauge", name: "Wire gauge" },
    { key: "innnerDiameter", name: "Inner diameter" },
    { key: "numberOfTurns", name: "Number of turns" },
    { key: "lengthOfAircoil", name: "Length" },
    { key: "widthOfAircoil", name: "Width" },
    { key: "lBendAircoil", name: "L-Bend" },
    { key: "shorterLegAircoil", name: "Shorter leg" },
  ];

  fields.forEach(({ key, name }) => {
    const value = item[key];
    if (value === undefined || value === null || value === "") {
      errors.push(`${name} is required`);
    }
  });

  return errors;
};

/**
 * Validates the general details form
 * @param {object} formData - The form state from context
 * @returns {object} An object with { isValid: boolean, errors: object }
 */
export const validateGeneralDetails = (formData) => {
  console.log("formData", formData);

  const errors = {};
  let isValid = true;
  console.log("general Step Errors", errors);
  // Required fields validation
  const requiredFields = ["impedance", "interfaces", "coverType"];

  if (formData.technology !== "thin_film") {
    requiredFields.push(
      "bottomSolderMask",
      "halfMoonRequirement",
      "viaHolesRequirement",
      "signalLaunchType",
      "designRuleViolation",
      "similarModel"
    );
  }

  requiredFields.forEach((field) => {
    if (!formData[field]) {
      errors[field] = `${field.split(/(?=[A-Z])/).join(" ")} is required`;
      isValid = false;
    }
  });

  // Custom impedance validation
  if (formData.impedance === "Others" && !formData.customImpedance) {
    errors.customImpedance =
      "Custom impedance is required when 'Others' is selected";
    isValid = false;
  }

  // Case style validation
  if (!formData.caseStyle) {
    errors.caseStyle = "Case style is required";
    isValid = false;
  } else {
    if (formData.caseStyle !== "New" && !formData.selectedCaseStyle) {
      errors.selectedCaseStyle = "Case style selection is required";
      isValid = false;
    }

    if (formData.caseStyle === "New") {
      if (
        !formData.caseDimensions?.length ||
        isNaN(formData.caseDimensions.length)
      ) {
        errors.caseDimensions = "Length is required and must be a number";
        isValid = false;
      }
      if (
        !formData.caseDimensions?.width ||
        isNaN(formData.caseDimensions.width)
      ) {
        errors.caseDimensions = "Width is required and must be a number";
        isValid = false;
      }
      if (
        !formData.caseDimensions?.height ||
        isNaN(formData.caseDimensions.height)
      ) {
        errors.caseDimensions = "Height is required and must be a number";
        isValid = false;
      }
    }
  }

  // Connectorized interface validation
  if (formData.interfaces === "Connectorized") {
    // Port validation
    if (
      !formData.ports?.numberOfPorts ||
      formData.ports.numberOfPorts < 2 ||
      formData.ports.numberOfPorts > 6
    ) {
      errors.numberOfPorts = "Number of ports must be between 2 and 6";
      isValid = false;
    } else {
      // Validate each port
      formData.ports.portDetails?.forEach((port, index) => {
        if (!port.connectorType) {
          errors[`port${index}ConnectorType`] = `Port ${
            index + 1
          } connector type is required`;
          isValid = false;
        }
        if (!port.connectorGender) {
          errors[`port${index}ConnectorGender`] = `Port ${
            index + 1
          } connector gender is required`;
          isValid = false;
        }
      });
    }

    // Enclosure validation
    if (!formData.enclosureDetails?.partType) {
      errors.enclosureType = "Enclosure type is required";
      isValid = false;
    } else if (
      formData.enclosureDetails.partType === "Existing" &&
      !formData.enclosureDetails.partNumber
    ) {
      errors.enclosurePartNumber = "Enclosure part number is required";
      isValid = false;
    }

    // Topcover validation
    if (!formData.topcoverDetails?.partType) {
      errors.topcoverType = "Topcover type is required";
      isValid = false;
    } else if (
      formData.topcoverDetails.partType === "Existing" &&
      !formData.topcoverDetails.partNumber
    ) {
      errors.topcoverPartNumber = "Topcover part number is required";
      isValid = false;
    }
  }

  // Schematic file validation (if not docs_diplexer)
  if (formData.technology !== "thin_film" && !formData.schematicFile) {
    errors.schematicFile = "Schematic file is required";
    isValid = false;
  }

  return { isValid, errors };
};

/**
 * Validates PCB details
 * @param {object} state - The complete form state
 * @returns {object} An object with { isValid: boolean, errors: object }
 */
export const validatePcbDetails = (formData) => {
  const errors = {};
  let isValid = true;

  // CAN validation (only required if coverType is "Open")
  if (formData.coverType === "Open") {
    if (!formData.can.isExistingCanAvailable) {
      errors.isExistingCanAvailable = "Existing Can Available is required";
      isValid = false;
    }

    if (formData.can.isExistingCanAvailable === "Yes") {
      if (!formData.can.bpNumber) {
        errors.bpNumber = "B-P/N is required for existing can";
        isValid = false;
      }
    } else {
      if (!formData.can.canMaterial) {
        errors.canMaterial = "Can Material is required";
        isValid = false;
      }

      if (
        formData.can.canMaterial === "Others" &&
        !formData.can.customCanMaterial
      ) {
        errors.customCanMaterial =
          "Custom Can Material is required when 'Others' is selected";
        isValid = false;
      }

      if (!formData.can.canProcess) {
        errors.canProcess = "Can Making Process is required";
        isValid = false;
      }
    }
  }

  // PCB validation
  if (formData.pcbList.length === 0) {
    errors.pcbList = "At least one PCB is required";
    isValid = false;
  } else {
    formData.pcbList.forEach((pcb, index) => {
      const isBase = index === 0;
      const pcbPrefix = isBase ? "Base PCB" : `PCB ${index}`;

      if (!pcb.isExistingPCBAvailable) {
        errors[
          `pcb${index}_isExistingPCBAvailable`
        ] = `${pcbPrefix}: Existing PCB Available is required`;
        isValid = false;
      }

      if (pcb.isExistingPCBAvailable === "Yes") {
        if (!pcb.bpNumber) {
          errors[
            `pcb${index}_bpNumber`
          ] = `${pcbPrefix}: B-P/N is required for existing PCB`;
          isValid = false;
        }
      } else {
        // Validate PCB details only if not existing PCB
        if (isBase) {
          if (!pcb.material) {
            errors[
              `pcb${index}_material`
            ] = `${pcbPrefix}: Material is required`;
            isValid = false;
          }

          if (pcb.material === "Other" && !pcb.customMaterial) {
            errors[
              `pcb${index}_customMaterial`
            ] = `${pcbPrefix}: Custom Material is required when 'Other' is selected`;
            isValid = false;
          }

          if (!pcb.layers) {
            errors[`pcb${index}_layers`] = `${pcbPrefix}: Layers is required`;
            isValid = false;
          }

          // Thickness validations
          if (pcb.layers === "Single") {
            if (!pcb.substrateThickness) {
              errors[
                `pcb${index}_substrateThickness`
              ] = `${pcbPrefix}: Substrate Thickness is required`;
              isValid = false;
            } else if (
              isNaN(pcb.substrateThickness) ||
              parseFloat(pcb.substrateThickness) <= 0
            ) {
              errors[
                `pcb${index}_substrateThickness`
              ] = `${pcbPrefix}: Substrate Thickness must be a positive number`;
              isValid = false;
            }
          } else if (pcb.layers === "Multi") {
            if (!pcb.rfLayerThickness) {
              errors[
                `pcb${index}_rfLayerThickness`
              ] = `${pcbPrefix}: RF Layer Thickness is required`;
              isValid = false;
            } else if (
              isNaN(pcb.rfLayerThickness) ||
              parseFloat(pcb.rfLayerThickness) <= 0
            ) {
              errors[
                `pcb${index}_rfLayerThickness`
              ] = `${pcbPrefix}: RF Layer Thickness must be a positive number`;
              isValid = false;
            }

            if (!pcb.overallThickness) {
              errors[
                `pcb${index}_overallThickness`
              ] = `${pcbPrefix}: Overall Thickness is required`;
              isValid = false;
            } else if (
              isNaN(pcb.overallThickness) ||
              parseFloat(pcb.overallThickness) <= 0
            ) {
              errors[
                `pcb${index}_overallThickness`
              ] = `${pcbPrefix}: Overall Thickness must be a positive number`;
              isValid = false;
            }
          }

          if (!pcb.copperThickness) {
            errors[
              `pcb${index}_copperThickness`
            ] = `${pcbPrefix}: Copper Thickness is required`;
            isValid = false;
          } else if (
            isNaN(pcb.copperThickness) ||
            parseFloat(pcb.copperThickness) <= 0
          ) {
            errors[
              `pcb${index}_copperThickness`
            ] = `${pcbPrefix}: Copper Thickness must be a positive number`;
            isValid = false;
          }

          if (!pcb.mountingOrientation) {
            errors[
              `pcb${index}_mountingOrientation`
            ] = `${pcbPrefix}: Mounting Orientation is required`;
            isValid = false;
          }
        } else {
          // Additional PCBs validation
          if (!pcb.name) {
            errors[`pcb${index}_name`] = `${pcbPrefix}: Name is required`;
            isValid = false;
          }

          if (!pcb.substrateThickness) {
            errors[
              `pcb${index}_substrateThickness`
            ] = `${pcbPrefix}: Substrate Thickness is required`;
            isValid = false;
          } else if (
            isNaN(pcb.substrateThickness) ||
            parseFloat(pcb.substrateThickness) <= 0
          ) {
            errors[
              `pcb${index}_substrateThickness`
            ] = `${pcbPrefix}: Substrate Thickness must be a positive number`;
            isValid = false;
          }

          if (!pcb.copperThickness) {
            errors[
              `pcb${index}_copperThickness`
            ] = `${pcbPrefix}: Copper Thickness is required`;
            isValid = false;
          } else if (
            isNaN(pcb.copperThickness) ||
            parseFloat(pcb.copperThickness) <= 0
          ) {
            errors[
              `pcb${index}_copperThickness`
            ] = `${pcbPrefix}: Copper Thickness must be a positive number`;
            isValid = false;
          }
        }
      }
    });
  }

  return { isValid, errors };
};

/**
 * Validates resonator details
 * @param {object} resonatorList - Resonator list state
 * @returns {object} An object with { isValid: boolean, errors: object }
 */
export const validateResonators = (resonatorList = {}) => {
  const errors = {};
  let isValid = true;
  const { numberOfResonators, resonators = [] } = resonatorList;

  // Validate number of resonators
  if (!numberOfResonators || isNaN(Number(numberOfResonators))) {
    errors.numberOfResonators = "Number of resonators is required";
    isValid = false;
  }

  // Validate each resonator
  resonators.forEach((resonator, index) => {
    const resonatorErrors = {};

    // BP Number validation
    if (resonator.bpType === "Existing" && !resonator.bpNumber?.trim()) {
      resonatorErrors.bpNumber = "B-P/N is required for existing resonators";
      isValid = false;
    }

    // Numeric field validations
    const numericFields = [
      { field: "resonatorSize", name: "Resonator size" },
      { field: "dielectricConstant", name: "Dielectric constant" },
      { field: "resonatorLength", name: "Resonator length" },
      { field: "resonatorFrequency", name: "Resonator frequency" },
    ];

    numericFields.forEach(({ field, name }) => {
      if (!resonator[field]?.trim()) {
        resonatorErrors[field] = `${name} is required`;
        isValid = false;
      } else if (isNaN(Number(resonator[field]))) {
        resonatorErrors[field] = `${name} must be a number`;
        isValid = false;
      }
    });

    // Assembly type validation
    if (!resonator.assemblyType) {
      resonatorErrors.assemblyType = "Assembly type is required";
      isValid = false;
    }

    if (Object.keys(resonatorErrors).length > 0) {
      errors[`resonator${index}`] = resonatorErrors;
    }
  });

  return { isValid, errors };
};

/**
 * Validates transformer details
 * @param {Array} transformersList - List of transformers
 * @returns {object} An object with { isValid: boolean, errors: object }
 */
export const validateTransformers = (transformers = {}) => {
  const errors = {};
  let isValid = true;

  const { numberOfTransformers, transformersList = [] } = transformers;

  // Validate number of resonators
  if (!numberOfTransformers || isNaN(Number(numberOfTransformers))) {
    errors.numberOfResonators = "Number of Transformer is required";
    isValid = false;
  }

  transformersList?.forEach((transformer, index) => {
    const transformerErrors = {};

    // Name validation
    if (!transformer.name?.trim()) {
      transformerErrors.name = "Transformer name is required";
      isValid = false;
    }

    // Core BPN validation
    if (
      !transformer.coreBPN ||
      transformer.coreBPN.some((bpn) => !bpn?.trim())
    ) {
      transformerErrors.coreBPN = "All core B-P/Ns are required";
      isValid = false;
    }

    // Wire gauge validation
    if (
      !transformer.wireGauge ||
      transformer.wireGauge.some((gauge) => !gauge?.trim())
    ) {
      transformerErrors.wireGauge = "All wire gauges are required";
      isValid = false;
    }

    // Number of turns validation
    if (!transformer.numberOfTurns?.trim()) {
      transformerErrors.numberOfTurns = "Number of turns is required";
      isValid = false;
    } else if (isNaN(Number(transformer.numberOfTurns))) {
      transformerErrors.numberOfTurns = "Number of turns must be a number";
      isValid = false;
    }

    // Orientation validation
    if (!transformer.orientation?.trim()) {
      transformerErrors.orientation = "Orientation is required";
      isValid = false;
    }

    if (Object.keys(transformerErrors).length > 0) {
      errors[`transformer${index}`] = transformerErrors;
    }
  });

  return { isValid, errors };
};

/**
 * Validates shield details
 * @param {object} shieldsList - The shields list state
 * @returns {object} An object with { isValid: boolean, errors: object }
 */
export const validateShields = (shieldsList = {}) => {
  const errors = {};
  let isValid = true;
  const { shieldRequired, numberOfShields, shields = [] } = shieldsList;

  // Validate shield required selection
  if (!shieldRequired) {
    errors.shieldRequired = "Shield requirement selection is required";
    isValid = false;
  }

  // Validate if shields are required
  if (shieldRequired === "Yes") {
    // Validate number of shields
    if (!numberOfShields || isNaN(Number(numberOfShields))) {
      errors.numberOfShields = "Number of shields is required";
      isValid = false;
    } else if (Number(numberOfShields) < 1) {
      errors.numberOfShields = "At least one shield is required";
      isValid = false;
    }

    // Validate each shield
    shields.forEach((shield, index) => {
      const shieldErrors = {};

      // Part type validation
      if (!shield.partType) {
        shieldErrors.partType = "Part type is required";
        isValid = false;
      }

      // BP Number validation
      if (shield.partType === "Existing" && !shield.partNumber?.trim()) {
        shieldErrors.partNumber = "B-P/N is required for existing parts";
        isValid = false;
      }

      if (Object.keys(shieldErrors).length > 0) {
        errors[`shield${index}`] = shieldErrors;
      }
    });
  }

  return { isValid, errors };
};

/**
 * Validates cooper flap details
 * @param {object} cooperFlapDetails - The cooper flap state
 * @returns {object} An object with { isValid: boolean, errors: object }
 */
export const validateCooperFlaps = (cooperFlapDetails = {}) => {
  const errors = {};
  let isValid = true;
  const { numberOfFlaps, flaps = [] } = cooperFlapDetails;

  // Validate number of flaps
  if (!numberOfFlaps || isNaN(Number(numberOfFlaps))) {
    errors.numberOfFlaps = "Number of flaps is required";
    isValid = false;
  } else if (Number(numberOfFlaps) < 1) {
    errors.numberOfFlaps = "At least one flap is required";
    isValid = false;
  }

  // Validate each flap
  flaps.forEach((flap, index) => {
    const flapErrors = {};

    // BP Type validation
    if (!flap.bpType) {
      flapErrors.bpType = "BP type is required";
      isValid = false;
    }

    // BP Number validation for existing flaps
    if (flap.bpType === "Existing" && !flap.bpNumber?.trim()) {
      flapErrors.bpNumber = "B-P/N is required for existing flaps";
      isValid = false;
    }

    // Dimensions validation for new flaps
    if (flap.bpType === "New") {
      const dimensions = ["length", "width", "thickness"];
      dimensions.forEach((dim) => {
        if (!flap[dim]?.trim()) {
          flapErrors[dim] = `${
            dim.charAt(0).toUpperCase() + dim.slice(1)
          } is required`;
          isValid = false;
        } else if (isNaN(Number(flap[dim]))) {
          flapErrors[dim] = `${
            dim.charAt(0).toUpperCase() + dim.slice(1)
          } must be a number`;
          isValid = false;
        }
      });
    }

    if (Object.keys(flapErrors).length > 0) {
      errors[`flap${index}`] = flapErrors;
    }
  });

  return { isValid, errors };
};

/**
 * Validates finger details
 * @param {object} fingersList - The fingers list state
 * @returns {object} An object with { isValid: boolean, errors: object }
 */
export const validateFingers = (fingersList = {}) => {
  const errors = {};
  let isValid = true;
  const { fingerRequired, numberOfFingers, fingers = [] } = fingersList;

  // Validate finger required selection
  if (!fingerRequired) {
    errors.fingerRequired = "Finger requirement selection is required";
    isValid = false;
  }

  // Validate if fingers are required
  if (fingerRequired === "Yes") {
    // Validate number of fingers
    if (!numberOfFingers || isNaN(Number(numberOfFingers))) {
      errors.numberOfFingers = "Number of fingers is required";
      isValid = false;
    } else if (Number(numberOfFingers) < 1) {
      errors.numberOfFingers = "At least one finger is required";
      isValid = false;
    }

    // Validate each finger
    fingers.forEach((finger, index) => {
      const fingerErrors = {};

      // Part type validation
      if (!finger.partType) {
        fingerErrors.partType = "Part type is required";
        isValid = false;
      }

      // BP Number validation
      if (finger.partType === "Existing" && !finger.partNumber?.trim()) {
        fingerErrors.partNumber = "B-P/N is required for existing parts";
        isValid = false;
      }

      if (Object.keys(fingerErrors).length > 0) {
        errors[`finger${index}`] = fingerErrors;
      }
    });
  }

  return { isValid, errors };
};

/**
 * Validates special requirements
 * @param {string} specialRequirements - The special requirements text
 * @returns {object} An object with { isValid: boolean, errors: object }
 */
export const validateSpecialRequirements = (specialRequirements = "") => {
  const errors = {};
  let isValid = true;

  // Add any specific validation rules for special requirements here
  // For now, we'll just check if it exists (optional field)

  return { isValid, errors };
};

/**
 * Validates LTCC details
 * @param {object} ltccState - The LTCC state object
 * @returns {object} An object with { isValid: boolean, errors: object }
 */
export const validateLtcc = (ltccState = {}) => {
  const errors = {};
  let isValid = true;
  const { numberOfLtcc = 0, ltccItems = [] } = ltccState;

  // Validate number of LTCCs
  if (isNaN(numberOfLtcc)) {
    errors.numberOfLtcc = "Number of LTCCs must be a number";
    isValid = false;
  } else if (numberOfLtcc < 0) {
    errors.numberOfLtcc = "Number of LTCCs cannot be negative";
    isValid = false;
  }

  // Validate each LTCC item
  ltccItems.forEach((ltcc, index) => {
    const ltccErrors = {};

    if (!ltcc.modelName?.trim()) {
      ltccErrors.modelName = "Model name is required";
      isValid = false;
    }

    if (Object.keys(ltccErrors).length > 0) {
      errors[`ltcc${index}`] = ltccErrors;
    }
  });

  return { isValid, errors };
};

export const validateBasicDetails = (formData) => {
  const errors = {};
  let isValid = true;

  // Required fields validation
  const requiredFields = [
    "opNumber",
    "opuNumber",
    "eduNumber",
    "modelFamily",
    "modelName",
    "technology",
  ];

  requiredFields.forEach((field) => {
    if (!formData[field]) {
      const fieldName = field
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      errors[field] = `${fieldName} is required`;
      isValid = false;
    }
  });

  // Alphanumeric validation for number fields
  const alphanumericFields = ["opNumber", "opuNumber", "eduNumber"];
  alphanumericFields.forEach((field) => {
    if (formData[field] && !/^[A-Za-z0-9-]+$/.test(formData[field])) {
      errors[field] = "Only alphanumeric characters and hyphens allowed";
      isValid = false;
    }
  });

  // Model name length validation
  if (
    formData.modelName &&
    (formData.modelName.length < 2 || formData.modelName.length > 50)
  ) {
    errors.modelName = "Must be between 2-50 characters";
    isValid = false;
  }

  // Component selection validation
  if (
    !formData.selectedComponents ||
    formData.selectedComponents.length === 0
  ) {
    errors.selectedComponents = "At least one component must be selected";
    isValid = false;
  }

  return { isValid, errors };
};
