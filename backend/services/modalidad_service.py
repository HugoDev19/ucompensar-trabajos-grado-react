from sqlalchemy.orm import Session
from models.modalidad_model import Modalidad
from schemas.modalidad_schema import ModalidadCreate


def crear_modalidad(db: Session, modalidad: ModalidadCreate):

    nueva = Modalidad(

        codigo=modalidad.codigo,
        nombre=modalidad.nombre,
        descripcion=modalidad.descripcion,
        permite_homologacion=modalidad.permite_homologacion,
        semestre_inicial_minimo=modalidad.semestre_inicial_minimo,
        duracion_minima_horas=modalidad.duracion_minima_horas,
        duracion_semanas=modalidad.duracion_semanas,
        integrantes_minimo=modalidad.integrantes_minimo,
        integrantes_maximo=modalidad.integrantes_maximo,
        calificacion_minima_aprobacion=modalidad.calificacion_minima_aprobacion,
        asistencia_minima_porcentaje=modalidad.asistencia_minima_porcentaje,
        activa=modalidad.activa
    )

    db.add(nueva)
    db.commit()
    db.refresh(nueva)

    return nueva


def obtener_modalidades(db: Session):

    return db.query(Modalidad).all()


def obtener_modalidad(db: Session, modalidad_id: int):

    return db.query(Modalidad).filter(
        Modalidad.id == modalidad_id
    ).first()


def eliminar_modalidad(db: Session, modalidad_id: int):

    modalidad = db.query(Modalidad).filter(
        Modalidad.id == modalidad_id
    ).first()

    if modalidad:

        db.delete(modalidad)
        db.commit()

    return modalidad