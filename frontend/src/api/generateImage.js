export async function generateImage(image, prompt) {
    console.log("🧠 Sending avatar to backend...")

    const res = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            image,
            prompt,
        }),
    })

    const data = await res.json()
    console.log("✅ Backend response:", data)

    return data.image
}
