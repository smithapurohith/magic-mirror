import { useRef, forwardRef, useImperativeHandle } from "react"
import Webcam from "react-webcam"

const WebcamCapture = forwardRef((props, ref) => {
    const webcamRef = useRef(null)

    useImperativeHandle(ref, () => ({
        capture() {
            console.log("📸 capture() called")
            const imageSrc = webcamRef.current.getScreenshot()
            console.log("🖼️ screenshot:", imageSrc)
            return imageSrc
        }
    }))

    return (
        <div>
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "user" }}
            />
        </div>
    )
})

export default WebcamCapture
