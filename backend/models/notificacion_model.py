from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    Text,
    TIMESTAMP,
    ForeignKey
)

from db.database import Base


class Notificacion(Base):

    __tablename__ = "notificaciones"

    id = Column(Integer, primary_key=True)

    tramite_id = Column(
        Integer,
        ForeignKey("tramites.id"),
        nullable=False
    )

    destinatario_id = Column(
        Integer,
        ForeignKey("usuarios.id"),
        nullable=False
    )

    asunto = Column(String(200))

    cuerpo = Column(Text)

    enviada = Column(Boolean, nullable=False, default=False)

    fecha_envio = Column(TIMESTAMP)

    error_envio = Column(String(300))