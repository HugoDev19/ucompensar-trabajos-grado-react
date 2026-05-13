from sqlalchemy.orm import Session

from models.tramite_model import Tramite
from schemas.tramite_schema import TramiteCreate
from models.historial_tramite_model import HistorialTramite
from models.estado_posible_model import EstadoPosible
from fastapi import HTTPException


def crear_tramite(
    db: Session,
    tramite: TramiteCreate
):

    nuevo_tramite = Tramite(

        codigo_tramite=tramite.codigo_tramite,

        estudiante_id=tramite.estudiante_id,

        modalidad_id=tramite.modalidad_id,

        estado_id=tramite.estado_id,

        semestre_academico=tramite.semestre_academico,

        requiere_homologacion=tramite.requiere_homologacion,

        observaciones=tramite.observaciones
    )

    db.add(nuevo_tramite)

    db.commit()

    db.refresh(nuevo_tramite)

    return nuevo_tramite


def obtener_tramites(db: Session):

    return db.query(Tramite).all()


def obtener_tramite_por_id(
    db: Session,
    tramite_id: int
):

    return db.query(Tramite).filter(
        Tramite.id == tramite_id
    ).first()


#no puede cambiar a cualquier estado sin control
# tenga reglas de transición
# registre historial automáticamente

def cambiar_estado_tramite(db, tramite_id: int, estado_id: int, usuario_id: int, comentario: str = None):

    #buscar tramite
    tramite = db.query(Tramite).filter(Tramite.id == tramite_id).first()

    if not tramite:
        raise HTTPException(
            status_code=404,
            detail="tramite no encontrado"
        )
        #validar estado
    estado= db.query(EstadoPosible).filter(
        EstadoPosible.id==estado_id
    ).first()

    if not estado:
        raise HTTPException(
            status_code=404,
            detail="Estado no existe"
        )
    #guardar estado anterior

    estado_anterior = tramite.estado_id

    # actualizar estado
    tramite.estado_id = estado_id

    # guardar en historial
    historial = HistorialTramite(

        tramite_id=tramite_id,
        estado_anterior_id=estado_anterior,
        estado_nuevo_id=estado_id,
        usuario_id=usuario_id,
        comentario=comentario
    )

    db.add(historial)

    db.commit()
    db.refresh(tramite)

    return tramite



