from sqlalchemy import (
    Column,
    Integer,
    String,
    Numeric,
    Boolean,
    ForeignKey
)

from db.database import Base


class CriterioEvaluacion(Base):

    __tablename__ = "criterios_evaluacion"

    id = Column(Integer, primary_key=True)

    modalidad_id = Column(
        Integer,
        ForeignKey("modalidades.id"),
        nullable=False
    )

    nombre = Column(String(120), nullable=False)

    peso_porcentaje = Column(
        Numeric(5, 2),
        nullable=False
    )

    es_requisito_inclusion = Column(
        Boolean,
        nullable=False,
        default=False
    )

    orden = Column(Integer, nullable=False, default=0)