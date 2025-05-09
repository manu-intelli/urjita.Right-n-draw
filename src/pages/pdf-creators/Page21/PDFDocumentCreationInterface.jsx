import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    lineHeight: 1.4,
    fontFamily: "Helvetica",
    color: "#333",
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#2c3e50",
    borderBottom: "1px solid #e0e0e0",
    paddingBottom: 10,
  },
  section: {
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    padding: 15,
    border: "1px solid #e0e0e0",
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#2c3e50",
    borderBottom: "1px solid #e0e0e0",
    paddingBottom: 5,
  },
  subHeader: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#3498db",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "flex-start",
  },
  label: {
    width: 160,
    fontWeight: "bold",
    color: "#7f8c8d",
  },
  value: {
    flex: 1,
    color: "#2c3e50",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#3498db",
    color: "white",
    padding: 5,
    marginBottom: 5,
    borderRadius: 3,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 3,
    padding: 5,
    backgroundColor: "#f8f9fa",
    borderRadius: 3,
    borderBottom: "1px solid #e0e0e0",
  },
  col: {
    flex: 1,
    padding: 3,
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "#95a5a6",
  },
  logo: {
    width: 120,
    marginBottom: 20,
    alignSelf: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 10,
  },
  emptyText: {
    color: "#95a5a6",
    fontStyle: "italic",
  },
});

const ConditionalField = ({ condition, children }) => {
  if (!condition) return null;
  return children;
};

const Page21PDFDocument = ({ formData }) => {
  // Helper function to render component tables
  const renderComponentTable = (components, withBpn, withoutBpn) => {
    if (
      (!withBpn || withBpn.length === 0) &&
      (!withoutBpn || withoutBpn.length === 0)
    ) {
      return <Text style={styles.emptyText}>No components specified</Text>;
    }

    return (
      <>
        <View style={styles.tableHeader}>
          <Text style={styles.col}>Name</Text>
          <Text style={styles.col}>BPN/Supplier</Text>
          <Text style={styles.col}>Status</Text>
        </View>

        {withBpn?.map((comp, index) => (
          <View key={`with-bpn-${index}`} style={styles.tableRow}>
            <Text style={styles.col}>{comp.name || "N/A"}</Text>
            <Text style={styles.col}>{comp.bpn || "N/A"}</Text>
            <Text style={styles.col}>BPN Available</Text>
          </View>
        ))}

        {withoutBpn?.map((comp, index) => (
          <View key={`without-bpn-${index}`} style={styles.tableRow}>
            <Text style={styles.col}>{comp.name || "N/A"}</Text>
            <Text style={styles.col}>
              {comp.supplierName
                ? `${comp.supplierName} (${comp.supplierNumber})`
                : "N/A"}
            </Text>
            <Text style={styles.col}>
              {comp.qualificationStaus || "Not Qualified"}
            </Text>
          </View>
        ))}
      </>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with logo */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={styles.header}>Component Pricing Specification</Text>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <ConditionalField condition={formData.opNumber}>
            <View style={styles.row}>
              <Text style={styles.label}>OP Number:</Text>
              <Text style={styles.value}>{formData.opNumber}</Text>
            </View>
          </ConditionalField>

          <ConditionalField condition={formData.opuNumber}>
            <View style={styles.row}>
              <Text style={styles.label}>OPU Number:</Text>
              <Text style={styles.value}>{formData.opuNumber}</Text>
            </View>
          </ConditionalField>

          <ConditionalField condition={formData.eduNumber}>
            <View style={styles.row}>
              <Text style={styles.label}>EDU Number:</Text>
              <Text style={styles.value}>{formData.eduNumber}</Text>
            </View>
          </ConditionalField>

          <ConditionalField condition={formData.modelFamily}>
            <View style={styles.row}>
              <Text style={styles.label}>Model Family:</Text>
              <Text style={styles.value}>{formData.modelFamily}</Text>
            </View>
          </ConditionalField>

          <ConditionalField condition={formData.modelName}>
            <View style={styles.row}>
              <Text style={styles.label}>Model Name:</Text>
              <Text style={styles.value}>{formData.modelName}</Text>
            </View>
          </ConditionalField>

          <ConditionalField condition={formData.technology}>
            <View style={styles.row}>
              <Text style={styles.label}>Technology:</Text>
              <Text style={styles.value}>{formData.technology}</Text>
            </View>
          </ConditionalField>

          <ConditionalField condition={formData.revisionNumber}>
            <View style={styles.row}>
              <Text style={styles.label}>Revision Number:</Text>
              <Text style={styles.value}>{formData.revisionNumber}</Text>
            </View>
          </ConditionalField>

          <ConditionalField condition={formData.impedance}>
            <View style={styles.row}>
              <Text style={styles.label}>Impedance:</Text>
              <Text style={styles.value}>
                {formData.impedance}
                {formData.customImpedance === "1" ? " (Custom)" : ""}
              </Text>
            </View>
          </ConditionalField>

          <ConditionalField condition={formData.package}>
            <View style={styles.row}>
              <Text style={styles.label}>Package:</Text>
              <Text style={styles.value}>{formData.package}</Text>
            </View>
          </ConditionalField>
        </View>

        {/* Ports Configuration */}
        <ConditionalField condition={formData.ports?.numberOfPorts > 0}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ports Configuration</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Number of Ports:</Text>
              <Text style={styles.value}>
                {formData.ports?.numberOfPorts || 0}
              </Text>
            </View>

            <Text style={styles.subHeader}>Port Details</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.col}>Port #</Text>
              <Text style={styles.col}>Connector Type</Text>
              <Text style={styles.col}>Gender</Text>
            </View>

            {formData.ports?.portDetails?.map((port, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.col}>{index + 1}</Text>
                <Text style={styles.col}>{port.connectorType || "N/A"}</Text>
                <Text style={styles.col}>{port.connectorGender || "N/A"}</Text>
              </View>
            ))}
          </View>
        </ConditionalField>

        {/* Enclosure & Cover Details */}
        <ConditionalField
          condition={
            formData.enclosureDetails?.partType ||
            formData.topcoverDetails?.partType ||
            formData.caseStyle
          }
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Enclosure & Cover Details</Text>

            <ConditionalField condition={formData.enclosureDetails?.partType}>
              <View style={styles.row}>
                <Text style={styles.label}>Enclosure Part Type:</Text>
                <Text style={styles.value}>
                  {formData.enclosureDetails?.partType}
                </Text>
              </View>
            </ConditionalField>

            <ConditionalField condition={formData.enclosureDetails?.partNumber}>
              <View style={styles.row}>
                <Text style={styles.label}>Enclosure Part Number:</Text>
                <Text style={styles.value}>
                  {formData.enclosureDetails?.partNumber}
                </Text>
              </View>
            </ConditionalField>

            <ConditionalField condition={formData.topcoverDetails?.partType}>
              <View style={styles.row}>
                <Text style={styles.label}>Top Cover Part Type:</Text>
                <Text style={styles.value}>
                  {formData.topcoverDetails?.partType}
                </Text>
              </View>
            </ConditionalField>

            <ConditionalField condition={formData.topcoverDetails?.partNumber}>
              <View style={styles.row}>
                <Text style={styles.label}>Top Cover Part Number:</Text>
                <Text style={styles.value}>
                  {formData.topcoverDetails?.partNumber}
                </Text>
              </View>
            </ConditionalField>

            <ConditionalField condition={formData.caseStyle}>
              <View style={styles.row}>
                <Text style={styles.label}>Case Style:</Text>
                <Text style={styles.value}>{formData.caseStyle}</Text>
              </View>
            </ConditionalField>

            <ConditionalField condition={formData.selectedCaseStyle}>
              <View style={styles.row}>
                <Text style={styles.label}>Selected Case Style:</Text>
                <Text style={styles.value}>{formData.selectedCaseStyle}</Text>
              </View>
            </ConditionalField>

            <ConditionalField
              condition={
                formData.caseDimensions?.length ||
                formData.caseDimensions?.width ||
                formData.caseDimensions?.height
              }
            >
              <View style={styles.row}>
                <Text style={styles.label}>Case Dimensions (L x W x H):</Text>
                <Text style={styles.value}>
                  {formData.caseDimensions?.length || "N/A"} x{" "}
                  {formData.caseDimensions?.width || "N/A"} x{" "}
                  {formData.caseDimensions?.height || "N/A"}
                </Text>
              </View>
            </ConditionalField>

            <ConditionalField condition={formData.caseDimensions?.pinOuts}>
              <View style={styles.row}>
                <Text style={styles.label}>Pin Outs:</Text>
                <Text style={styles.value}>
                  {formData.caseDimensions?.pinOuts}
                </Text>
              </View>
            </ConditionalField>
          </View>
        </ConditionalField>

        {/* Can Details */}
        <ConditionalField
          condition={
            formData.isExistingCanAvailable ||
            formData.can?.material ||
            formData.can?.makingProcess
          }
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Can Details</Text>

            <ConditionalField condition={formData.isExistingCanAvailable}>
              <View style={styles.row}>
                <Text style={styles.label}>Existing Can Available:</Text>
                <Text style={styles.value}>
                  {formData.isExistingCanAvailable}
                </Text>
              </View>
            </ConditionalField>

            <ConditionalField condition={formData.can?.material}>
              <View style={styles.row}>
                <Text style={styles.label}>Can Material:</Text>
                <Text style={styles.value}>{formData.can?.material}</Text>
              </View>
            </ConditionalField>

            <ConditionalField condition={formData.can?.makingProcess}>
              <View style={styles.row}>
                <Text style={styles.label}>Making Process:</Text>
                <Text style={styles.value}>{formData.can?.makingProcess}</Text>
              </View>
            </ConditionalField>
          </View>
        </ConditionalField>

        {/* PCB Details */}
        <ConditionalField condition={formData.pcbList?.length > 0}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PCB Details</Text>

            {formData.pcbList?.map((pcb, index) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={styles.subHeader}>
                  PCB {index + 1}: {pcb.name || "Unnamed PCB"}
                </Text>

                <ConditionalField condition={pcb.isExistingCanAvailable}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Existing Part:</Text>
                    <Text style={styles.value}>
                      {pcb.isExistingCanAvailable}
                    </Text>
                  </View>
                </ConditionalField>

                <ConditionalField
                  condition={
                    pcb.isExistingCanAvailable === "Yes" && pcb.bpNumber
                  }
                >
                  <View style={styles.row}>
                    <Text style={styles.label}>BP Number:</Text>
                    <Text style={styles.value}>{pcb.bpNumber}</Text>
                  </View>
                </ConditionalField>

                <ConditionalField condition={pcb.material}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Material:</Text>
                    <Text style={styles.value}>{pcb.material}</Text>
                  </View>
                </ConditionalField>

                <ConditionalField condition={pcb.thickness}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Thickness:</Text>
                    <Text style={styles.value}>{pcb.thickness}</Text>
                  </View>
                </ConditionalField>

                <ConditionalField condition={pcb.layers}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Layers:</Text>
                    <Text style={styles.value}>{pcb.layers}</Text>
                  </View>
                </ConditionalField>

                <ConditionalField condition={pcb.mountingOrientation}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Mounting Orientation:</Text>
                    <Text style={styles.value}>{pcb.mountingOrientation}</Text>
                  </View>
                </ConditionalField>

                <ConditionalField condition={pcb.substrateThickness}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Substrate Thickness:</Text>
                    <Text style={styles.value}>{pcb.substrateThickness}</Text>
                  </View>
                </ConditionalField>

                <ConditionalField condition={pcb.rfLayerThickness}>
                  <View style={styles.row}>
                    <Text style={styles.label}>RF Layer Thickness:</Text>
                    <Text style={styles.value}>{pcb.rfLayerThickness}</Text>
                  </View>
                </ConditionalField>

                <ConditionalField condition={pcb.overallThickness}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Overall Thickness:</Text>
                    <Text style={styles.value}>{pcb.overallThickness}</Text>
                  </View>
                </ConditionalField>

                <ConditionalField condition={pcb.copperThickness}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Copper Thickness:</Text>
                    <Text style={styles.value}>{pcb.copperThickness}</Text>
                  </View>
                </ConditionalField>

                <ConditionalField condition={pcb.comments}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Comments:</Text>
                    <Text style={styles.value}>{pcb.comments}</Text>
                  </View>
                </ConditionalField>
              </View>
            ))}
          </View>
        </ConditionalField>

        {/* Components Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Components Summary</Text>

          {/* Capacitors */}
          <Text style={styles.subHeader}>Capacitors</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Total Capacitors:</Text>
            <Text style={styles.value}>
              {(formData.capacitor?.numWithBpn || 0) +
                (formData.capacitor?.numWithoutBpn || 0)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>With BPN:</Text>
            <Text style={styles.value}>
              {formData.capacitor?.numWithBpn || 0}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Without BPN:</Text>
            <Text style={styles.value}>
              {formData.capacitor?.numWithoutBpn || 0}
            </Text>
          </View>

          {renderComponentTable(
            "Capacitors",
            formData.capacitor?.withBpn,
            formData.capacitor?.withoutBpn
          )}

          {/* Inductors */}
          <Text style={[styles.subHeader, { marginTop: 15 }]}>Inductors</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Total Inductors:</Text>
            <Text style={styles.value}>
              {(formData.inductor?.numWithBpn || 0) +
                (formData.inductor?.numWithoutBpn || 0)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>With BPN:</Text>
            <Text style={styles.value}>
              {formData.inductor?.numWithBpn || 0}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Without BPN:</Text>
            <Text style={styles.value}>
              {formData.inductor?.numWithoutBpn || 0}
            </Text>
          </View>

          {renderComponentTable(
            "Inductors",
            formData.inductor?.withBpn,
            formData.inductor?.withoutBpn
          )}

          {/* Resistors */}
          <Text style={[styles.subHeader, { marginTop: 15 }]}>Resistors</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Total Resistors:</Text>
            <Text style={styles.value}>
              {(formData.resistor?.numWithBpn || 0) +
                (formData.resistor?.numWithoutBpn || 0)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>With BPN:</Text>
            <Text style={styles.value}>
              {formData.resistor?.numWithBpn || 0}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Without BPN:</Text>
            <Text style={styles.value}>
              {formData.resistor?.numWithoutBpn || 0}
            </Text>
          </View>

          {renderComponentTable(
            "Resistors",
            formData.resistor?.withBpn,
            formData.resistor?.withoutBpn
          )}

          {/* Air Coils */}
          <Text style={[styles.subHeader, { marginTop: 15 }]}>Air Coils</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Total Air Coils:</Text>
            <Text style={styles.value}>
              {(formData.airCoil?.numWithBpn || 0) +
                (formData.airCoil?.numWithoutBpn || 0)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>With BPN:</Text>
            <Text style={styles.value}>
              {formData.airCoil?.numWithBpn || 0}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Without BPN:</Text>
            <Text style={styles.value}>
              {formData.airCoil?.numWithoutBpn || 0}
            </Text>
          </View>

          {renderComponentTable(
            "Air Coils",
            formData.airCoil?.withBpn,
            formData.airCoil?.withoutBpn
          )}

          {/* Transformers */}
          <ConditionalField
            condition={formData.transformers?.numberOfTransformers > 0}
          >
            <>
              <Text style={[styles.subHeader, { marginTop: 15 }]}>
                Transformers
              </Text>
              <View style={styles.row}>
                <Text style={styles.label}>Number of Transformers:</Text>
                <Text style={styles.value}>
                  {formData.transformers?.numberOfTransformers || 0}
                </Text>
              </View>

              {formData.transformers?.transformersList?.map((tf, index) => (
                <View key={index} style={{ marginTop: 10 }}>
                  <ConditionalField condition={tf.coreType}>
                    <View style={styles.row}>
                      <Text style={styles.label}>Core Type:</Text>
                      <Text style={styles.value}>{tf.coreType}</Text>
                    </View>
                  </ConditionalField>

                  <ConditionalField condition={tf.wireType}>
                    <View style={styles.row}>
                      <Text style={styles.label}>Wire Type:</Text>
                      <Text style={styles.value}>{tf.wireType}</Text>
                    </View>
                  </ConditionalField>

                  <ConditionalField condition={tf.coreBPN?.length > 0}>
                    <View style={styles.row}>
                      <Text style={styles.label}>Core BPNs:</Text>
                      <Text style={styles.value}>
                        {tf.coreBPN?.join(", ") || "N/A"}
                      </Text>
                    </View>
                  </ConditionalField>

                  <ConditionalField condition={tf.wireGauge?.length > 0}>
                    <View style={styles.row}>
                      <Text style={styles.label}>Wire Gauges:</Text>
                      <Text style={styles.value}>
                        {tf.wireGauge?.join(", ") || "N/A"}
                      </Text>
                    </View>
                  </ConditionalField>

                  <ConditionalField condition={tf.numberOfTurns}>
                    <View style={styles.row}>
                      <Text style={styles.label}>Number of Turns:</Text>
                      <Text style={styles.value}>{tf.numberOfTurns}</Text>
                    </View>
                  </ConditionalField>
                </View>
              ))}
            </>
          </ConditionalField>
        </View>

        {/* Additional Components */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Components</Text>

          {/* Shields */}
          <ConditionalField
            condition={
              formData.shieldsList?.shieldRequired === "Yes" ||
              formData.shieldsList?.numberOfShields > 0
            }
          >
            <>
              <Text style={styles.subHeader}>Shields</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Shield Required:</Text>
                <Text style={styles.value}>
                  {formData.shieldsList?.shieldRequired || "No"}
                </Text>
              </View>

              <ConditionalField
                condition={formData.shieldsList?.numberOfShields > 0}
              >
                <View style={styles.row}>
                  <Text style={styles.label}>Number of Shields:</Text>
                  <Text style={styles.value}>
                    {formData.shieldsList?.numberOfShields || 0}
                  </Text>
                </View>

                {formData.shieldsList?.shields?.map((shield, index) => (
                  <View key={index} style={styles.row}>
                    <Text style={styles.label}>Shield {index + 1}:</Text>
                    <Text style={styles.value}>
                      {shield.partType || "N/A"} - {shield.partNumber || "N/A"}
                    </Text>
                  </View>
                ))}
              </ConditionalField>
            </>
          </ConditionalField>

          {/* Fingers */}
          <ConditionalField
            condition={
              formData.fingersList?.fingerRequired === "Yes" ||
              formData.fingersList?.numberOfFingers > 0
            }
          >
            <>
              <Text style={[styles.subHeader, { marginTop: 10 }]}>Fingers</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Finger Required:</Text>
                <Text style={styles.value}>
                  {formData.fingersList?.fingerRequired || "No"}
                </Text>
              </View>

              <ConditionalField
                condition={formData.fingersList?.numberOfFingers > 0}
              >
                <View style={styles.row}>
                  <Text style={styles.label}>Number of Fingers:</Text>
                  <Text style={styles.value}>
                    {formData.fingersList?.numberOfFingers || 0}
                  </Text>
                </View>

                {formData.fingersList?.fingers?.map((finger, index) => (
                  <View key={index} style={styles.row}>
                    <Text style={styles.label}>Finger {index + 1}:</Text>
                    <Text style={styles.value}>
                      {finger.partType || "N/A"} - {finger.partNumber || "N/A"}
                    </Text>
                  </View>
                ))}
              </ConditionalField>
            </>
          </ConditionalField>

          {/* Copper Flaps */}
          <ConditionalField
            condition={formData.cooperFlapDetails?.numberOfFlaps > 0}
          >
            <>
              <Text style={[styles.subHeader, { marginTop: 10 }]}>
                Copper Flaps
              </Text>
              <View style={styles.row}>
                <Text style={styles.label}>Number of Flaps:</Text>
                <Text style={styles.value}>
                  {formData.cooperFlapDetails?.numberOfFlaps || 0}
                </Text>
              </View>

              {formData.cooperFlapDetails?.flaps?.map((flap, index) => (
                <View key={index} style={styles.row}>
                  <Text style={styles.label}>Flap {index + 1}:</Text>
                  <Text style={styles.value}>
                    {flap.bpType || "N/A"} - {flap.bpNumber || "N/A"}
                    {(flap.length || flap.width || flap.thickness) &&
                      ` (L: ${flap.length || "N/A"}, W: ${
                        flap.width || "N/A"
                      }, T: ${flap.thickness || "N/A"})`}
                  </Text>
                </View>
              ))}
            </>
          </ConditionalField>

          {/* LTCC */}
          <ConditionalField condition={formData.ltcc?.numberOfLtcc > 0}>
            <>
              <Text style={[styles.subHeader, { marginTop: 10 }]}>
                LTCC Components
              </Text>
              <View style={styles.row}>
                <Text style={styles.label}>Number of LTCC:</Text>
                <Text style={styles.value}>
                  {formData.ltcc?.numberOfLtcc || 0}
                </Text>
              </View>

              {formData.ltcc?.ltccItems?.map((ltcc, index) => (
                <View key={index} style={styles.row}>
                  <Text style={styles.label}>LTCC {index + 1}:</Text>
                  <Text style={styles.value}>{ltcc.modelName || "N/A"}</Text>
                </View>
              ))}
            </>
          </ConditionalField>

          {/* Resonators */}
          <ConditionalField
            condition={formData.resonatorList?.numberOfResonators > 0}
          >
            <>
              <Text style={[styles.subHeader, { marginTop: 10 }]}>
                Resonators
              </Text>
              <View style={styles.row}>
                <Text style={styles.label}>Number of Resonators:</Text>
                <Text style={styles.value}>
                  {formData.resonatorList?.numberOfResonators || 0}
                </Text>
              </View>
            </>
          </ConditionalField>
        </View>

        {/* Additional Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>

          <ConditionalField condition={formData.bottomSolderMask}>
            <View style={styles.row}>
              <Text style={styles.label}>Bottom Solder Mask:</Text>
              <Text style={styles.value}>{formData.bottomSolderMask}</Text>
            </View>
          </ConditionalField>

          <ConditionalField condition={formData.halfMoonRequirement}>
            <View style={styles.row}>
              <Text style={styles.label}>Half Moon Requirement:</Text>
              <Text style={styles.value}>{formData.halfMoonRequirement}</Text>
            </View>
          </ConditionalField>

          <ConditionalField condition={formData.viaHolesRequirement}>
            <View style={styles.row}>
              <Text style={styles.label}>Via Holes Requirement:</Text>
              <Text style={styles.value}>{formData.viaHolesRequirement}</Text>
            </View>
          </ConditionalField>

          <ConditionalField condition={formData.signalLaunchType}>
            <View style={styles.row}>
              <Text style={styles.label}>Signal Launch Type:</Text>
              <Text style={styles.value}>{formData.signalLaunchType}</Text>
            </View>
          </ConditionalField>

          <ConditionalField condition={formData.coverType}>
            <View style={styles.row}>
              <Text style={styles.label}>Cover Type:</Text>
              <Text style={styles.value}>{formData.coverType}</Text>
            </View>
          </ConditionalField>

          <ConditionalField condition={formData.designRuleViolation}>
            <View style={styles.row}>
              <Text style={styles.label}>Design Rule Violation:</Text>
              <Text style={styles.value}>{formData.designRuleViolation}</Text>
            </View>
          </ConditionalField>

          <ConditionalField condition={formData.similarModel}>
            <View style={styles.row}>
              <Text style={styles.label}>Similar Model:</Text>
              <Text style={styles.value}>{formData.similarModel}</Text>
            </View>
          </ConditionalField>

          <ConditionalField condition={formData.comments}>
            <View style={styles.row}>
              <Text style={styles.label}>Comments:</Text>
              <Text style={styles.value}>{formData.comments || "N/A"}</Text>
            </View>
          </ConditionalField>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default Page21PDFDocument;

export const generatePDF = async (formData) => {
  const blob = await pdf(<Page21PDFDocument formData={formData} />).toBlob();
  const filename = `${formData.modelName || "Component"}_${
    formData.revisionNumber || "Spec"
  }.pdf`;
  saveAs(blob, filename);
};
