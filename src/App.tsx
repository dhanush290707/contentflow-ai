import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import PipelineStep from './components/PipelineStep';
import DraftSection from './components/DraftSection';
import ComplianceSection from './components/ComplianceSection';
import FinalOutputs from './components/FinalOutputs';
import AgentLogs from './components/AgentLogs';

interface PipelineData {
  draft: string;
  compliance: {
    issues: string[];
    fixedContent: string;
  };
  outputs: {
    linkedin: string;
    twitter: string;
    faq: string;
  };
  logs: Array<{
    step: number;
    agent: string;
    action: string;
    status: string;
    timestamp: string;
    details: string;
  }>;
}

function App() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [completedStep, setCompletedStep] = useState(0);
  const [data, setData] = useState<Partial<PipelineData> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isBusy = loading || revealing;

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const runPipeline = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic or product description');
      return;
    }

    setLoading(true);
    setRevealing(false);
    setCompletedStep(0);
    setData(null);
    setError(null);

    try {
      console.debug('[DEBUG] Frontend calling /runPipeline', { topic });
      const response = await fetch('http://localhost:3001/runPipeline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('Pipeline execution failed');
      }

      const result: PipelineData = await response.json();
      console.debug('[DEBUG] Frontend received /runPipeline response', {
        hasDraft: Boolean(result.draft),
        outputKeys: Object.keys(result.outputs || {}),
        logCount: result.logs?.length ?? 0,
      });

      // Reveal each stage progressively for a smoother UX.
      setLoading(false);
      setRevealing(true);

      setData({ draft: result.draft });
      console.debug('[DEBUG] Rendering backend draft output', {
        draftLength: result.draft.length,
      });
      setCompletedStep(1);
      await wait(400);

      setData((prev) => ({
        ...(prev || {}),
        compliance: result.compliance,
      }));
      setCompletedStep(2);
      await wait(400);

      setData((prev) => ({
        ...(prev || {}),
        outputs: result.outputs,
      }));
      console.debug('[DEBUG] Rendering backend adapted outputs', {
        linkedinLength: result.outputs.linkedin.length,
        twitterLength: result.outputs.twitter.length,
        faqLength: result.outputs.faq.length,
      });
      setCompletedStep(3);
      await wait(350);

      setData((prev) => ({
        ...(prev || {}),
        logs: result.logs,
      }));
      setCompletedStep(4);
      setRevealing(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred. Please try again.'
      );
      setRevealing(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">ContentFlow AI</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Transform ideas into multi-platform content with AI agents
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-7 mb-12 border border-gray-200">
          <label
            htmlFor="topic"
            className="block text-sm font-semibold text-gray-800 mb-3"
          >
            What would you like to create content about?
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., AI-powered productivity tools for remote teams"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mb-4"
            disabled={isBusy}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={runPipeline}
            disabled={isBusy}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isBusy ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {loading ? 'Running Pipeline...' : 'Rendering Results...'}
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Content
              </>
            )}
          </button>
        </div>

        {(data || isBusy) && (
          <div className="space-y-6">
            <div className="relative">
              <PipelineStep
                stepNumber={1}
                title="Content Drafting Agent"
                description="Generates initial content based on your topic"
                status={completedStep >= 1 ? 'completed' : isBusy ? 'loading' : 'idle'}
              >
                <DraftSection draft={data?.draft ?? null} />
              </PipelineStep>

              <PipelineStep
                stepNumber={2}
                title="Compliance Review Agent"
                description="Validates content against brand guidelines"
                status={
                  completedStep >= 2
                    ? 'completed'
                    : isBusy && completedStep >= 1
                      ? 'loading'
                      : 'idle'
                }
              >
                <ComplianceSection compliance={data?.compliance ?? null} />
              </PipelineStep>

              <PipelineStep
                stepNumber={3}
                title="Output Generation Agent"
                description="Creates platform-specific content formats"
                status={
                  completedStep >= 3
                    ? 'completed'
                    : isBusy && completedStep >= 2
                      ? 'loading'
                      : 'idle'
                }
              >
                <FinalOutputs outputs={data?.outputs ?? null} />
              </PipelineStep>
            </div>

            {(data?.logs || (isBusy && completedStep >= 3)) && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <AgentLogs logs={data?.logs ?? null} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
