from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TramiteBase(BaseModel):

    codigo_tramite: str

    estudiante_id: int

    modalidad_id: int

    estado_id: int

    semestre_academico: str

    requiere_homologacion: bool = False

    observaciones: str | None = None


class TramiteCreate(TramiteBase):
    pass


class TramiteResponse(TramiteBase):

    id: int

    fecha_creacion: datetime

    class Config:
        from_attributes = True


    
class CambioEstadoSchema(BaseModel):
    estado_id:int
    comentario:str  | None = None


class CambioEstadoSchema(BaseModel):
    estado_id: int
    comentario: str | None = None