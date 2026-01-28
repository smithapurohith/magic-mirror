function ControlPanel({ onSelect }) {
    const btnBase = {
        padding: "15px 0",
        fontSize: "1.1rem",
        fontWeight: "bold",
        borderRadius: "50px",
        border: "none",
        cursor: "pointer",
        textTransform: "uppercase",
        transition: "0.3s",
        margin: "10px",
        width: "240px", // Adjusted width to fit 4 buttons nicely
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px"
    };

    return (
        <div style={{ margin: "30px 0", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ ...btnBase, backgroundColor: "#fbbf24", color: "#0f172a" }} onClick={() => onSelect("TIME_TRAVEL")}>🚀 Time Travel</button>
            <button style={{ ...btnBase, backgroundColor: "#fbbf24", color: "#0f172a" }} onClick={() => onSelect("CAREER_SWITCH")}>💼 Career Switch</button>
            <button style={{ ...btnBase, backgroundColor: "#fbbf24", color: "#0f172a" }} onClick={() => onSelect("OUT_OF_THE_BOX")}>🎨 Out of the Box</button>
            <button style={{ ...btnBase, backgroundColor: "#fbbf24", color: "#0f172a" }} onClick={() => onSelect("RECOGNIZER")}>🔍 Recognizer</button>
        </div>
    )
}

export default ControlPanel