import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    backgroundColor: "#FFFFFF",
    lineHeight: 1.5,
    color: "#1a202c",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #2b6cb0",
    paddingBottom: 12,
    marginBottom: 24,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2d3748",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 10,
    color: "#4a5568",
    marginTop: 4,
  },
  headerRight: {
    textAlign: "right",
  },
  revisionBadge: {
    backgroundColor: "#2b6cb0",
    color: "white",
    padding: "4px 8px",
    borderRadius: 4,
    fontSize: 10,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 28,
    breakInside: "avoid",
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d3748",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: 8,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subHeading: {
    fontSize: 13,
    fontWeight: "semibold",
    marginBottom: 12,
    color: "#2b6cb0",
    paddingLeft: 4,
    borderLeft: "3px solid #2b6cb0",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-start",
    minHeight: 20,
  },
  label: {
    width: 140,
    fontWeight: "semibold",
    color: "#4a5568",
    paddingRight: 8,
  },
  value: {
    flex: 1,
    color: "#1a202c",
  },
  table: {
    width: "100%",
    border: "1px solid #e2e8f0",
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 4,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #e2e8f0",
  },
  tableRowAlternate: {
    backgroundColor: "#edf2f7",
  },
  tableColHeader: {
    padding: 10,
    backgroundColor: "#2b6cb0",
    color: "white",
    fontWeight: "bold",
    fontSize: 9,
    textAlign: "center",
  },
  tableCol: {
    padding: 8,
    fontSize: 9,
    color: "#1a202c",
    textAlign: "left",
  },
  emptyText: {
    fontStyle: "italic",
    color: "#718096",
    fontSize: 10,
    padding: 8,
    textAlign: "center",
  },
  commentBox: {
    padding: 12,
    backgroundColor: "#e6f0ff",
    border: "1px solid #2b6cb0",
    borderRadius: 6,
    marginTop: 8,
  },
  commentText: {
    fontSize: 10,
    color: "#2b6cb0",
    lineHeight: 1.4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#718096",
    borderTop: "1px solid #e2e8f0",
    paddingTop: 8,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 16,
  },
  badge: {
    backgroundColor: "#e6f0ff",
    color: "#2b6cb0",
    padding: "2px 6px",
    borderRadius: 4,
    fontSize: 8,
    fontWeight: "bold",
    marginLeft: 4,
  },
});

// Utility Functions
const ConditionalField = ({ condition, children }) =>
  condition ? <>{children}</> : null;

const getSafe = (fn, defaultVal = "N/A") => {
  try {
    const result = fn();
    return result !== undefined && result !== null && result !== ""
      ? result
      : defaultVal;
  } catch (e) {
    return defaultVal;
  }
};

const hasValue = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed !== "" && trimmed !== "N/A";
  }
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "number") return true;
  return !!value;
};

const truncateText = (text, maxLength = 50) => {
  if (typeof text !== "string") return "N/A";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const renderTable = (data, columns, keyPrefix, width = "auto") => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <Text style={styles.emptyText}>No data available</Text>;
  }

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        {columns.map((col, idx) => (
          <View
            key={idx}
            style={[
              styles.tableColHeader,
              {
                width: col.width || width,
                backgroundColor: col.headerBg || "#2b6cb0",
              },
            ]}
          >
            <Text>{col.label}</Text>
          </View>
        ))}
      </View>
      {data.map((item, idx) => (
        <View
          style={[styles.tableRow, idx % 2 ? styles.tableRowAlternate : {}]}
          key={`${keyPrefix}-${idx}`}
        >
          {columns.map((col, colIdx) => (
            <View
              key={colIdx}
              style={[
                styles.tableCol,
                {
                  width: col.width || width,
                  textAlign: col.align || "left",
                },
              ]}
            >
              <Text wrap>
                {truncateText(getSafe(() => item[col.key], "N/A"))}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

// PDF Component
export const Page21PDFDocument = ({ formData = {} }) => {
  // Extract data with safe defaults
  const basicInfo = {
    opNumber: getSafe(() => formData.opNumber),
    opuNumber: getSafe(() => formData.opuNumber),
    eduNumber: getSafe(() => formData.eduNumber),
    modelFamily: getSafe(() => formData.modelFamily),
    modelName: getSafe(() => formData.modelName),
    technology: getSafe(() => formData.technology),
    revisionNumber: getSafe(() => formData.revisionNumber),
  };

  const generalInfo = {
    impedance: getSafe(() => formData.impedance),
    interfaces: getSafe(() => formData.interfaces),
    caseStyle: getSafe(() => formData.caseStyle),
    selectedCaseStyle: getSafe(() => formData.selectedCaseStyle),
    bottomSolderMask: getSafe(() => formData.bottomSolderMask),
    halfMoonRequirement: getSafe(() => formData.halfMoonRequirement),
    viaHolesRequirement: getSafe(() => formData.viaHolesRequirement),
    signalLaunchType: getSafe(() => formData.signalLaunchType),
    coverType: getSafe(() => formData.coverType),
    designRuleViolation: getSafe(() => formData.designRuleViolation),
    similarModel: getSafe(() => formData.similarModel),
  };

  const ports = {
    numberOfPorts: getSafe(() => formData.ports?.numberOfPorts, 0),
    portDetails: getSafe(() => formData.ports?.portDetails || [], []),
  };

  const enclosureDetails = {
    partType: getSafe(() => formData.enclosureDetails?.partType),
    partNumber: getSafe(() => formData.enclosureDetails?.partNumber),
  };

  const topcoverDetails = {
    partType: getSafe(() => formData.topcoverDetails?.partType),
    partNumber: getSafe(() => formData.topcoverDetails?.partNumber),
  };

  const caseDimensions = {
    length: getSafe(() => formData.caseDimensions?.length),
    width: getSafe(() => formData.caseDimensions?.width),
    height: getSafe(() => formData.caseDimensions?.height),
    pinOuts: getSafe(() => formData.caseDimensions?.pinOuts),
  };

  const capacitor = {
    numWithBpn: getSafe(() => formData.capacitor?.numWithBpn, 0),
    numWithoutBpn: getSafe(() => formData.capacitor?.numWithoutBpn, 0),
    withBpn: getSafe(() => formData.capacitor?.withBpn || [], []),
    withoutBpn: getSafe(() => formData.capacitor?.withoutBpn || [], []),
  };

  const inductor = {
    numWithBpn: getSafe(() => formData.inductor?.numWithBpn, 0),
    numWithoutBpn: getSafe(() => formData.inductor?.numWithoutBpn, 0),
    withBpn: getSafe(() => formData.inductor?.withBpn || [], []),
    withoutBpn: getSafe(() => formData.inductor?.withoutBpn || [], []),
  };

  const resistor = {
    numWithBpn: getSafe(() => formData.resistor?.numWithBpn, 0),
    numWithoutBpn: getSafe(() => formData.resistor?.numWithoutBpn, 0),
    withBpn: getSafe(() => formData.resistor?.withBpn || [], []),
    withoutBpn: getSafe(() => formData.resistor?.withoutBpn || [], []),
  };

  const airCoil = {
    numWithBpn: getSafe(() => formData.airCoil?.numWithBpn, 0),
    numWithoutBpn: getSafe(() => formData.airCoil?.numWithoutBpn, 0),
    withBpn: getSafe(() => formData.airCoil?.withBpn || [], []),
    withoutBpn: getSafe(() => formData.airCoil?.withoutBpn || [], []),
  };

  const transformers = {
    numberOfTransformers: getSafe(
      () => formData.transformers?.numberOfTransformers,
      0
    ),
    transformersList: getSafe(
      () => formData.transformers?.transformersList || [],
      []
    ),
  };

  const can = {
    isExistingCanAvailable: getSafe(() => formData.can?.isExistingCanAvailable),
    canMaterial: getSafe(() => formData.can?.canMaterial),
    canProcess: getSafe(() => formData.can?.canProcess),
    bpNumber: getSafe(() => formData.can?.bpNumber),
  };

  const pcbList = getSafe(() => formData.pcbList || [], []);

  const shieldsList = {
    shieldRequired: getSafe(() => formData.shieldsList?.shieldRequired),
    numberOfShields: getSafe(() => formData.shieldsList?.numberOfShields, 0),
    shields: getSafe(() => formData.shieldsList?.shields || [], []),
  };

  const fingersList = {
    fingerRequired: getSafe(() => formData.fingersList?.fingerRequired),
    numberOfFingers: getSafe(() => formData.fingersList?.numberOfFingers, 0),
    fingers: getSafe(() => formData.fingersList?.fingers || [], []),
  };

  const cooperFlapDetails = {
    numberOfFlaps: getSafe(() => formData.cooperFlapDetails?.numberOfFlaps, 0),
    flaps: getSafe(() => formData.cooperFlapDetails?.flaps || [], []),
  };

  const resonatorList = {
    numberOfResonators: getSafe(
      () => formData.resonatorList?.numberOfResonators,
      0
    ),
    resonators: getSafe(() => formData.resonatorList?.resonators || [], []),
  };

  const ltcc = {
    numberOfLtcc: getSafe(() => formData.ltcc?.numberOfLtcc, 0),
    ltccItems: getSafe(() => formData.ltcc?.ltccItems || [], []),
  };

  const specialRequirements = truncateText(
    getSafe(() => formData.specialRequirements),
    500
  );

  const hasSectionData = (fields, arrays = []) => {
    const hasFieldData = Object.values(fields).some(hasValue);
    const hasArrayData = arrays.some((arr) => hasValue(arr));
    return hasFieldData || hasArrayData;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header} fixed>
          <View>
            <Text style={styles.headerTitle}>
              {basicInfo.modelName || "Component"} Specification
            </Text>
            <Text style={styles.headerSubtitle}>
              PiBase Documentation Sheet
            </Text>
          </View>
          <View style={styles.headerRight}>
            <ConditionalField condition={hasValue(basicInfo.revisionNumber)}>
              <View style={styles.revisionBadge}>
                <Text>Rev: {basicInfo.revisionNumber}</Text>
              </View>
            </ConditionalField>
            <ConditionalField condition={hasValue(basicInfo.modelFamily)}>
              <Text style={{ fontSize: 9, marginTop: 4, color: "#4a5568" }}>
                {basicInfo.modelFamily}
              </Text>
            </ConditionalField>
          </View>
        </View>

        {/* Basic Details */}
        <ConditionalField
          condition={hasSectionData({
            opNumber: basicInfo.opNumber,
            opuNumber: basicInfo.opuNumber,
            eduNumber: basicInfo.eduNumber,
            modelFamily: basicInfo.modelFamily,
            modelName: basicInfo.modelName,
            technology: basicInfo.technology,
          })}
        >
          <View style={styles.section}>
            <Text style={styles.heading}>Component Identification</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <ConditionalField condition={hasValue(basicInfo.opNumber)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>OP Number:</Text>
                  <Text style={styles.value} wrap>
                    {basicInfo.opNumber}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField condition={hasValue(basicInfo.opuNumber)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>OPU Number:</Text>
                  <Text style={styles.value} wrap>
                    {basicInfo.opuNumber}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField condition={hasValue(basicInfo.eduNumber)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>EDU Number:</Text>
                  <Text style={styles.value} wrap>
                    {basicInfo.eduNumber}
                  </Text>
                </View>
              </ConditionalField>

              <ConditionalField condition={hasValue(basicInfo.modelName)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Model Name:</Text>
                  <Text style={styles.value} wrap>
                    {basicInfo.modelName}
                  </Text>
                </View>
              </ConditionalField>

              <ConditionalField condition={hasValue(basicInfo.modelFamily)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Model Family:</Text>
                  <Text style={styles.value} wrap>
                    {basicInfo.modelFamily}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField condition={hasValue(basicInfo.technology)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Technology:</Text>
                  <Text style={styles.value} wrap>
                    {basicInfo.technology}
                  </Text>
                </View>
              </ConditionalField>
            </View>
          </View>
        </ConditionalField>

        {/* General Details */}
        <ConditionalField
          condition={hasSectionData(
            {
              impedance: generalInfo.impedance,
              interfaces: generalInfo.interfaces,
              caseStyle: generalInfo.caseStyle,
              selectedCaseStyle: generalInfo.selectedCaseStyle,
              bottomSolderMask: generalInfo.bottomSolderMask,
              halfMoonRequirement: generalInfo.halfMoonRequirement,
              viaHolesRequirement: generalInfo.viaHolesRequirement,
              signalLaunchType: generalInfo.signalLaunchType,
              coverType: generalInfo.coverType,
              designRuleViolation: generalInfo.designRuleViolation,
              similarModel: generalInfo.similarModel,
            },
            [ports.portDetails]
          )}
        >
          <View style={styles.section}>
            <Text style={styles.heading}>General Specifications</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <ConditionalField condition={hasValue(generalInfo.impedance)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Impedance (Ω):</Text>
                  <Text style={styles.value} wrap>
                    {generalInfo.impedance}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField condition={hasValue(generalInfo.interfaces)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Interfaces:</Text>
                  <Text style={styles.value} wrap>
                    {generalInfo.interfaces}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField
                condition={
                  hasValue(generalInfo.caseStyle) ||
                  hasValue(generalInfo.selectedCaseStyle)
                }
              >
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Case Style:</Text>
                  <Text style={styles.value} wrap>
                    {generalInfo.caseStyle}{" "}
                    {generalInfo.selectedCaseStyle && (
                      <Text style={styles.badge}>
                        {generalInfo.selectedCaseStyle}
                      </Text>
                    )}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField
                condition={hasValue(generalInfo.bottomSolderMask)}
              >
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Solder Mask:</Text>
                  <Text style={styles.value} wrap>
                    {generalInfo.bottomSolderMask}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField
                condition={hasValue(generalInfo.halfMoonRequirement)}
              >
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Half Moon:</Text>
                  <Text style={styles.value} wrap>
                    {generalInfo.halfMoonRequirement}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField
                condition={hasValue(generalInfo.viaHolesRequirement)}
              >
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Via Holes:</Text>
                  <Text style={styles.value} wrap>
                    {generalInfo.viaHolesRequirement}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField
                condition={hasValue(generalInfo.signalLaunchType)}
              >
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Signal Launch:</Text>
                  <Text style={styles.value} wrap>
                    {generalInfo.signalLaunchType}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField condition={hasValue(generalInfo.coverType)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Cover Type:</Text>
                  <Text style={styles.value} wrap>
                    {generalInfo.coverType}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField condition={hasValue(generalInfo.similarModel)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Similar Model:</Text>
                  <Text style={styles.value} wrap>
                    {generalInfo.similarModel}
                  </Text>
                </View>
              </ConditionalField>
            </View>

            <ConditionalField
              condition={ports.numberOfPorts > 0 && hasValue(ports.portDetails)}
            >
              <Text style={styles.subHeading}>Ports Configuration</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Number of Ports:</Text>
                <Text style={styles.value}>{ports.numberOfPorts}</Text>
              </View>
              {renderTable(
                ports.portDetails.map((item, idx) => ({
                  ...item,
                  port: `Port ${idx + 1}`,
                })),
                [
                  { label: "Port", key: "port", width: "20%", align: "center" },
                  {
                    label: "Connector Type",
                    key: "connectorType",
                    width: "40%",
                    align: "left",
                  },
                  {
                    label: "Gender",
                    key: "connectorGender",
                    width: "40%",
                    align: "left",
                  },
                ],
                "port",
                "33%"
              )}
            </ConditionalField>
          </View>
        </ConditionalField>

        {/* Enclosure & Mechanical Details */}
        <ConditionalField
          condition={hasSectionData({
            partType: enclosureDetails.partType,
            partNumber: enclosureDetails.partNumber,
            partType: topcoverDetails.partType,
            partNumber: topcoverDetails.partNumber,
            length: caseDimensions.length,
            width: caseDimensions.width,
            height: caseDimensions.height,
            pinOuts: caseDimensions.pinOuts,
          })}
        >
          <View style={styles.section}>
            <Text style={styles.heading}>Mechanical Details</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <ConditionalField condition={hasValue(enclosureDetails.partType)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Enclosure Type:</Text>
                  <Text style={styles.value} wrap>
                    {enclosureDetails.partType}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField
                condition={hasValue(enclosureDetails.partNumber)}
              >
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Enclosure P/N:</Text>
                  <Text style={styles.value} wrap>
                    {enclosureDetails.partNumber}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField condition={hasValue(topcoverDetails.partType)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Topcover Type:</Text>
                  <Text style={styles.value} wrap>
                    {topcoverDetails.partType}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField
                condition={hasValue(topcoverDetails.partNumber)}
              >
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Topcover P/N:</Text>
                  <Text style={styles.value} wrap>
                    {topcoverDetails.partNumber}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField condition={hasValue(caseDimensions.length)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Length (mm):</Text>
                  <Text style={styles.value} wrap>
                    {caseDimensions.length}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField condition={hasValue(caseDimensions.width)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Width (mm):</Text>
                  <Text style={styles.value} wrap>
                    {caseDimensions.width}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField condition={hasValue(caseDimensions.height)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Height (mm):</Text>
                  <Text style={styles.value} wrap>
                    {caseDimensions.height}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField condition={hasValue(caseDimensions.pinOuts)}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Pin Outs:</Text>
                  <Text style={styles.value} wrap>
                    {truncateText(caseDimensions.pinOuts)}
                  </Text>
                </View>
              </ConditionalField>
            </View>
          </View>
        </ConditionalField>

        {/* Components Section */}
        <ConditionalField
          condition={
            capacitor.numWithBpn + capacitor.numWithoutBpn > 0 ||
            inductor.numWithBpn + inductor.numWithoutBpn > 0 ||
            resistor.numWithBpn + resistor.numWithoutBpn > 0 ||
            airCoil.numWithBpn + airCoil.numWithoutBpn > 0 ||
            transformers.numberOfTransformers > 0
          }
        >
          <View style={styles.section}>
            <Text style={styles.heading}>Component Inventory</Text>

            {/* Capacitors */}
            <ConditionalField
              condition={
                capacitor.numWithBpn + capacitor.numWithoutBpn > 0 ||
                hasValue(capacitor.withBpn) ||
                hasValue(capacitor.withoutBpn)
              }
            >
              <Text style={styles.subHeading}>Capacitors</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 8,
                }}
              >
                <ConditionalField
                  condition={capacitor.numWithBpn + capacitor.numWithoutBpn > 0}
                >
                  <View style={{ ...styles.row, width: "50%" }}>
                    <Text style={styles.label}>Total Count:</Text>
                    <Text style={styles.value}>
                      {capacitor.numWithBpn + capacitor.numWithoutBpn}
                    </Text>
                  </View>
                </ConditionalField>
                <ConditionalField condition={capacitor.numWithBpn > 0}>
                  <View style={{ ...styles.row, width: "50%" }}>
                    <Text style={styles.label}>With BPN:</Text>
                    <Text style={styles.value}>{capacitor.numWithBpn}</Text>
                  </View>
                </ConditionalField>
                <ConditionalField condition={capacitor.numWithoutBpn > 0}>
                  <View style={{ ...styles.row, width: "50%" }}>
                    <Text style={styles.label}>Without BPN:</Text>
                    <Text style={styles.value}>{capacitor.numWithoutBpn}</Text>
                  </View>
                </ConditionalField>
              </View>
              <ConditionalField condition={hasValue(capacitor.withBpn)}>
                {renderTable(
                  capacitor.withBpn,
                  [
                    { label: "Name", key: "name", width: "50%", align: "left" },
                    { label: "BPN", key: "bpn", width: "50%", align: "left" },
                  ],
                  "cap-bpn"
                )}
              </ConditionalField>
              <ConditionalField condition={hasValue(capacitor.withoutBpn)}>
                {renderTable(
                  capacitor.withoutBpn,
                  [
                    { label: "Name", key: "name", width: "25%", align: "left" },
                    {
                      label: "Supplier",
                      key: "supplierName",
                      width: "25%",
                      align: "left",
                    },
                    {
                      label: "P/N",
                      key: "supplierNumber",
                      width: "25%",
                      align: "left",
                    },
                    {
                      label: "Status",
                      key: "qualificationStaus",
                      width: "25%",
                      align: "left",
                    },
                  ],
                  "cap-nobpn"
                )}
              </ConditionalField>
            </ConditionalField>

            {/* Inductors */}
            <ConditionalField
              condition={
                inductor.numWithBpn + inductor.numWithoutBpn > 0 ||
                hasValue(inductor.withBpn) ||
                hasValue(inductor.withoutBpn)
              }
            >
              <Text style={styles.subHeading}>Inductors</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 8,
                }}
              >
                <ConditionalField
                  condition={inductor.numWithBpn + inductor.numWithoutBpn > 0}
                >
                  <View style={{ ...styles.row, width: "50%" }}>
                    <Text style={styles.label}>Total Count:</Text>
                    <Text style={styles.value}>
                      {inductor.numWithBpn + inductor.numWithoutBpn}
                    </Text>
                  </View>
                </ConditionalField>
                <ConditionalField condition={inductor.numWithBpn > 0}>
                  <View style={{ ...styles.row, width: "50%" }}>
                    <Text style={styles.label}>With BPN:</Text>
                    <Text style={styles.value}>{inductor.numWithBpn}</Text>
                  </View>
                </ConditionalField>
                <ConditionalField condition={inductor.numWithoutBpn > 0}>
                  <View style={{ ...styles.row, width: "50%" }}>
                    <Text style={styles.label}>Without BPN:</Text>
                    <Text style={styles.value}>{inductor.numWithoutBpn}</Text>
                  </View>
                </ConditionalField>
              </View>
              <ConditionalField condition={hasValue(inductor.withBpn)}>
                {renderTable(
                  inductor.withBpn,
                  [
                    { label: "Name", key: "name", width: "50%", align: "left" },
                    { label: "BPN", key: "bpn", width: "50%", align: "left" },
                  ],
                  "ind-bpn"
                )}
              </ConditionalField>
              <ConditionalField condition={hasValue(inductor.withoutBpn)}>
                {renderTable(
                  inductor.withoutBpn,
                  [
                    { label: "Name", key: "name", width: "25%", align: "left" },
                    {
                      label: "Supplier",
                      key: "supplierName",
                      width: "25%",
                      align: "left",
                    },
                    {
                      label: "P/N",
                      key: "supplierNumber",
                      width: "25%",
                      align: "left",
                    },
                    {
                      label: "Status",
                      key: "qualificationStaus",
                      width: "25%",
                      align: "left",
                    },
                  ],
                  "ind-nobpn"
                )}
              </ConditionalField>
            </ConditionalField>

            {/* Resistors */}
            <ConditionalField
              condition={
                resistor.numWithBpn + resistor.numWithoutBpn > 0 ||
                hasValue(resistor.withBpn) ||
                hasValue(resistor.withoutBpn)
              }
            >
              <Text style={styles.subHeading}>Resistors</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 8,
                }}
              >
                <ConditionalField
                  condition={resistor.numWithBpn + resistor.numWithoutBpn > 0}
                >
                  <View style={{ ...styles.row, width: "50%" }}>
                    <Text style={styles.label}>Total Count:</Text>
                    <Text style={styles.value}>
                      {resistor.numWithBpn + resistor.numWithoutBpn}
                    </Text>
                  </View>
                </ConditionalField>
                <ConditionalField condition={resistor.numWithBpn > 0}>
                  <View style={{ ...styles.row, width: "50%" }}>
                    <Text style={styles.label}>With BPN:</Text>
                    <Text style={styles.value}>{resistor.numWithBpn}</Text>
                  </View>
                </ConditionalField>
                <ConditionalField condition={resistor.numWithoutBpn > 0}>
                  <View style={{ ...styles.row, width: "50%" }}>
                    <Text style={styles.label}>Without BPN:</Text>
                    <Text style={styles.value}>{resistor.numWithoutBpn}</Text>
                  </View>
                </ConditionalField>
              </View>
              <ConditionalField condition={hasValue(resistor.withBpn)}>
                {renderTable(
                  resistor.withBpn,
                  [
                    { label: "Name", key: "name", width: "50%", align: "left" },
                    { label: "BPN", key: "bpn", width: "50%", align: "left" },
                  ],
                  "res-bpn"
                )}
              </ConditionalField>
              <ConditionalField condition={hasValue(resistor.withoutBpn)}>
                {renderTable(
                  resistor.withoutBpn,
                  [
                    { label: "Name", key: "name", width: "25%", align: "left" },
                    {
                      label: "Supplier",
                      key: "supplierName",
                      width: "25%",
                      align: "left",
                    },
                    {
                      label: "P/N",
                      key: "supplierNumber",
                      width: "25%",
                      align: "left",
                    },
                    {
                      label: "Status",
                      key: "qualificationStaus",
                      width: "25%",
                      align: "left",
                    },
                  ],
                  "res-nobpn"
                )}
              </ConditionalField>
            </ConditionalField>

            {/* Air Coils */}
            <ConditionalField
              condition={
                airCoil.numWithBpn + airCoil.numWithoutBpn > 0 ||
                hasValue(airCoil.withBpn) ||
                hasValue(airCoil.withoutBpn)
              }
            >
              <Text style={styles.subHeading}>Air Coils</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 8,
                }}
              >
                <ConditionalField
                  condition={airCoil.numWithBpn + airCoil.numWithoutBpn > 0}
                >
                  <View style={{ ...styles.row, width: "50%" }}>
                    <Text style={styles.label}>Total Count:</Text>
                    <Text style={styles.value}>
                      {airCoil.numWithBpn + airCoil.numWithoutBpn}
                    </Text>
                  </View>
                </ConditionalField>
                <ConditionalField condition={airCoil.numWithBpn > 0}>
                  <View style={{ ...styles.row, width: "50%" }}>
                    <Text style={styles.label}>With BPN:</Text>
                    <Text style={styles.value}>{airCoil.numWithBpn}</Text>
                  </View>
                </ConditionalField>
                <ConditionalField condition={airCoil.numWithoutBpn > 0}>
                  <View style={{ ...styles.row, width: "50%" }}>
                    <Text style={styles.label}>Without BPN:</Text>
                    <Text style={styles.value}>{airCoil.numWithoutBpn}</Text>
                  </View>
                </ConditionalField>
              </View>
              <ConditionalField condition={hasValue(airCoil.withBpn)}>
                {renderTable(
                  airCoil.withBpn,
                  [
                    { label: "Name", key: "name", width: "50%", align: "left" },
                    { label: "BPN", key: "bpn", width: "50%", align: "left" },
                  ],
                  "air-bpn"
                )}
              </ConditionalField>
              <ConditionalField condition={hasValue(airCoil.withoutBpn)}>
                {renderTable(
                  airCoil.withoutBpn,
                  [
                    { label: "Name", key: "name", width: "12%", align: "left" },
                    {
                      label: "Wire",
                      key: "wiregauge",
                      width: "12%",
                      align: "left",
                    },
                    {
                      label: "Turns",
                      key: "numberOfTurns",
                      width: "12%",
                      align: "center",
                    },
                    {
                      label: "Inner Dia",
                      key: "innerDiameter",
                      width: "12%",
                      align: "center",
                    },
                    {
                      label: "Length",
                      key: "lengthOfAircoil",
                      width: "12%",
                      align: "center",
                    },
                    {
                      label: "Width",
                      key: "widthOfAircoil",
                      width: "12%",
                      align: "center",
                    },
                    {
                      label: "L-Bend",
                      key: "lBendAircoil",
                      width: "12%",
                      align: "center",
                    },
                    {
                      label: "Shorter Leg",
                      key: "shorterLegAircoil",
                      width: "16%",
                      align: "center",
                    },
                  ],
                  "air-nobpn"
                )}
              </ConditionalField>
            </ConditionalField>

            {/* Transformers */}
            <ConditionalField
              condition={
                transformers.numberOfTransformers > 0 &&
                hasValue(transformers.transformersList)
              }
            >
              <Text style={styles.subHeading}>Transformers</Text>
              {renderTable(
                transformers.transformersList,
                [
                  { label: "Name", key: "name", width: "20%", align: "left" },
                  {
                    label: "Core Type",
                    key: "coreType",
                    width: "20%",
                    align: "left",
                  },
                  {
                    label: "Core BPN",
                    key: "coreBPN",
                    width: "20%",
                    align: "left",
                  },
                  {
                    label: "Wire Type",
                    key: "wireType",
                    width: "20%",
                    align: "left",
                  },
                  {
                    label: "Wire Gauge",
                    key: "wireGauge",
                    width: "20%",
                    align: "left",
                  },
                ],
                "transformer"
              )}
            </ConditionalField>
          </View>
        </ConditionalField>

        {/* Can Details */}
        <ConditionalField
          condition={hasSectionData({
            isExistingCanAvailable: can.isExistingCanAvailable,
            canMaterial: can.canMaterial,
            canProcess: can.canProcess,
            bpNumber: can.bpNumber,
          })}
        >
          <View style={styles.section}>
            <Text style={styles.heading}>Can Details</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {can.isExistingCanAvailable === "Yes" ? (
                <ConditionalField condition={hasValue(can.bpNumber)}>
                  <View style={{ ...styles.row, width: "50%" }}>
                    <Text style={styles.label}>BP Number:</Text>
                    <Text style={styles.value} wrap>
                      {can.bpNumber}
                    </Text>
                  </View>
                </ConditionalField>
              ) : (
                <>
                  <ConditionalField
                    condition={hasValue(can.isExistingCanAvailable)}
                  >
                    <View style={{ ...styles.row, width: "50%" }}>
                      <Text style={styles.label}>Existing Can:</Text>
                      <Text style={styles.value} wrap>
                        {can.isExistingCanAvailable}
                      </Text>
                    </View>
                  </ConditionalField>
                  <ConditionalField condition={hasValue(can.canMaterial)}>
                    <View style={{ ...styles.row, width: "50%" }}>
                      <Text style={styles.label}>Material:</Text>
                      <Text style={styles.value} wrap>
                        {can.canMaterial}
                      </Text>
                    </View>
                  </ConditionalField>
                  <ConditionalField condition={hasValue(can.canProcess)}>
                    <View style={{ ...styles.row, width: "50%" }}>
                      <Text style={styles.label}>Process:</Text>
                      <Text style={styles.value} wrap>
                        {can.canProcess}
                      </Text>
                    </View>
                  </ConditionalField>
                  <ConditionalField condition={hasValue(can.bpNumber)}>
                    <View style={{ ...styles.row, width: "50%" }}>
                      <Text style={styles.label}>BP Number:</Text>
                      <Text style={styles.value} wrap>
                        {can.bpNumber}
                      </Text>
                    </View>
                  </ConditionalField>
                </>
              )}
            </View>
          </View>
        </ConditionalField>

        {/* PCB List */}
        <ConditionalField condition={hasValue(pcbList)}>
          <View style={styles.section}>
            <Text style={styles.heading}>PCB List</Text>
            {pcbList.map((pcb, idx) => (
              <View key={`pcb-${idx}`} style={{ marginBottom: 16 }}>
                <Text style={styles.subHeading}>
                  {pcb.name || `PCB ${idx + 1}`}
                </Text>
                {pcb.isExistingPCBAvailable === "Yes" ? (
                  <ConditionalField
                    condition={hasValue(getSafe(() => pcb.bpNumber))}
                  >
                    <View style={styles.row}>
                      <Text style={styles.label}>BP Number:</Text>
                      <Text style={styles.value} wrap>
                        {getSafe(() => pcb.bpNumber)}
                      </Text>
                    </View>
                  </ConditionalField>
                ) : (
                  renderTable(
                    [pcb],
                    [
                      {
                        label: "Name",
                        key: "name",
                        width: "14%",
                        align: "left",
                      },
                      {
                        label: "Material",
                        key: "material",
                        width: "14%",
                        align: "left",
                      },
                      {
                        label: "Layers",
                        key: "layers",
                        width: "14%",
                        align: "center",
                      },
                      {
                        label: "Substrate Thickness",
                        key: "substrateThickness",
                        width: "14%",
                        align: "center",
                      },
                      {
                        label: "Copper Thickness",
                        key: "copperThickness",
                        width: "14%",
                        align: "center",
                      },
                      {
                        label: "Overall Thickness",
                        key: "overallThickness",
                        width: "14%",
                        align: "center",
                      },
                      {
                        label: "Orientation",
                        key: "mountingOrientation",
                        width: "16%",
                        align: "left",
                      },
                    ],
                    `pcb-${idx}`
                  )
                )}
                <ConditionalField
                  condition={hasValue(getSafe(() => pcb.comments))}
                >
                  <View style={styles.commentBox}>
                    <Text style={styles.commentText} wrap>
                      Comments: {getSafe(() => pcb.comments)}
                    </Text>
                  </View>
                </ConditionalField>
              </View>
            ))}
          </View>
        </ConditionalField>

        {/* Shields */}
        <ConditionalField
          condition={
            shieldsList.numberOfShields > 0 &&
            (hasValue(shieldsList.shieldRequired) ||
              hasValue(shieldsList.shields))
          }
        >
          <View style={styles.section}>
            <Text style={styles.heading}>Shields</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <ConditionalField
                condition={hasValue(shieldsList.shieldRequired)}
              >
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Shield Required:</Text>
                  <Text style={styles.value} wrap>
                    {shieldsList.shieldRequired}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField condition={shieldsList.numberOfShields > 0}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Number of Shields:</Text>
                  <Text style={styles.value}>
                    {shieldsList.numberOfShields}
                  </Text>
                </View>
              </ConditionalField>
            </View>
            <ConditionalField condition={hasValue(shieldsList.shields)}>
              {renderTable(
                shieldsList.shields,
                [
                  {
                    label: "Part Type",
                    key: "partType",
                    width: "50%",
                    align: "left",
                  },
                  {
                    label: "Part Number",
                    key: "partNumber",
                    width: "50%",
                    align: "left",
                  },
                ],
                "shield"
              )}
            </ConditionalField>
          </View>
        </ConditionalField>

        {/* Fingers */}
        <ConditionalField
          condition={
            fingersList.numberOfFingers > 0 &&
            (hasValue(fingersList.fingerRequired) ||
              hasValue(fingersList.fingers))
          }
        >
          <View style={styles.section}>
            <Text style={styles.heading}>Fingers</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <ConditionalField
                condition={hasValue(fingersList.fingerRequired)}
              >
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Finger Required:</Text>
                  <Text style={styles.value} wrap>
                    {fingersList.fingerRequired}
                  </Text>
                </View>
              </ConditionalField>
              <ConditionalField condition={fingersList.numberOfFingers > 0}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Number of Fingers:</Text>
                  <Text style={styles.value}>
                    {fingersList.numberOfFingers}
                  </Text>
                </View>
              </ConditionalField>
            </View>
            <ConditionalField condition={hasValue(fingersList.fingers)}>
              {renderTable(
                fingersList.fingers,
                [
                  {
                    label: "Part Type",
                    key: "partType",
                    width: "50%",
                    align: "left",
                  },
                  {
                    label: "Part Number",
                    key: "partNumber",
                    width: "50%",
                    align: "left",
                  },
                ],
                "finger"
              )}
            </ConditionalField>
          </View>
        </ConditionalField>

        {/* Copper Flaps */}
        <ConditionalField
          condition={
            cooperFlapDetails.numberOfFlaps > 0 &&
            hasValue(cooperFlapDetails.flaps)
          }
        >
          <View style={styles.section}>
            <Text style={styles.heading}>Copper Flaps</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <ConditionalField condition={cooperFlapDetails.numberOfFlaps > 0}>
                <View style={{ ...styles.row, width: "50%" }}>
                  <Text style={styles.label}>Number of Flaps:</Text>
                  <Text style={styles.value}>
                    {cooperFlapDetails.numberOfFlaps}
                  </Text>
                </View>
              </ConditionalField>
            </View>
            {renderTable(
              cooperFlapDetails.flaps,
              [
                {
                  label: "BP Type",
                  key: "bpType",
                  width: "20%",
                  align: "left",
                },
                {
                  label: "BP Number",
                  key: "bpNumber",
                  width: "20%",
                  align: "left",
                },
                {
                  label: "Length",
                  key: "length",
                  width: "20%",
                  align: "center",
                },
                { label: "Width", key: "width", width: "20%", align: "center" },
                {
                  label: "Thickness",
                  key: "thickness",
                  width: "20%",
                  align: "center",
                },
              ],
              "flap"
            )}
          </View>
        </ConditionalField>

        {/* Resonators */}
        <ConditionalField
          condition={
            resonatorList.numberOfResonators > 0 &&
            hasValue(resonatorList.resonators)
          }
        >
          <View style={styles.section}>
            <Text style={styles.heading}>Resonators</Text>
            {renderTable(
              resonatorList.resonators,
              [
                {
                  label: "BP Type",
                  key: "bpType",
                  width: "14%",
                  align: "left",
                },
                {
                  label: "BP Number",
                  key: "bpNumber",
                  width: "14%",
                  align: "left",
                },
                {
                  label: "Size",
                  key: "resonatorSize",
                  width: "14%",
                  align: "center",
                },
                {
                  label: "Dielectric Const.",
                  key: "dielectricConstant",
                  width: "14%",
                  align: "center",
                },
                {
                  label: "Length",
                  key: "resonatorLength",
                  width: "14%",
                  align: "center",
                },
                {
                  label: "Frequency",
                  key: "resonatorFrequency",
                  width: "14%",
                  align: "center",
                },
                {
                  label: "Assembly Type",
                  key: "assemblyType",
                  width: "16%",
                  align: "left",
                },
              ],
              "resonator"
            )}
            {resonatorList.resonators.map((resonator, idx) => (
              <ConditionalField
                key={`resonator-comment-${idx}`}
                condition={hasValue(getSafe(() => resonator.comments))}
              >
                <View style={styles.commentBox}>
                  <Text style={styles.commentText} wrap>
                    Comments (Resonator {idx + 1}):{" "}
                    {getSafe(() => resonator.comments)}
                  </Text>
                </View>
              </ConditionalField>
            ))}
          </View>
        </ConditionalField>

        {/* LTCC Components */}
        <ConditionalField
          condition={ltcc.numberOfLtcc > 0 && hasValue(ltcc.ltccItems)}
        >
          <View style={styles.section}>
            <Text style={styles.heading}>LTCC Components</Text>
            {renderTable(
              ltcc.ltccItems,
              [
                {
                  label: "Model Name",
                  key: "modelName",
                  width: "100%",
                  align: "left",
                },
              ],
              "ltcc"
            )}
          </View>
        </ConditionalField>

        {/* Special Requirements */}
        <ConditionalField condition={hasValue(specialRequirements)}>
          <View style={styles.section}>
            <Text style={styles.heading}>Special Requirements</Text>
            <View style={styles.commentBox}>
              <Text style={styles.commentText} wrap>
                {specialRequirements}
              </Text>
            </View>
          </View>
        </ConditionalField>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Generated on ${new Date().toLocaleDateString()} | Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

// Export function
export const generatePDF = async (formData) => {
  try {
    const blob = await pdf(<Page21PDFDocument formData={formData} />).toBlob();
    const filename = `${formData?.modelName || "Component"}_${
      formData?.revisionNumber || "Spec"
    }.pdf`;
    saveAs(blob, filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
