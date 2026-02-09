from fastapi import FastAPI
from app.db.session import engine
from app.core import security
from app.api import auth,user
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="User Management API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(user.router)



@app.get("/health")
def health_check():
     return {"status": "healthy/ok"}
 

@app.get("/db-check")
def db_check():
    return "This is database testing"
    # try:
    #     with engine.connect() as connection:
    #         connection.execute("SELECT 1")
    #     return {"db": "connected"}
    # except Exception:
    #     return {"db": "disconnected"}