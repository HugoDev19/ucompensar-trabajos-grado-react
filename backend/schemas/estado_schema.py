from pydantic import BaseModel


class EstadoBase(BaseModel):

    codigo: str
    nombre: str
    descripcion: str | None = None
    es_estado_final: bool = False


class EstadoCreate(EstadoBase):
    pass


class EstadoResponse(EstadoBase):

    id: int

    class Config:
        from_attributes = True