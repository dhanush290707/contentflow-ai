import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });

async function testProvider(provider, url, apiKey, model) {
  console.log(`\n--- Testing ${provider} ---`);
  try {
    if (!apiKey) {
      console.log(`Error: API Key missing for ${provider}`);
      return;
    }
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: 'Say hello' }],
      }),
    });
    const text = await apiResponse.text();
    console.log(`Status:`, apiResponse.status);
    console.log(`Response:`, text.substring(0, 200));
  } catch (e) {
    console.error(`Fetch Error:`, e.message);
  }
}

async function run() {
  await testProvider('Gemini', 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', process.env.GEMINI_API_KEY, 'gemini-1.5-flash');
  await testProvider('Groq', 'https://api.groq.com/openai/v1/chat/completions', process.env.GROQ_API_KEY, 'llama-3.1-8b-instant');
}
run();
