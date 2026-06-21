import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data);
      return "Sorry, I couldn't get a response from the AI right now.";
    }

    return data.choices[0].message.content;
  } catch (err) {
    console.error("Fetch error:", err);
    return "Sorry, something went wrong.";
  }
};

export default getOpenAIAPIResponse;