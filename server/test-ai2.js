import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const logData = { error: null, result: null, fullResponse: null };

async function callAI(prompt) {
  try {
    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not configured');
    }

    const apiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3-8b-instruct',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      throw new Error(`OpenRouter API request failed: ${apiResponse.status} ${errorText}`);
    }

    const response = await apiResponse.json();
    logData.fullResponse = response;

    const responseData = response?.data ?? response;
    const messageContent = responseData?.choices?.[0]?.message?.content;
    const textContent = responseData?.choices?.[0]?.text;
    const output = [messageContent, textContent]
      .find((value) => typeof value === 'string' && value.trim().length > 0)
      ?.trim() || '';

    if (output) {
      return output;
    }
    throw new Error('No valid output found in response');
  } catch (error) {
    logData.error = error.message;
    return "FALLBACK";
  }
}

async function run() {
  const res = await callAI("Test prompt");
  logData.result = res;
  fs.writeFileSync('result.json', JSON.stringify(logData, null, 2));
}

run();
