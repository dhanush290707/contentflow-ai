import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

function generateDraft(input) {
  console.log('Agent 1: Draft generation started');

  return `Initial draft for: "${input}"\n\nThis is a comprehensive overview of ${input}. We've analyzed the key aspects and created a foundation for your content strategy.\n\nKey Points:\n• Market relevance and audience targeting\n• Core messaging and value proposition\n• Strategic positioning and differentiation\n• Call-to-action framework`;
}

function checkCompliance(content) {
  console.log('Agent 2: Compliance check started');

  const fixedContent = `${content}\n\n[Compliance Note] Content reviewed and approved with no blocking issues.`;

  return {
    issues: [],
    fixedContent,
  };
}

function adaptContent(content) {
  console.log('Agent 3: Content adaptation started');

  const topicMatch = content.match(/Initial draft for: "(.+?)"/);
  const topic = topicMatch ? topicMatch[1] : 'this topic';

  return {
    linkedin: `Excited to share insights about ${topic}!\n\nIn today's fast-paced market, understanding ${topic} is crucial for success.\n\n#Innovation #Business #Strategy`,
    twitter: `Breaking down ${topic} in 2024:\n\n- Strategic focus\n- Audience-first approach\n- Data-driven decisions\n\n#TechTrends #Innovation`,
    faq: `Q: What is ${topic}?\nA: ${topic} is a practical approach to modern business challenges.\n\nQ: Who should use this?\nA: Teams and professionals aiming for stronger strategic outcomes.\n\nQ: How do I get started?\nA: Start with audience needs, then align with measurable goals.`,
  };
}

app.post('/runPipeline', (req, res) => {
  const { topic } = req.body;
  const safeTopic = topic || 'Untitled Topic';

  // Agent-based flow: draft -> compliance -> adaptation
  const draft = generateDraft(safeTopic);
  const compliance = checkCompliance(draft);
  const outputs = adaptContent(compliance.fixedContent);

  const responseData = {
    draft,
    compliance,
    outputs,
    logs: [
      {
        step: 1,
        agent: 'Draft Agent',
        action: 'Draft generation completed',
        status: 'success',
        timestamp: new Date().toISOString(),
        details: `Generated draft for topic: ${safeTopic}`,
      },
      {
        step: 2,
        agent: 'Compliance Agent',
        action: 'Compliance check completed',
        status: 'success',
        timestamp: new Date().toISOString(),
        details: 'Dummy compliance checks passed',
      },
      {
        step: 3,
        agent: 'Adaptation Agent',
        action: 'Content adaptation completed',
        status: 'success',
        timestamp: new Date().toISOString(),
        details: 'Dummy channel-specific outputs generated',
      },
    ],
  };

  setTimeout(() => {
    res.json(responseData);
  }, 2000);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
