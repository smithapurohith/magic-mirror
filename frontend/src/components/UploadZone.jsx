function UploadZone({ onUpload }) {
    function handleImageUpload(e) {
        const file = e.target.files[0]
        if (file) {
            onUpload(URL.createObjectURL(file))
        }
    }

    return (
        <div className="upload-box">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <p>Click to upload an image</p>
        </div>
    )
}

export default UploadZone
