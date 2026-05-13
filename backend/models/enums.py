import enum


class EstadoDocumentoEnum(str, enum.Enum):
    pendiente = "pendiente"
    aprobado = "aprobado"
    rechazado = "rechazado"


class MencionEnum(str, enum.Enum):
    MERITORIO = "MERITORIO"
    LAUREADO = "LAUREADO"