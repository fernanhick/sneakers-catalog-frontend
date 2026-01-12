import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });

const aiService = {
  async getSneakerDescription(sneakerImg) {
    //console.log("Generating description for image:", sneakerImg);
    try {
      const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: "Detect what shoe/sneaker is in the image and provide detailed information. Format the response with keys: shoe_detected, brand, model, color, average_price.",
              },
              {
                type: "input_image",
                image_url: `data:image/jpeg;base64,${sneakerImg}`,
              },
            ],
          },
        ],
      });
      console.log("Sneaker description response:", response);
      console.log("Generated sneaker description:", response.output_text);
      return response.output_text;
    } catch (error) {
      console.error("Error generating sneaker description:", error);
      throw error;
    }
  },

  async analyzeImage(base64Image) {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: "Describe this image." },
              {
                type: "input_image",
                image_base64: base64Image,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("Image analysis response:", data);
    return data.output_text;
  },
};

export default aiService;
