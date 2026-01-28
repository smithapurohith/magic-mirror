import { useRef, useState } from "react"
import WebcamCapture from "./components/WebcamCapture"
import ControlPanel from "./components/ControlPanel"

function App() {
    const webcamRef = useRef(null)
    const [capturedImage, setCapturedImage] = useState(null)
    const [images, setImages] = useState({})
    const [loading, setLoading] = useState(false)
    const [mode, setMode] = useState(null)
    const [userInput, setUserInput] = useState("")

    // Recognizer States
    const [recogFiles, setRecogFiles] = useState([])
    const [recogResult, setRecogResult] = useState("")

    // Tattva Questions Mapping
    const tattvaMap = {
        "TIME_TRAVEL": {
            sa: "देहं गच्छति वपुः परिवर्तते, कस्त्वं यः स्थिरः तिष्ठति?",
            en: "The body ages and the form changes; who are you that remains constant?"
        },
        "CAREER_SWITCH": {
            sa: "अनेकानि रूपाणि एकः आत्मा, कः अयं यो विविधासु अवस्थासु अनुवर्तते?",
            en: "Many forms, one Soul; who is this that persists through all these different states?"
        },
        "OUT_OF_THE_BOX": {
            sa: "दर्पणदृश्यमाननगरीतुल्यं विश्वं, किं पश्यसि - बिम्बं वा मायाम्?",
            en: "The world is like a city seen in a mirror; what do you see—the Reality or the Illusion?"
        }
    };

    const downloadImage = (base64Data, filename) => {
        const link = document.createElement("a");
        link.href = base64Data;
        link.download = filename;
        link.click();
    };

    async function handleSelect(selectedMode) {
        setMode(selectedMode)
        setImages({})
        setUserInput("")
        setRecogResult("")
        setRecogFiles([])

        if (selectedMode !== "RECOGNIZER") {
            if (!webcamRef.current) return
            const imageSrc = webcamRef.current.capture()
            setCapturedImage(imageSrc)
            if (selectedMode === "TIME_TRAVEL") {
                setLoading(true)
                await fetchData({ image: imageSrc, mode: "TIME_TRAVEL" })
                setLoading(false)
            }
        }
    }

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length < 2 || files.length > 4) {
            alert("Please upload between 2 and 4 images.");
            return;
        }
        const readers = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });
        Promise.all(readers).then(setRecogFiles);
    };

    const runRecognizer = async () => {
        setLoading(true)
        try {
            const response = await fetch("http://localhost:5000/recognize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ images: recogFiles })
            })
            const result = await response.json()
            setRecogResult(result.conclusion)
        } catch (err) { console.error(err) }
        setLoading(false)
    }

    async function fetchData(payload) {
        try {
            const response = await fetch("http://localhost:5000/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            const result = await response.json()
            setImages(result)
        } catch (err) { console.error("API Error:", err) }
    }

    const triggerGeneration = async () => {
        setLoading(true)
        await fetchData({ image: capturedImage, mode: mode, userInput: userInput })
        setLoading(false)
    }

    return (
        <div style={{ padding: "40px", textAlign: "center", background: "#0f172a", color: "white", minHeight: "100vh", fontFamily: "sans-serif" }}>

            {/* Added style block to ensure mirrored view for webcam and results */}
            <style>
                {`
                    video, canvas, .mirrored-image {
                        transform: scaleX(-1);
                        -webkit-transform: scaleX(-1);
                    }
                `}
            </style>

            <h1 style={{ letterSpacing: "2px", color: "#fbbf24" }}>MAGIC MIRROR🪞</h1>
            <WebcamCapture ref={webcamRef} />
            <ControlPanel onSelect={handleSelect} />

            {mode === "RECOGNIZER" && (
                <div style={{ margin: "20px" }}>
                    <input type="file" multiple accept="image/*" onChange={handleFileUpload} style={{ color: "#fbbf24" }} />
                    <button onClick={runRecognizer} style={{ padding: "12px 25px", marginLeft: "10px", borderRadius: "8px", cursor: "pointer", border: "none", backgroundColor: "#38bdf8", color: "#0f172a", fontWeight: "bold" }}>IDENTIFY</button>
                    {recogResult && <h2 style={{ marginTop: "20px", color: "#fbbf24" }}>{recogResult}</h2>}
                </div>
            )}

            {(mode === "CAREER_SWITCH" || mode === "OUT_OF_THE_BOX") && !images.wildcard && !images.career && (
                <div style={{ margin: "20px" }}>
                    <input
                        style={{ padding: "12px", borderRadius: "8px", border: "none", width: "400px", fontSize: "1rem" }}
                        placeholder={mode === "OUT_OF_THE_BOX" ? "Enter your creative idea..." : "Enter a profession..."}
                        onKeyDown={(e) => e.key === 'Enter' && triggerGeneration()}
                        onChange={(e) => setUserInput(e.target.value)}
                        value={userInput}
                    />
                    <button onClick={triggerGeneration} style={{ padding: "12px 25px", marginLeft: "10px", borderRadius: "8px", cursor: "pointer", border: "none", backgroundColor: "#38bdf8", color: "#0f172a", fontWeight: "bold" }}>GO</button>
                </div>
            )}

            {/* Tattva Loading Section */}
            {loading && mode && tattvaMap[mode] && (
                <div style={{ margin: "30px auto", padding: "20px", maxWidth: "800px", border: "2px solid #fbbf24", borderRadius: "15px", backgroundColor: "rgba(251, 191, 36, 0.05)" }}>
                    <h2 style={{ color: "#fbbf24", fontStyle: "italic", marginBottom: "12px", fontSize: "1.5rem" }}>{tattvaMap[mode].sa}</h2>
                    <h3 style={{ color: "#e2e8f0", fontWeight: "400", fontSize: "1.2rem" }}>{tattvaMap[mode].en}</h3>
                </div>
            )}

            <div style={{ display: "flex", justifyContent: "center", gap: "50px", marginTop: "40px" }}>
                {capturedImage && (
                    <div style={{ position: "relative" }}>
                        <h3 style={{ color: "#fbbf24" }}>ORIGINAL PHOTO</h3>
                        <img src={capturedImage} className="mirrored-image" width="350" style={{ borderRadius: "12px", border: "2px solid #334155" }} />
                        <button onClick={() => downloadImage(capturedImage, "captured.jpg")} style={{ display: "block", margin: "10px auto", padding: "5px 10px", cursor: "pointer", borderRadius: "5px", border: "none", backgroundColor: "#fbbf24" }}>Download</button>
                    </div>
                )}
                {images.avatar && (
                    <div style={{ position: "relative" }}>
                        <h3 style={{ color: "#fbbf24" }}>Avatar</h3>
                        <img src={images.avatar} className="mirrored-image" width="350" style={{ borderRadius: "12px", border: "4px solid #fbbf24" }} />
                        <button onClick={() => downloadImage(images.avatar, "avatar.jpg")} style={{ display: "block", margin: "10px auto", padding: "5px 10px", cursor: "pointer", borderRadius: "5px", border: "none", backgroundColor: "#fbbf24" }}>Download</button>
                    </div>
                )}
            </div>

            {mode === "TIME_TRAVEL" && (images.baby || images.teenager || images.middle_aged || images.old_aged) && (
                <div style={{ marginTop: "50px", borderTop: "1px solid #fbbf24", paddingTop: "40px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", padding: "0 40px" }}>
                        {["baby", "teenager", "middle-aged", "old-aged"].map(k => images[k] && (
                            <div key={k}>
                                <h3 style={{ fontSize: "0.9rem", color: "#fbbf24", textTransform: "uppercase" }}>{k}</h3>
                                <img src={images[k]} className="mirrored-image" width="100%" style={{ borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.5)" }} />
                                <button onClick={() => downloadImage(images[k], `${k}.jpg`)} style={{ margin: "10px auto", padding: "5px 10px", cursor: "pointer", borderRadius: "5px", border: "none", backgroundColor: "#fbbf24", width: "100%" }}>Download</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {(images.career || images.wildcard) && (
                <div style={{ marginTop: "50px" }}>
                    <h3 style={{ textTransform: "uppercase", color: "#fbbf24" }}>TRANSFORMATION: {userInput}</h3>
                    <img src={images.career || images.wildcard} className="mirrored-image" width="550" style={{ borderRadius: "20px", border: "5px solid #fbbf24" }} />
                    <button onClick={() => downloadImage(images.career || images.wildcard, "transformation.jpg")} style={{ display: "block", margin: "10px auto", padding: "10px 20px", cursor: "pointer", borderRadius: "5px", border: "none", backgroundColor: "#fbbf24" }}>Download Transformation</button>
                </div>
            )}
        </div>
    )
}

export default App
