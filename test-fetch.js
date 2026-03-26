import fs from 'fs';

async function testFetch() {
  const response = await fetch('http://localhost:3001/runPipeline', {
    method: 'POST',
    body: JSON.stringify({topic: 'TypeScript'}),
    headers: {'Content-Type': 'application/json'}
  });
  const data = await response.json();
  fs.writeFileSync('pipeline-output.json', JSON.stringify(data, null, 2));
}

testFetch();
