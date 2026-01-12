function ControlPanel({ onSelect }) {
    return (
        <div className="controls">
            <button onClick={() => onSelect("Time Travel")}>
                Time Travel
            </button>

            <button onClick={() => onSelect("Career Switch")}>
                Career Switch
            </button>

            <button onClick={() => onSelect("Wildcard")}>
                Wildcard
            </button>
        </div>
    )
}

export default ControlPanel
