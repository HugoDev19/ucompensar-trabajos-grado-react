from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    TIMESTAMP,
    ForeignKey,
    text
)

from db.database import Base


class TramiteEquipo(Base):

    __tablename__ = "tramite_equipo"

    id = Column(Integer, primary_key=True)

    tramite_id = Column(
        Integer,
        ForeignKey("tramites.id"),
        nullable=False
    )

    usuario_id = Column(
        Integer,
        ForeignKey("usuarios.id"),
        nullable=False
    )

    rol_en_tramite = Column(
        String(80),
        nullable=False
    )

    fecha_asignacion = Column(
        TIMESTAMP,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    )

    activo = Column(
        Boolean,
        nullable=False,
        default=True
    )