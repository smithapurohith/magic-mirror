function ResultView({ images }) {
    if (!images || images.length === 0) {
        return null
    }

    return (
        <div>
            <h3>Results</h3>
            <div style={{ display: "flex", gap: "10px" }}>
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`result-${index}`}
                        style={{ width: "200px" }}
                    />
                ))}
            </div>
        </div>
    )
}

export default ResultView
