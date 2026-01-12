import { useState } from "react"
import UploadZone from "./components/UploadZone"
import ControlPanel from "./components/ControlPanel"

function App() {
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(false)
    const [generatedImage, setGeneratedImage] = useState(null)

    async function handleSelect(type) {
        if (!image) return alert("Please upload an image first")

        setLoading(true)
        setResult(false)

        // fake AI delay
        await new Promise((res) => setTimeout(res, 2000))

        setLoading(false)
        setResult(true)
        setGeneratedImage(image) // mock output for now
    }

    return (
        <div className="app">
            <h1>Magic Mirror</h1>
            <p>Upload an image and transform it ✨</p>

            <UploadZone onUpload={setImage} />
            <ControlPanel onSelect={handleSelect} />

            {loading && <p>Generating...</p>}

            {result && (
                <div className="result">
                    <div>
                        <p>Original</p>
                        <img src={image} alt="Original" />
                    </div>

                    <div>
                        <p>Result</p>
                        <img
                            src={generatedImage}
                            alt="Result"
                            className="generated"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
