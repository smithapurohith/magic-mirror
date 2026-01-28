from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from pathlib import Path
import os
import base64
import concurrent.futures

from google import genai
from google.genai import types

load_dotenv(dotenv_path=Path(__file__).parent / ".env")
app = Flask(__name__)
CORS(app)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def call_gemini_api(image_bytes, task_type, custom_text=None):
    # Prompts remain identical as per your current working version
    AVATAR_PROMPT = (
        "Generate a professional, realistic digital 2D illustration of the person in the reference image. "
        "The face, hair, and clothing must be an exact likeness of the original photo. No frames, no circles, "
        "and no borders. Use the original room background from the photo, but apply a 40% blur (bokeh effect). "
        "High-definition, sharp details, realistic textures, and natural lighting."
    )

    prompts = {
        "avatar": AVATAR_PROMPT,
        "baby": "Generate a hyper-realistic 2D illustration of the person from the reference image as a 2-year-old toddler. Maintain the exact eye shape, eye color, nasal bridge structure, and beauty marks. Adapt the face to have youthful roundness and soft skin textures. Ensure the ethnicity and lighting match the reference. Background: original room with 40% blur.",
        "teenager": "Generate a hyper-realistic 2D illustration of the person from the reference image as a 15-year-old. Maintain the exact eye shape, lip bow shape, ear attachment points, and moles. Adjust facial proportions for puberty while keeping the original ethnicity and hair color. Background: original room with 40% blur.",
        "middle-aged": "Generate a hyper-realistic 2D illustration of the person from the reference image as a 50-year-old. Maintain the exact eye shape, cheekbone structure, nasal bridge, and eye color. Add subtle expression lines and realistic skin maturity consistent with their specific ethnicity. Background: original room with 40% blur.",
        "old-aged": "Generate a hyper-realistic 2D illustration of the person from the reference image as an 80-year-old. Maintain the exact eye positioning, lip bow shape, and beauty marks. Incorporate realistic thinning hair, silvering, and deep-set wrinkles while preserving the original facial structure and ethnic features. Background: original room with 40% blur.",
        "career": f"{AVATAR_PROMPT} Adapt the attire to be professional {custom_text} clothing while maintaining the 2D illustration style.",
        "wildcard": f"{AVATAR_PROMPT} Creative transformation into a {custom_text} while keeping 2D realistic textures and 40% background blur."
    }

    try:
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview", # Optimized for speed
            contents=[
                types.Part.from_text(text=prompts[task_type]),
                types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg")
            ],
            config=types.GenerateContentConfig(response_modalities=["IMAGE"])
        )
        for part in response.candidates[0].content.parts:
            if part.inline_data:
                return task_type, base64.b64encode(part.inline_data.data).decode('utf-8')
    except Exception as e:
        print(f"Error in {task_type}: {e}")
    return task_type, None

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    image_base64 = data.get("image")
    mode = data.get("mode")
    user_input = data.get("userInput")
    image_bytes = base64.b64decode(image_base64.split(",")[1])
    results = {}
    
    if mode == "TIME_TRAVEL":
        task_list = [("avatar", None), ("baby", None), ("teenager", None), ("middle-aged", None), ("old-aged", None)]
    elif mode == "CAREER_SWITCH":
        task_list = [("avatar", None), ("career", user_input)]
    else: 
        task_list = [("avatar", None), ("wildcard", user_input)]

    # Concurrency ensures all images are requested simultaneously for <10s completion
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        futures = [executor.submit(call_gemini_api, image_bytes, t[0], t[1]) for t in task_list]
        for f in concurrent.futures.as_completed(futures):
            key, img = f.result()
            if img: results[key] = f"data:image/jpeg;base64,{img}"
    return jsonify(results)

@app.route("/recognize", methods=["POST"])
def recognize():
    data = request.json
    images = data.get("images", []) # List of base64 strings
    
   # Balanced Forensic Prompt
    recog_prompt = (
        "SYSTEM INSTRUCTION: You are a biometric forensic expert. Your goal is to identify if the images represent the SAME BIOLOGICAL INDIVIDUAL. "
        "The images may include AI-generated age transformations (toddler, elderly) or variations in webcam lighting/quality. "
        "\n\nIDENTITY VERIFICATION STEPS:"
        "\n1. IDENTIFY THE ANCHORS: Look at the interpupillary distance, the specific slope of the nasal bridge, and the attachment point of the earlobes. These must match. "
        "\n2. ALLOW FOR NOISE: Ignore differences caused by camera resolution, lighting, skin wrinkles, or AI-style textures. Focus on the underlying bone structure."
        "\n3. FAMILY VS. SELF: While family members share features, look for the 'Unique Signature.' Check for exact mole placement or the specific shape of the Cupid's bow. If these are identical, it is the same person."
        "\n4. FINAL DECISION: If the core skeletal proportions match (even if one is a baby and one is old), respond 'Yes!'. If the bone structure proportions differ (like mother vs. daughter), respond 'No!'."
        "\n\nRespond ONLY with: 'Yes! The images are of the same person.' or 'No! The images are not of the same person.'"
    )
    content_parts = [recog_prompt]
    
    for img_b64 in images:
        img_bytes = base64.b64decode(img_b64.split(",")[1])
        content_parts.append(types.Part.from_bytes(data=img_bytes, mime_type="image/jpeg"))

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash", # Use Flash for fastest recognition (<2s)
            contents=content_parts
        )
        return jsonify({"conclusion": response.text.strip()})
    except Exception as e:
        return jsonify({"conclusion": "Error processing images."}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)