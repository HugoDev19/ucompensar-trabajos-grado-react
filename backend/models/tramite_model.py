from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    Text,
    TIMESTAMP,
    ForeignKey,
    text
)

from sqlalchemy.orm import relationship

from db.database import Base


class Tramite(Base):

    __tablename__ = "tramites"

    id = Column(Integer, primary_key=True, index=True)

    codigo_tramite = Column(String(30), unique=True, nullable=False)


    codigo_tramite = Column(
        String(30),
        unique=True,
        nullable=False
    )
    estudiante_id = Column(
        Integer,
        ForeignKey("usuarios.id"),
        nullable=False
    )

    modalidad_id = Column(
        Integer,
        ForeignKey("modalidades.id"),
        nullable=False
    )

    estado_id = Column(
        Integer,
        ForeignKey("estados_posibles.id"),
        nullable=False
    )

    requiere_homologacion = Column(
        Boolean,
        nullable=False,
        default=False
    )

    semestre_academico = Column(
        String(10),
        nullable=False
    )

    fecha_creacion = Column(
        TIMESTAMP,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    )

    fecha_actualizacion = Column(TIMESTAMP)

    fecha_cierre = Column(TIMESTAMP)

    observaciones = Column(Text)

    estudiante = relationship("Usuario")

    modalidad = relationship("Modalidad")

    estado = relationship("EstadoPosible")


      

