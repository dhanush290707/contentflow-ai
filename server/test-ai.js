import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const AI_FALLBACK_MESSAGE = 'AI service temporarily unavailable. Showing fallback content.';

function buildBasicFallback(input) {
  return `Here is a basic generated version for: ${input}. This is shown because AI service is temporarily unavailable.`;
}

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
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      throw new Error(`OpenRouter API request failed: ${apiResponse.status} ${errorText}`);
    }

    const response = await apiResponse.json();
    console.log('FULL AI RESPONSE JSON:', JSON.stringify(response, null, 2));

    const responseData = response?.data ?? response;
    const messageContent = responseData?.choices?.[0]?.message?.content;
    const textContent = responseData?.choices?.[0]?.text;
    const output = [messageContent, textContent]
      .find((value) => typeof value === 'string' && value.trim().length > 0)
      ?.trim() || '';

    if (output) {
      return output;
    }
  } catch (error) {
    console.error('[ERROR] callAI failed', error.message);
  }
  return String(buildBasicFallback(prompt) || '').trim();
}

async function run() {
  const res = await callAI("Test prompt");
  console.log("FINAL RESULT:", res);
}

run();
