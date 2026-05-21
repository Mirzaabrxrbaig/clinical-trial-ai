from sentence_transformers import SentenceTransformer
import pandas as pd
import faiss
import numpy as np
import pickle

# Load model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Load dataset
trials = pd.read_csv('trials.csv')

# Create searchable text
trial_texts = []

for _, row in trials.iterrows():
    text = f"""
    Disease: {row['disease']}
    Inclusion: {row['inclusion_criteria']}
    Exclusion: {row['exclusion_criteria']}
    """
    trial_texts.append(text)

# Generate embeddings
embeddings = model.encode(trial_texts)

# Convert to float32
embeddings = np.array(embeddings).astype('float32')

# Create FAISS index
index = faiss.IndexFlatL2(embeddings.shape[1])

# Add vectors
index.add(embeddings)

# Save index
faiss.write_index(index, 'faiss_index.bin')

# Save metadata
with open('trial_texts.pkl', 'wb') as f:
    pickle.dump(trial_texts, f)

print("FAISS index created successfully")