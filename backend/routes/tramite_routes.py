from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi import APIRouter
from fastapi import Depends
from services.tramite_service import cambiar_estado_tramite
from schemas.tramite_schema import CambioEstadoSchema

from db.database import get_db

from schemas.tramite_schema import (
    TramiteCreate,
    TramiteResponse
)

from services.tramite_service import (
    crear_tramite,
    obtener_tramites,
    obtener_tramite_por_id
)

router = APIRouter(
    prefix="/tramites",
    tags=["Tramites"]
)


@router.post(
    "/",
    response_model=TramiteResponse
)
def crear(
    tramite: TramiteCreate,
    db: Session = Depends(get_db)
):

    return crear_tramite(
        db,
        tramite
    )


@router.get(
    "/",
    response_model=list[TramiteResponse]
)
def listar(
    db: Session = Depends(get_db)
):

    return obtener_tramites(db)


@router.get(
    "/{tramite_id}",
    response_model=TramiteResponse
)
def obtener(
    tramite_id: int,
    db: Session = Depends(get_db)
):

    return obtener_tramite_por_id(
        db,
        tramite_id
    )

#----

@router.put("/{tramite_id}/estado")
def cambiar_estado(
    tramite_id: int,
    data: CambioEstadoSchema,
    db: Session = Depends(get_db)
):

    # por ahora usuario fijo (luego lo conectamos con login)
    usuario_id = 1

    return cambiar_estado_tramite(
        db,
        tramite_id,
        data.estado_id,
        usuario_id,
        data.comentario
    )