from fastapi import FastAPI
from routes.tramite_routes import router as tramite_router
from routes.usuario_routes import router as usuario_router
from routes.estado_routes import router as estado_router
from routes.modalidad_routes import router as modalidad_router




app = FastAPI(
    title="API Semillero UCompensar"
)


@app.get("/")
def inicio():
    return {
        "mensaje": "API funcionando"
    }



app.include_router(tramite_router)
app.include_router(usuario_router)
app.include_router(estado_router)
app.include_router(modalidad_router)
