import os

import psycopg


DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://localhost/task_manager",
)


def get_connection():
    return psycopg.connect(DATABASE_URL)