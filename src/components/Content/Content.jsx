const styles = {
  appContent: {
    flex: 1,
    backgroundColor: "rgba(200,100,100,0.3)",
  },
  results: {
    display: "flex",
  },
  template: {
    backgroundColor: "rgba(200,100,100,0.3)",
    borderRadius: "20px",
    width: "150px",
    height: "150px",
    margin: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

function Template({ text }) {
  return <div style={styles.template}>{text}</div>;
}

function Content() {
  return (
    <div style={styles.appContent}>
      <div style={styles.results}>
        {[1, 2, 3].map((num) => (
          <Template text={num} key={num} />
        ))}
      </div>
    </div>
  );
}

export default Content;
