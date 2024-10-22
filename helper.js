const moment = require('moment');
const axios = require("axios");

function formatDate(date) {
  return moment(date).format('MMMM D YYYY');
}

async function callChatGPT(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {role: "system", content: "당신은 게시물을 게시한 선생님의 담당 과목을 예측합니다. 예측할 과목은 국어, 영어, 수학, 과학입니다. 무조건 과목 이름으로만 대답합니다. "},
      {role: "user", content: prompt},
    ],
  };

  try {
    const response = await axios.post(url, data, { headers });
    const result = response.data.choices[0].message.content;
    return result;
  } catch (error) {
    console.error(
      "Error calling ChatGPT API:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

module.exports = {formatDate, callChatGPT};
