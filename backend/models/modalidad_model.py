from sqlalchemy import (
    Column,
    String,
    Boolean,
    Integer,
    Numeric,
    Text
)

from db.database import Base


class Modalidad(Base):

    __tablename__ = "modalidades"

    id = Column(Integer, primary_key=True, index=True)

    codigo = Column(String(30), unique=True, nullable=False)

    nombre = Column(String(150), nullable=False)

    descripcion = Column(Text)

    permite_homologacion = Column(Boolean, nullable=False, default=True)

    semestre_inicial_minimo = Column(Integer)

    duracion_minima_horas = Column(Integer)

    duracion_semanas = Column(Integer)

    integrantes_minimo = Column(Integer, nullable=False, default=1)

    integrantes_maximo = Column(Integer, nullable=False, default=4)

    calificacion_minima_aprobacion = Column(
        Numeric(3, 1),
        nullable=False,
        default=3.0
    )

    asistencia_minima_porcentaje = Column(Integer)

    activa = Column(Boolean, nullable=False, default=True)