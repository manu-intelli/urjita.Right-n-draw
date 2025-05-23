function AccessDenied() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent dark overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: 20,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: "40px 30px",
          maxWidth: 400,
          width: "90%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          textAlign: "center",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h1 style={{ color: "#D32F2F", marginBottom: 16 }}>Access Denied</h1>
        <p style={{ fontSize: 16, color: "#555" }}>
          You do not have permission to view this page.
        </p>
      </div>
    </div>
  );
}

export default AccessDenied;
