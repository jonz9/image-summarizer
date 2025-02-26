from langchain_community.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage
import os
import dotenv

dotenv.load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def summarize_image(caption):
    llm = ChatOpenAI(model_name="gpt-4-turbo", temperature=0.7, max_tokens=150)

    prompt = f"""
    You are an expert in photography analysis. Given the image description: "{caption}", analyze the scene with maximum detail.
    
    - Describe the lighting conditions (e.g., soft, harsh, natural, artificial).
    - Identify the main subjects and their positions.
    - Discuss the composition techniques used (e.g., rule of thirds, leading lines).
    - Comment on color balance and contrast.
    - Infer possible emotions or themes in the image.

    Provide a well-structured, detailed summary in a paragraph structure, without extra confirmation or words that repeat my question.
    """

    response = llm.invoke([HumanMessage(content=prompt)])

    return response.content
