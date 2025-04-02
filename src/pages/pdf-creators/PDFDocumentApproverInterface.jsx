import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { BASIC_KEY_LABEL } from "../../constants";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 15,
    borderBottom: "1pt solid #94a3b8",
    paddingBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e40af",
  },
  subtitle: {
    marginTop: 3,
    marginBottom: 3,
    fontSize: 8,
    color: "#64748b",
  },
  metadata: {
    fontSize: 8,
    color: "#64748b",
    marginTop: 4,
    marginBottom: 4,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "#f1f5f9",
    padding: 4,
    marginBottom: 5,
  },
  infoGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoItem: {
    width: "50%",
    paddingRight: 10,
    marginBottom: 3,
  },
  infoRow: {
    flexDirection: "row",
    fontSize: 8,
    padding: "4px 0",
  },
  resultItem: {
    marginBottom: 5,
    padding: 4,
    borderRadius: 2,
  },
  deviatedItem: {
    backgroundColor: "#fef2f2",
    marginBottom: 4,
    padding: 4,
  },
  itemName: {
    maxWidth: "40%", // Ensures correct layout
    fontSize: 10,
    fontWeight: "bold",
    flexShrink: 1, // Prevents overflow
  },
  itemValue: {
    fontSize: 9,
    color: "#374151",
    flexGrow: 1, // Ensures it takes remaining space
    maxWidth: "50%", // Ensures correct layout
  },
  status: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 4,
  },
  statusApproved: {
    color: "#16a34a",
  },
  statusRejected: {
    color: "#dc2626",
  },
  comments: {
    fontSize: 8,
    color: "#4b5563",
    marginTop: 2,
    fontStyle: "italic",
    flexWrap: "wrap",
  },
  pageNumber: {
    position: "absolute",
    bottom: 10,
    right: 20,
    fontSize: 8,
    color: "#94a3b8",
  },
  compliantItem: {
    backgroundColor: "#f0fdf4",
    marginBottom: 4,
    padding: 4,
  },
});

const PDFDocumentApproverInterface = ({
  formData,
  templateData,
  actionType,
  userEmail,
}) => {
  const timestamp = new Date().toLocaleString();
  const component = JSON.parse(localStorage.getItem("components")).find(
    (comp) => comp.id == formData.component
  ).component_name;

  const compDescription = JSON.parse(localStorage.getItem("components")).find(
    (comp) => comp.id == formData.component
  ).description;

  // Add null checks and default to empty arrays if data is missing
  const deviatedDesignFields =
    templateData?.verify_design_fields_data?.filter(
      (field) => field.is_deviated
    ) || [];

  const deviatedQueryData =
    templateData?.verified_query_data?.filter((field) => field.is_deviated) ||
    [];

  const compliantDesignFields =
    templateData?.verify_design_fields_data?.filter(
      (field) => !field.is_deviated
    ) || [];

  const compliantQueryData =
    templateData?.verified_query_data?.filter((field) => !field.is_deviated) ||
    [];

  // Create a filtered version of formData without comments
  const basicInfo = {
    oppNumber: formData?.oppNumber || "",
    opuNumber: formData?.opuNumber || "",
    eduNumber: formData?.eduNumber || "",
    modelName: formData?.modelName || "",
    partNumber: formData?.partNumber || "",
    revisionNumber: formData?.revisionNumber || "",
    component: formData?.component || "",
    ...(actionType === "approved"
      ? { approvalComment: formData?.approvalComment || "No comment provided" }
      : {
          rejectionComment: formData?.rejectionComment || "No comment provided",
        }),
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{compDescription} Approval Report</Text>
          <Text style={styles.subtitle}>Generated on {timestamp}</Text>
          <Text style={styles.metadata}>
            {actionType === "approved" ? "Approved By: " : "Rejected By: "}
            {userEmail}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.infoGrid}>
            {Object.entries(basicInfo).map(([key, value]) => (
              <View key={key} style={styles.infoItem}>
                <View style={styles.infoRow}>
                  <Text style={styles.itemName}>{BASIC_KEY_LABEL[key]}: </Text>
                  <Text style={styles.itemValue}>
                    {key.toLowerCase() === "component"
                      ? `${component} (${compDescription})`
                      : value}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {(deviatedDesignFields.length > 0 || deviatedQueryData.length > 0) && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: "#dc2626" }]}>
              Deviated Fields
            </Text>

            {deviatedDesignFields.length > 0 && (
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={[
                    styles.itemName,
                    { marginBottom: 4, color: "#dc2626" },
                  ]}
                >
                  Design Fields
                </Text>
                {deviatedDesignFields.map((field) => (
                  <View key={field.categor_id} style={styles.deviatedItem}>
                    <Text style={styles.itemName}>{field.name}</Text>
                    <Text style={styles.itemValue}>
                      Selected Value: {field.selected_deviation_name || "N/A"}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {deviatedQueryData.length > 0 && (
              <View>
                <Text
                  style={[
                    styles.itemName,
                    { marginBottom: 4, color: "#dc2626" },
                  ]}
                >
                  Query Data
                </Text>
                {deviatedQueryData.map((field) => (
                  <View key={field.id} style={styles.deviatedItem}>
                    <Text style={styles.itemName}>{field.name}</Text>
                    <Text style={styles.itemValue}>
                      Value: {field.value || "N/A"}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {(compliantDesignFields.length > 0 ||
          compliantQueryData.length > 0) && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: "#16a34a" }]}>
              Compliant Fields
            </Text>

            {compliantDesignFields.length > 0 && (
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={[
                    styles.itemName,
                    { marginBottom: 4, color: "#16a34a" },
                  ]}
                >
                  Design Fields
                </Text>
                {compliantDesignFields.map((field) => (
                  <View key={field.categor_id} style={styles.compliantItem}>
                    <Text style={styles.itemName}>{field.name}</Text>
                    <Text style={styles.itemValue}>
                      Selected Value: {field.selected_deviation_name || "N/A"}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {compliantQueryData.length > 0 && (
              <View>
                <Text
                  style={[
                    styles.itemName,
                    { marginBottom: 4, color: "#16a34a" },
                  ]}
                >
                  Query Data
                </Text>
                {compliantQueryData.map((field) => (
                  <View key={field.id} style={styles.compliantItem}>
                    <Text style={styles.itemName}>{field.name}</Text>
                    <Text style={styles.itemValue}>
                      Value: {field.value || "N/A"}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Review Decision</Text>
          <Text
            style={[
              styles.status,
              actionType === "approved"
                ? styles.statusApproved
                : styles.statusRejected,
            ]}
          >
            Status: {(actionType || "").toUpperCase()}
          </Text>
          <Text style={styles.comments}>
            Comments:{" "}
            {
              basicInfo[
                actionType === "approved"
                  ? "approvalComment"
                  : "rejectionComment"
              ]
            }
          </Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

const generatePDF = async (
  formData,
  templateData,
  actionType,
  userEmail,
  selectedComponent
) => {
  const blob = await pdf(
    <PDFDocumentApproverInterface
      formData={formData}
      templateData={templateData}
      actionType={actionType}
      userEmail={userEmail}
    />
  ).toBlob();
  saveAs(
    blob,
    `${selectedComponent}_${
      actionType === "approved" ? "Approved" : "Rejected"
    }_${formData.partNumber}_${formData.revisionNumber}.pdf`
  );
};

export default generatePDF;
