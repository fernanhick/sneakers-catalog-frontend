import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });
const controller = new AbortController();
const timedoutId = setTimeout(() => controller.abort(), 90000); // 90 seconds timeout
const aiService = {
  async getSneakerDescription(sneakerImg) {
    console.log("Generating description for image:");
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
        signal: controller.signal,
      });
      clearImmediate(timedoutId);

      console.log("Sneaker description response:", response);
      console.log("Generated sneaker description:", response.output_text);
      return response.output_text;
    } catch (error) {
      console.error("Error generating sneaker description:", error);
      throw error;
    }
  },

  async analyzeImage(sneakerImg) {
    try {
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
                {
                  type: "input_text",
                  text: "Detect only shoe/sneaker. Format the response with keys: shoe_detected, brand, model, color, average_price, hex_color_code, release_year, brief description.",
                },
                {
                  type: "input_image",
                  image_url: `data:image/jpeg;base64,${sneakerImg}`,
                },
              ],
            },
          ],
        }),
        /* Signal for Timeout */
        signal: controller.signal,
      });
      /* Clear timeout */
      clearTimeout(timedoutId);
      console.log("AI analyzeImage raw response:", response);
      console.log("Sneaker analysis response status:", response.status);
      const data = await response.json();
      //console.log("Sneaker analysis response data:", data);
      if (response.status === 200) return data.output[0].content[0].text;
      if (response.status === 429)
        return {
          error:
            data.error.message ||
            "Rate limit exceeded. Please try again later.",
        };
    } catch (error) {
      console.error("Error analyzing sneaker image:", error.message);
      return { error: error.message || "An error occurred during analysis." };

      //throw error;
    }
  },
};

export default aiService;
