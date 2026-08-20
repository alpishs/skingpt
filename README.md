AI-powered dermatology assistant with multimodal image analysis, trusted medical RAG, explainable results, and patient history.
                  
                  IMAGE
                    │
                    ▼
             Qwen2.5-VL 7B
                    │
                    ▼
          Visual Observations
                    │
                    │
       ┌────────────┴────────────┐
       │                         │
    Symptoms               Observations
       │                         │
       └────────────┬────────────┘
                    ▼
             Embedding Model
                    │
                    ▼
             pgvector Search
                    │
                    ▼
        ┌──────────────────────┐
        │ Trusted Knowledge    │
        │ + Source + URL       │
        └──────────┬───────────┘
                   │
                   ▼
              Qwen2.5 7B
                   │
                   ▼
            Structured JSON
                   │
        ┌──────────┴───────────┐
        ▼                      ▼
    AI Result              References
        │                      │
        └──────────┬───────────┘
                   ▼
                React
