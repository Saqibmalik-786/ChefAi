// import OpenAI from "openai";

// let openai;

// const getOpenAIClient = () => {
//   if (!openai) {
//     openai = new OpenAI({
//       apiKey: "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"
//     });
//   }
//   return openai;
// };

// export const getRecipe = async (prompt) => {
//   try {
//     const client = getOpenAIClient();

//     const response =
//       await client.chat.completions.create({

//         model: "gpt-4o-mini",

//         messages: [
//           {
//             role: "system",
//             content: `
//             You are ChefAI.

//             Only answer recipe related questions.

//             Return valid JSON only.

//             Format:

//             {
//               "title":"",
//               "description":"",
//               "ingredients":[],
//               "instructions":[],
//               "cooking_time":"",
//               "servings":""
//             }
//             `
//           },

//           {
//             role: "user",
//             content: prompt
//           }
//         ],

//         response_format: {
//           type: "json_object"
//         }
//       });

//     return JSON.parse(
//       response.choices[0].message.content
//     );

//   } catch (error) {

//     console.error(error);
//     throw error;
//   }
// };
import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
 // Check if the API key is loaded

export const getRecipe = async (prompt) => {
  try {
    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: `
You are ChefAI.

Only answer recipe-related questions.

If the user asks anything unrelated to food, cooking, ingredients, recipes, baking, drinks, or meal preparation, respond with:

"I can only help with recipes and cooking questions."

Return ONLY valid JSON.

Format:

{
  "title": "",
  "prompt": "",
  "description": "",
  "ingredients": [
    {
      "item": "",
      "quantity": ""
    }
  ],
  "instructions": [
    ""
  ],
  "cooking_time": "",
  "servings": ""
}
`
          },
          {
            role: "user",
            content: prompt
          }
        ],

        temperature: 0.7,

        response_format: {
          type: "json_object"
        }
      });

    const aiResponse =
      completion.choices[0].message.content;

    return JSON.parse(aiResponse);

  } catch (error) {
    console.error("Groq Error:", error);
    throw new Error("Failed to generate recipe");
  }
};