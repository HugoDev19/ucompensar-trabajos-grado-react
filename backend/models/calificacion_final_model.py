from sqlalchemy import (
    Column,
    Integer,
    Numeric,
    Boolean,
    String,
    TIMESTAMP,
    ForeignKey,
    Enum,
    text
)

from sqlalchemy.orm import relationship

from db.database import Base

from models.enums import MencionEnum


class CalificacionFinal(Base):
    __tablename__ = "calificacion_final"

    id = Column(Integer, primary_key=True, index=True)

    tramite_id = Column(
        Integer,
        ForeignKey("tramites.id"),
        unique=True,
        nullable=False
    )

    calificacion_definitiva = Column(
        Numeric(3, 1),
        nullable=False
    )

    aprobado = Column(Boolean, nullable=False)

    mencion = Column(
        Enum(MencionEnum),
        nullable=True
    )

    fecha_registro = Column(
        TIMESTAMP,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    )

    registrada_por = Column(
        Integer,
        ForeignKey("usuarios.id"),
        nullable=False
    )

    acta_consejo = Column(String(100))

    tramite = relationship("Tramite")