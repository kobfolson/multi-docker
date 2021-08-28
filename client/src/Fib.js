import React, { useState, useEffect } from "react";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, [index]);

  const fetchValues = async () => {
    const _values = await fetch("/api/values/current");
    const response = await _values.json();
    setValues(response);
  };

  const fetchIndexes = async () => {
    const _seenIndexes = await fetch("/api/values/all");
    const response = await _seenIndexes.json();
    setSeenIndexes(response);
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];
    let idx = 1;

    for (let key in values) {
      entries.push(
        <div key={idx} style={containerItem}>
          <div style={alignElToLeft}>
            <p>
              Fib value for {key} is {values[key]}
            </p>
          </div>
        </div>
      );

      idx++;
    }

    return entries;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index: index }),
    };

    await fetch("/api/values", options);
    setIndex("");
  };

  return (
    <div style={divStyle}>
      <form onSubmit={handleSubmit}>
        <div style={alignElToLeft}>
          <label>Enter Number</label>
        </div>
        <div style={inputDivStyle}>
          <input
            value={index}
            style={inputStyle}
            onChange={(event) => setIndex(event.target.value)}
          />
        </div>
        <button style={btnStyle}>Submit</button>
      </form>
      <div style={alignElToLeft}>
        <h3>Seen Indexes</h3>
      </div>
      <div style={alignElToLeft}>{renderSeenIndexes()}</div>

      <div style={alignElToLeft}>
        <h3>Calculated Values</h3>
      </div>
      <div style={contatinerStyle}>{renderValues()}</div>
    </div>
  );
};

const divStyle = {
  padding: "10px",
  width: "300px",
  margin: "auto",
};

const inputDivStyle = {
  display: "flex",
  justifyContent: "flex-start",
};

const alignElToLeft = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  marginBottom: "10px",
};

const inputStyle = {
  borderRadius: "5px",
  border: "none",
  height: "20px",
  width: "100%",
  padding: "10px 15px",
  outline: "none",
  backgroundColor: "#FAFAFA",
};

const btnStyle = {
  backgroundColor: "#282C34",
  color: "white",
  border: "1px solid #282C34",
  borderRadius: "5px",
  marginTop: "15px",
  height: "40px",
  padding: "auto",
  width: "100%",
};

const contatinerStyle = {
  borderRadius: "5px",
  backgroundColor: "#FAFAFA",
  overflow: "auto",
  scrollbarWidth: "none",
  height: "200px",
};

const containerItem = {
  borderBottom: "1px solid grey",
  paddingLeft: "10px",
};

export default Fib;
