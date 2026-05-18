from pydantic import BaseModel


class UsuarioBase(BaseModel):

    email: str
    nombre_completo: str
    cedula: str
    rol_id: int
    azure_oid: str | None = None
    activo: bool = True


class UsuarioCreate(UsuarioBase):
    pass


class UsuarioResponse(UsuarioBase):

    id: int

    class Config:
        from_attributes = True