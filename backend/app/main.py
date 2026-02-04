from fastapi import FastAPI

app = FastAPI(title="User Management API", version="1.0.0")

@app.get("/health")
def health_check():
     return {"status": "healthy/ok"}