const apiKey = "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"; // Replace with your actual API key
const url = "https://api.openai.com/v1/chat/completions";

const data = {
  prompt:
    'Translate the following English text to French: "Hello, how are you?"',
  temperature: 0.7,
  max_tokens: 60,
};
    
fetch(url, {
  method: "POST", // or 'PUT'
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify(data),
})` `
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
