const styles = {
  appContent: {
    backgroundColor: "#282c34",
    height: "100vh",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    color: "white",
  },
};

function AppContent({ children }) {
  return <div style={styles.appContent}>{children}</div>;
}

export default AppContent;
