from sqlalchemy import (
    Column,
    Integer,
    Numeric,
    String,
    TIMESTAMP,
    ForeignKey,
    text
)

from db.database import Base


class Calificacion(Base):

    __tablename__ = "calificaciones"

    id = Column(Integer, primary_key=True)

    tramite_id = Column(
        Integer,
        ForeignKey("tramites.id"),
        nullable=False
    )

    criterio_id = Column(
        Integer,
        ForeignKey("criterios_evaluacion.id"),
        nullable=False
    )

    evaluador_id = Column(
        Integer,
        ForeignKey("usuarios.id"),
        nullable=False
    )

    calificacion = Column(
        Numeric(3, 1),
        nullable=False
    )

    fecha_registro = Column(
        TIMESTAMP,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    )

    observacion = Column(String(300))