from pydantic import BaseModel


class ModalidadBase(BaseModel):

    codigo: str
    nombre: str
    descripcion: str | None = None
    permite_homologacion: bool = True
    semestre_inicial_minimo: int | None = None
    duracion_minima_horas: int | None = None
    duracion_semanas: int | None = None
    integrantes_minimo: int = 1
    integrantes_maximo: int = 4
    calificacion_minima_aprobacion: float = 3.0
    asistencia_minima_porcentaje: int | None = None
    activa: bool = True


class ModalidadCreate(ModalidadBase):
    pass


class ModalidadResponse(ModalidadBase):

    id: int

    class Config:
        from_attributes = True