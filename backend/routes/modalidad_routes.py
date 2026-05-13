from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.database import get_db

from schemas.modalidad_schema import (
    ModalidadCreate,
    ModalidadResponse
)

from services.modalidad_service import (
    crear_modalidad,
    obtener_modalidades,
    obtener_modalidad,
    eliminar_modalidad
)

router = APIRouter(
    prefix="/modalidades",
    tags=["Modalidades"]
)


@router.post("/", response_model=ModalidadResponse)
def crear(modalidad: ModalidadCreate, db: Session = Depends(get_db)):

    return crear_modalidad(db, modalidad)


@router.get("/", response_model=list[ModalidadResponse])
def listar(db: Session = Depends(get_db)):

    return obtener_modalidades(db)


@router.get("/{modalidad_id}", response_model=ModalidadResponse)
def obtener(modalidad_id: int, db: Session = Depends(get_db)):

    return obtener_modalidad(db, modalidad_id)


@router.delete("/{modalidad_id}")
def eliminar(modalidad_id: int, db: Session = Depends(get_db)):

    return eliminar_modalidad(db, modalidad_id)