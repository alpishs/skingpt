from app.services.rag_service import search_knowledge


query = """
The user has an itchy red dry rash on the skin.
"""


results = search_knowledge(query)


for result in results:
    print("\n------------------------")
    print(result["title"])
    print(result["distance"])
    print(result["content"])