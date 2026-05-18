from sqlalchemy.orm import Session
from models.usuario_model import Usuario
from schemas.usuario_schema import UsuarioCreate


def crear_usuario(db: Session, usuario: UsuarioCreate):

    nuevo = Usuario(

        email=usuario.email,

        nombre_completo=usuario.nombre_completo,

        cedula=usuario.cedula,

        rol_id=usuario.rol_id,

        azure_oid=usuario.azure_oid,

        activo=usuario.activo
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return nuevo


def obtener_usuarios(db: Session):

    return db.query(Usuario).all()


def obtener_usuario(db: Session, usuario_id: int):

    return db.query(Usuario).filter(
        Usuario.id == usuario_id
    ).first()


def eliminar_usuario(db: Session, usuario_id: int):

    usuario = db.query(Usuario).filter(
        Usuario.id == usuario_id
    ).first()

    if usuario:

        db.delete(usuario)
        db.commit()

    return usuario