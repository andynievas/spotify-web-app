import { useState } from "react";

const styles = {
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "20px 0",
    // backgroundColor: "red",
  },
  input: {
    backgroundColor: "rgb(70,70,90)",
    color: "white",
    padding: "20px",
    borderRadius: "20px",
    border: "none",
  },
};

function SearchInput() {
  const [searchText, setSearchText] = useState("");

  return (
    <div style={styles.inputContainer}>
      <input style={styles.input} placeholder="Buscar..." />
    </div>
  );
}

export default SearchInput;
