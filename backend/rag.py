from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def generate_explanation(patient_data, trial_data):

    prompt = f"""
    Patient Information:
    {patient_data}

    Clinical Trial:
    {trial_data}

    Explain why this patient qualifies or may qualify for this clinical trial.
    Mention inclusion and exclusion considerations.
    Keep explanation short and professional.
    """

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content