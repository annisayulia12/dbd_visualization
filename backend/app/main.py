from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import Base, engine
from app.cases import models, routers
from app.auth import routers_auth

# bikin tabel otomatis
Base.metadata.create_all(bind=engine)

app = FastAPI()

# ✅ Tambahin CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # alamat frontend (Vite/React)
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE, OPTIONS
    allow_headers=["*"],
)

# register router cases
app.include_router(routers.router)

# root users
app.include_router(routers_auth.router) 

@app.get("/")
def root():
    return {"message": "API DBD aktif di FastAPI!"}
