from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    Text
)

from db.database import Base


class EstadoPosible(Base):

    __tablename__ = "estados_posibles"

    id = Column(Integer, primary_key=True)

    codigo = Column(String(60), unique=True, nullable=False)

    nombre = Column(String(100), nullable=False)

    descripcion = Column(Text)

    es_estado_final = Column(
        Boolean,
        nullable=False,
        default=False
    )