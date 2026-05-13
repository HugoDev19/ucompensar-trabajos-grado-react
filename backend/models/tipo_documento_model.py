from sqlalchemy import (
    Column,
    Integer,
    String,
    Text
)

from db.database import Base


class TipoDocumento(Base):

    __tablename__ = "tipos_documento"

    id = Column(Integer, primary_key=True)

    codigo = Column(String(60), unique=True, nullable=False)

    nombre = Column(String(200), nullable=False)

    descripcion = Column(Text)