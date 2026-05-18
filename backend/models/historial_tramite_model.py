from sqlalchemy import (
    Column,
    Integer,
    String,
    TIMESTAMP,
    ForeignKey,
    text
)

from db.database import Base


class HistorialTramite(Base):

    __tablename__ = "historial_tramite"

    id = Column(Integer, primary_key=True)

    tramite_id = Column(
        Integer,
        ForeignKey("tramites.id"),
        nullable=False
    )

    estado_anterior_id = Column(
        Integer,
        ForeignKey("estados_posibles.id")
    )

    estado_nuevo_id = Column(
        Integer,
        ForeignKey("estados_posibles.id"),
        nullable=False
    )

    usuario_id = Column(
        Integer,
        ForeignKey("usuarios.id"),
        nullable=False
    )

    fecha = Column(
        TIMESTAMP,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    )

    comentario = Column(String(500))

    ip_usuario = Column(String(45))