from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    project_name: str = "Evently"
    environment: str = "development"
    debug: bool = True
    database_url: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int = 60

    class Config:
        env_file = ".env"


settings = Settings()
