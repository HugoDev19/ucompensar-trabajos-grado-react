from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.database import get_db

from schemas.estado_schema import (
    EstadoCreate,
    EstadoResponse
)

from services.estado_service import (
    crear_estado,
    obtener_estados,
    obtener_estado,
    eliminar_estado
)

router = APIRouter(
    prefix="/estados",
    tags=["Estados"]
)


@router.post("/", response_model=EstadoResponse)
def crear(estado: EstadoCreate, db: Session = Depends(get_db)):

    return crear_estado(db, estado)


@router.get("/", response_model=list[EstadoResponse])
def listar(db: Session = Depends(get_db)):

    return obtener_estados(db)


@router.get("/{estado_id}", response_model=EstadoResponse)
def obtener(estado_id: int, db: Session = Depends(get_db)):

    return obtener_estado(db, estado_id)


@router.delete("/{estado_id}")
def eliminar(estado_id: int, db: Session = Depends(get_db)):

    return eliminar_estado(db, estado_id)