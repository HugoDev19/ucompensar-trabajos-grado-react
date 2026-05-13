from sqlalchemy.orm import Session
from models.estado_posible_model import EstadoPosible
from schemas.estado_schema import EstadoCreate


def crear_estado(db: Session, estado: EstadoCreate):

    nuevo = EstadoPosible(

        codigo=estado.codigo,

        nombre=estado.nombre,

        descripcion=estado.descripcion,

        es_estado_final=estado.es_estado_final
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return nuevo


def obtener_estados(db: Session):

    return db.query(EstadoPosible).all()


def obtener_estado(db: Session, estado_id: int):

    return db.query(EstadoPosible).filter(
        EstadoPosible.id == estado_id
    ).first()


def eliminar_estado(db: Session, estado_id: int):

    estado = db.query(EstadoPosible).filter(
        EstadoPosible.id == estado_id
    ).first()

    if estado:

        db.delete(estado)
        db.commit()

    return estado