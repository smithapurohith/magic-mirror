import os
import cv2
import base64
import numpy as np
import torch
from openai import OpenAI
from torchvision.transforms import Compose, Resize, ToTensor, Normalize
from dotenv import load_dotenv
from pathlib import Path
from io import BytesIO
from google import genai
from google.genai import types
from PIL import Image


# 0. Load environment variables

load_dotenv()


# 1. Initialize the client

client = genai.Client(api_key=os.getenv("OPENAI_API_KEY"))


# 2. Define the model ID
model_id = "gemini-3-pro-image-preview"


# 3. Generate the content
# media_resolution_ultra_high triggers the 4K output for Nano Banana Pro
response = client.models.generate_content(
    model=model_id,
    contents="A futuristic space station orbiting a purple nebula, highly detailed, 8k wallpaper",
    config=types.GenerateContentConfig(
        response_modalities=["IMAGE"],
        image_config=types.ImageConfig(
            aspect_ratio="16:9"
        )
    )
)


# 4. Extract and save the image
# We loop through parts, though usually there is only one for a single prompt
for part in response.parts:
    if part.inline_data:
        image = part.as_image()
        image.save("nano_banana_output.png")
        print("Image successfully saved to nano_banana_output.png")
        image.show()

