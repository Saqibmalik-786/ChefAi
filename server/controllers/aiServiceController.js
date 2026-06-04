// 

import { getRecipe }
from "../services/AiService.js";

export const generateRecipe =
async (req, res) => {

  try {

    const { prompt } = req.body;
   
    const recipe =
      await getRecipe(prompt);

    return res.status(200).json({
      success: true,
      recipe
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};