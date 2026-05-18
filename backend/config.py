from pydantic import SecretStr


from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

    db_user: str
    db_password: SecretStr
    db_host: str
    db_name: str

    @property
    def database_url(self):
        return f"postgresql://{self.db_user}:{self.db_password.get_secret_value()}@{self.db_host}/{self.db_name}"



settings = Settings()


    

