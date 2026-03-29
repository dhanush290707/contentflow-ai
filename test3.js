import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });
import fs from 'fs';

async function testProvider(provider, url, apiKey, model) {
  let log = `\n--- Testing ${provider} ---\n`;
  try {
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: 'Say hello' }],
        temperature: 0.7
      }),
    });
    const text = await apiResponse.text();
    log += `Status: ${apiResponse.status}\n`;
    log += `Response: ${text}\n`;
  } catch (e) {
    log += `Fetch Error: ${e.message}\n`;
  }
  fs.appendFileSync('test_results.txt', log);
}

async function run() {
  fs.writeFileSync('test_results.txt', '');
  await testProvider('Gemini-OpenAI', 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', process.env.GEMINI_API_KEY, 'gemini-1.5-flash');
  await testProvider('Groq', 'https://api.groq.com/openai/v1/chat/completions', process.env.GROQ_API_KEY, 'llama-3.1-8b-instant');
}
run();
