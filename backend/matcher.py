from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import pandas as pd

# Load model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Load FAISS index
index = faiss.read_index('faiss_index.bin')

# Load CSV
trials_df = pd.read_csv('trials.csv')


def create_patient_text(patient_data):

    return f"""
    Age: {patient_data['age']}
    Conditions: {', '.join(patient_data['conditions'])}
    Symptoms: {', '.join(patient_data['symptoms'])}
    Lab Results: {patient_data['lab_results']}
    """


def match_trials(patient_data, top_k=3):

    patient_text = create_patient_text(patient_data)

    # Create embedding
    patient_embedding = model.encode([patient_text])
    patient_embedding = np.array(patient_embedding).astype('float32')

    # Search
    distances, indices = index.search(patient_embedding, top_k)

    results = []

    for i, idx in enumerate(indices[0]):

        trial = trials_df.iloc[idx]

        similarity_score = float(
            round((1 / (1 + distances[0][i])) * 100, 2)
        )

        results.append({
            "trial_id": trial['trial_id'],
            "disease": trial['disease'],
            "inclusion_criteria": trial['inclusion_criteria'],
            "exclusion_criteria": trial['exclusion_criteria'],
            "match_score": similarity_score
        })

    return results