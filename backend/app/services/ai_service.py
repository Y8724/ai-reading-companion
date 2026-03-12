from openai import OpenAI
import os
from openai import RateLimitError

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def summarize(text: str):

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Summarize book notes clearly."},
                {"role": "user", "content": text}
            ],
            max_tokens=120
        )

        return response.choices[0].message.content

    except Exception as e:
        print("AI failed:", e)

        # fallback summary
        return "AI summary unavailable right now. Original notes: " + text[:200]