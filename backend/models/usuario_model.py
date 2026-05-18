from sqlalchemy import (
    Column,
    String,
    Boolean,
    BigInteger,
    Integer,
    ForeignKey,
    TIMESTAMP,
    text
)

from sqlalchemy.orm import relationship, Mapped, mapped_column

from db.database import Base


class Usuario(Base):

    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String(100), unique=True, nullable=False)

    nombre_completo = Column(String(150), nullable=False)

    cedula = Column(String(20), unique=True, nullable=False)

    rol_id = Column(BigInteger, ForeignKey("roles.id"), nullable=False)

    azure_oid = Column(String(100), unique=True)

    activo = Column(Boolean, nullable=False, default=True)

    fecha_creacion = Column(
        TIMESTAMP,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    )

    rol = relationship("Rol")