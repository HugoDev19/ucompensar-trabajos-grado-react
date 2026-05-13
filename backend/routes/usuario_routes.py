from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


from db.database import get_db

from schemas.usuario_schema import (
    UsuarioCreate,
    UsuarioResponse
)

from services.usuario_service import (
    crear_usuario,
    obtener_usuarios,
    obtener_usuario,
    eliminar_usuario
)

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)


@router.post("/", response_model=UsuarioResponse)
def crear(usuario: UsuarioCreate, db: Session = Depends(get_db)):

    return crear_usuario(db, usuario)


@router.get("/", response_model=list[UsuarioResponse])
def listar(db: Session = Depends(get_db)):

    return obtener_usuarios(db)


@router.get("/{usuario_id}", response_model=UsuarioResponse)
def obtener(usuario_id: int, db: Session = Depends(get_db)):

    return obtener_usuario(db, usuario_id)


@router.delete("/{usuario_id}")
def eliminar(usuario_id: int, db: Session = Depends(get_db)):

    return eliminar_usuario(db, usuario_id)