from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from config import settings




engine = create_engine(settings.database_url)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

# dependencia para FastAPI
#Le da acceso a la BD a los endpoints.
def get_db():

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()