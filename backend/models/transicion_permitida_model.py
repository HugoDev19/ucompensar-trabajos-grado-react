from sqlalchemy import (
    Column,
    Integer,
    BigInteger,
    ForeignKey
)

from db.database import Base


class TransicionPermitida(Base):

    __tablename__ = "transiciones_permitidas"

    id = Column(Integer, primary_key=True)

    modalidad_id = Column(
        Integer,
        ForeignKey("modalidades.id"),
        nullable=False
    )

    estado_origen_id = Column(
        Integer,
        ForeignKey("estados_posibles.id"),
        nullable=False
    )

    estado_destino_id = Column(
        Integer,
        ForeignKey("estados_posibles.id"),
        nullable=False
    )

    rol_autorizado_id = Column(
        BigInteger,
        ForeignKey("roles.id"),
        nullable=False
    )