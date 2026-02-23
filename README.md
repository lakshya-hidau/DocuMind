<div align="center">
  <img src="DocuMind.png" alt="DocuMind Logo" width="200"/>

  <h1>DocuMind — AI Document Q&A System</h1>
  <p>
    A full-stack RAG (Retrieval-Augmented Generation) application that lets you chat with any document, URL, or raw text using HuggingFace LLMs.
  </p>

  <p>
    <img src="https://img.shields.io/badge/Python-3.11-blue?logo=python" />
    <img src="https://img.shields.io/badge/FastAPI-0.109+-green?logo=fastapi" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
    <img src="https://img.shields.io/badge/Vite-7-purple?logo=vite" />
    <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker" />
    <img src="https://img.shields.io/badge/LLM-LLaMA_3.2-orange?logo=meta" />
  </p>
</div>

---

## ✨ Features

- 📄 **Upload PDF, DOCX, or TXT** files
- 🌐 **Scrape any URL** and chat with its content  
- 📝 **Paste raw text** directly
- 🤖 **Streaming AI responses** via LLaMA 3.2 (HuggingFace Inference API)
- ⚡ **FAISS vector store** for fast semantic search
- 🎨 **Beautiful React + Tailwind UI** with animations

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│           React + Vite Frontend          │
│  DocumentUpload → ChatInterface          │
│  (Tailwind + Framer Motion)              │
└────────────────────┬────────────────────┘
                     │  HTTP / Streaming
┌────────────────────▼────────────────────┐
│          FastAPI Backend (Python)        │
│  /process/file  /process/url            │
│  /process/text  /chat/stream  /health   │
└────────────────────┬────────────────────┘
                     │
         ┌───────────┴──────────┐
         ▼                      ▼
   FAISS Vector Store    HuggingFace API
   (In-Memory, per        LLaMA 3.2-1B
    session)              all-MiniLM-L6
```

---

## 🚀 Quick Start — Local Development (No Docker)

### 1. Clone the repo

```bash
git clone https://github.com/lakshya-hidau/DocuMind---AI-Document-Q-A-System.git
cd DocuMind---AI-Document-Q-A-System
```

### 2. Set up the backend

```bash
# Create and activate a virtual environment
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r backend/requirements.txt

# Add your HuggingFace API token
copy backend\.env.example backend\.env
# Edit backend\.env and set HUGGINGFACE_API_TOKEN=hf_your_token_here
```

### 3. Run the backend

```bash
# Run from project root
uvicorn backend.main:app --reload --port 8000
```

✅ API is live at: http://localhost:8000  
✅ Docs at: http://localhost:8000/docs

### 4. Set up the frontend

```bash
cd frontend
npm install
# .env is already configured for localhost:8000
npm run dev
```

✅ App is live at: http://localhost:5173

---

## 🐳 Docker — Local Backend Only

Useful if you don't want to install Python locally.

```bash
# Runs only the backend in Docker; run frontend via npm run dev
docker-compose up --build
```

---

## 🚢 Production Deployment (Docker)

Runs the full stack (backend + nginx frontend) in containers.

### 1. Configure production environment variables

```bash
copy .env.example .env
# Edit .env:
#   VITE_API_URL=https://your-api-domain.com
#   FRONTEND_ORIGIN=https://your-frontend-domain.com

copy backend\.env.example backend\.env
# Edit backend\.env with your real HUGGINGFACE_API_TOKEN and ALLOWED_ORIGINS
```

### 2. Deploy

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

✅ Frontend live at: http://your-server-ip (port 80)  
✅ Backend health: http://your-server-ip:8001/health

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|---|---|---|
| `HUGGINGFACE_API_TOKEN` | ✅ Yes | Your HuggingFace API token |
| `USER_AGENT` | No | HTTP user agent for web scraping (default: `DocuMind/1.0`) |
| `ALLOWED_ORIGINS` | No | Comma-separated CORS origins (default: `*`) |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | ✅ Yes | Full URL of the backend API |

---

## 📁 Project Structure

```
DocuMind/
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── rag_engine.py        # RAG pipeline (FAISS + LangChain + HuggingFace)
│   ├── requirements.txt     # Python dependencies
│   ├── .env                 # 🔒 Your secrets (gitignored)
│   └── .env.example         # Template for secrets
├── frontend/
│   ├── src/
│   │   ├── config.ts        # Central API_BASE config
│   │   ├── components/      # React components
│   │   └── ...
│   ├── .env                 # Local dev API URL
│   ├── .env.production      # Production API URL placeholder
│   └── vite.config.ts       # Vite config with dev proxy
├── Dockerfile               # Backend container
├── Dockerfile.frontend      # Frontend (nginx) multi-stage container
├── nginx.conf               # Nginx config for production
├── docker-compose.yml       # Local dev (backend only)
├── docker-compose.prod.yml  # Production (full stack)
└── .env.example             # Root env template for production compose
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite 7, Tailwind CSS 4, Framer Motion |
| Backend | Python 3.11, FastAPI, Uvicorn |
| RAG Pipeline | LangChain, FAISS, LangChain-HuggingFace |
| LLM | LLaMA 3.2-1B-Instruct (via HuggingFace Inference API) |
| Embeddings | sentence-transformers/all-MiniLM-L6-v2 |
| Deployment | Docker, Docker Compose, Nginx |

---

## 📸 Demo

![DocuMind Pipeline](DocuMind_Pipeline.png)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/lakshya-hidau">Lakshya Hidau</a>
</div>
