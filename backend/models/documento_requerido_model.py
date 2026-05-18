from sqlalchemy import (
    Column,
    Integer,
    Boolean,
    String,
    ForeignKey
)

from db.database import Base


class DocumentoRequerido(Base):

    __tablename__ = "documentos_requeridos"

    id = Column(Integer, primary_key=True)

    modalidad_id = Column(
        Integer,
        ForeignKey("modalidades.id"),
        nullable=False
    )

    tipo_doc_id = Column(
        Integer,
        ForeignKey("tipos_documento.id"),
        nullable=False
    )

    obligatorio = Column(Boolean, nullable=False, default=True)

    nota = Column(String(400))

    orden = Column(Integer, nullable=False, default=0)
    