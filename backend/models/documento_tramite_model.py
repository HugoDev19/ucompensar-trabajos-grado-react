from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    TIMESTAMP,
    Enum,
    text
)

from sqlalchemy.orm import relationship

from db.database import Base

from models.enums import EstadoDocumentoEnum


class DocumentoTramite(Base):
    __tablename__ = "documentos_tramite"

    id = Column(Integer, primary_key=True, index=True)

    tramite_id = Column(
        Integer,
        ForeignKey("tramites.id"),
        nullable=False
    )

    tipo_doc_id = Column(
        Integer,
        ForeignKey("tipos_documento.id"),
        nullable=False
    )

    url_sharepoint = Column(String(500), nullable=False)

    nombre_archivo = Column(String(200), nullable=False)

    version = Column(Integer, nullable=False, default=1)

    estado = Column(
        Enum(EstadoDocumentoEnum),
        nullable=False,
        default=EstadoDocumentoEnum.pendiente
    )

    subido_por = Column(
        Integer,
        ForeignKey("usuarios.id"),
        nullable=False
    )

    revisado_por = Column(
        Integer,
        ForeignKey("usuarios.id")
    )

    fecha_carga = Column(
        TIMESTAMP,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    )

    fecha_revision = Column(TIMESTAMP)

    comentario = Column(String(300))

    tramite = relationship("Tramite")