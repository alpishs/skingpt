from uuid import uuid4

from app.data.knowledge_base import KNOWLEDGE_BASE
from app.services.database import get_connection
from app.services.embedding_service import generate_embedding


def initialize_knowledge_base():
    with get_connection() as connection:
        with connection.cursor() as cursor:

            for document in KNOWLEDGE_BASE:

                embedding = generate_embedding(
                    document["content"]
                )

                cursor.execute(
                    """
                    INSERT INTO knowledge_documents
                    (id, title, content, source, source_url, embedding)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    ON CONFLICT (title) DO UPDATE SET
                        content = EXCLUDED.content,
                        source = EXCLUDED.source,
                        source_url = EXCLUDED.source_url,
                        embedding = EXCLUDED.embedding
                    """,
                    (
                        uuid4(),
                        document["title"],
                        document["content"],
                        document["source"],
                        document["source_url"],
                        embedding,
                    ),
                )

        connection.commit()

def search_knowledge(
    query: str,
    limit: int = 3,
):
    query_embedding = generate_embedding(query)

    with get_connection() as connection:
        with connection.cursor() as cursor:

            cursor.execute(
                """
                SELECT
                    title,
                    content,
                    source,
                    source_url,
                    embedding <=> %s::vector AS distance
                FROM knowledge_documents
                ORDER BY embedding <=> %s::vector
                LIMIT %s
                """,
                (
                    query_embedding,
                    query_embedding,
                    limit,
                ),
            )

            rows = cursor.fetchall()

    return [
    {
        "title": row[0],
        "content": row[1],
        "source": row[2],
        "source_url": row[3],
        "distance": row[4],
    }
    for row in rows
]