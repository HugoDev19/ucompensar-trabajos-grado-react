from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey
)

from db.database import Base


class PrerequisitoModalidad(Base):

    __tablename__ = "prerequisitos_modalidad"

    id = Column(Integer, primary_key=True)

    modalidad_id = Column(
        Integer,
        ForeignKey("modalidades.id"),
        nullable=False
    )

    descripcion = Column(String(400), nullable=False)

    tipo = Column(String(50))

    obligatorio = Column(Boolean, nullable=False, default=True)