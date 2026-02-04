from fastapi import FastAPI
from app.db.session import engine


app = FastAPI(title="User Management API", version="1.0.0")

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