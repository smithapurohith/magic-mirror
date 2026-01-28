# 🪞 Magic Mirror – The Māyā of Perception

**Magic Mirror** is an AI-powered interactive system that demonstrates how **identity remains constant while appearances change**, inspired by both **Generative AI** and the **philosophical concepts of Māyā and Self (Ātman)** described in the *Sri Dakshinamurthy Stotram*.

This project bridges **Computer Science, Artificial Intelligence, and Indian philosophy**, showing how modern AI systems echo ancient insights about perception, illusion, and reality.

---

## 📌 Project Overview

The Magic Mirror captures a **live webcam image**, converts it into a **privacy-preserving avatar**, and uses **Generative AI** to simulate transformations such as:

- Changes across **age** (Time Travel)
- Changes in **external identity** (Career / Role)
- Controlled visual variations

Despite these transformations, the **core identity remains unchanged**, highlighting the illusion of change — *Māyā*.

---

## 🧠 Philosophical Foundation

This project is inspired by **Sri Dakshinamurthy Stotram – Shlokas 7 & 8**, which describe how:

- The same self appears as **childhood, youth, and old age**
- Differences are **perceived**, not **real**
- Reality is misunderstood due to **limited perception**

### Relevant Shloka (Conceptual Reference)

> **“Bālyādiṣvapi jāgradādiṣu tathā sarvāsvavasthāsvapi…”**  
>  
> The same consciousness appears as child, youth, and old age,  
> yet remains unchanged — perception alone creates difference.

In this project:
- **Captured image** → perceived self  
- **Avatar** → abstraction of identity  
- **AI-generated result** → Māyā (illusion of transformation)

---

## ⚙️ Scientific Working Principle (Simplified)

### 1. Latent Space Transformation (Generative AI)
- The AI maps a face into a **high-dimensional latent space**
- Prompts (age / role) shift the position within this space
- The **structure remains**, while **appearance changes**

### 2. Avatar-Based Processing
- Raw webcam images are **not directly sent** to the AI
- A stylized avatar is generated first for:
  - Privacy
  - Ethical safety
  - Identity abstraction

### 3. Perception vs Reality
- Multiple outputs arise from the same source image
- Demonstrates how **external change ≠ internal change**

---

## 🏗️ System Architecture

### Frontend (React + Vite)
- Live webcam capture
- Avatar preview
- Button-based interaction (Time Travel, Career Switch, Wildcard)
- Displays AI-generated results

### Backend (Flask + Gemini API)
- Receives avatar + prompt
- Calls **Nano Banana API (gemini-3-pro-image-preview)**
- Returns AI-generated image or description

---

## 🧪 Workflow

1. User opens the Magic Mirror
2. Webcam captures live image
3. Image is converted into an avatar
4. Avatar + predefined prompt sent to backend
5. AI generates transformed output
6. Result is displayed to the user

---

## 🔐 Privacy & Ethics

- No raw face images are stored
- Avatar abstraction ensures anonymity
- Demonstrates **responsible AI usage**

---

## 🚀 Technologies Used

- **Frontend:** React, Vite, JavaScript
- **Backend:** Python, Flask, Flask-CORS
- **AI Model:** Gemini Nano Banana API (`gemini-3-pro-image-preview`)
- **Computer Vision:** Webcam + Canvas
- **Philosophy:** Sri Dakshinamurthy Stotram

---

## 🎯 Key Takeaway

> What changes is not *who you are*,  
> but *how you are perceived*.

Magic Mirror shows that both **AI systems** and **human perception** operate within constraints — mistaking appearance for reality.

---

## 👩‍💻 Author

**Smitha Purohith**  
Jyothy Institute of Technology  

---

## 📜 Acknowledgements

- *Sri Adi Shankaracharya* – Dakshinamurthy Stotram  
- Google Gemini AI  
- Jyothy Institute of Technology  

---

🪷 *Tat Tvam Asi* — That Thou Art
