from sqlalchemy import Column, String, Boolean, BigInteger
from db.database import Base


class Rol(Base):

    __tablename__ = "roles"

    id = Column(BigInteger, primary_key=True, index=True)

    nombre = Column(String(100), unique=True, nullable=False)

    descripcion = Column(String(200))

    activo = Column(Boolean, nullable=False, default=True)
    