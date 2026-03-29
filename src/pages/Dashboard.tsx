import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, LogOut } from 'lucide-react';
import PipelineStep from '../components/PipelineStep';
import DraftSection from '../components/DraftSection';
import ComplianceSection from '../components/ComplianceSection';
import FinalOutputs from '../components/FinalOutputs';
import AgentLogs from '../components/AgentLogs';

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

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [completedStep, setCompletedStep] = useState(0);
  const [data, setData] = useState<Partial<PipelineData> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const isBusy = loading || revealing;

  useEffect(() => {
    setMounted(true);
  }, []);

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

      setLoading(false);
      setRevealing(true);

      setData({ draft: result.draft });
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
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-lg tracking-tight text-slate-800">ContentFlow AI</span>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </nav>

      <div className={`max-w-4xl mx-auto px-4 py-8 transform transition-all duration-700 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
          <label
            htmlFor="topic"
            className="block text-sm font-bold text-slate-800 mb-3"
          >
            What would you like to create content about?
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., AI-powered productivity tools for remote teams"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mb-4 text-slate-800"
            disabled={isBusy}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={runPipeline}
            disabled={isBusy}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
          >
            {isBusy ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {loading ? 'Running Multi-Agent Pipeline...' : 'Rendering Results...'}
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Enterprise Content
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
                description="Generates initial content based on your topic. Powered by Gemini 1.5 Flash."
                status={completedStep >= 1 ? 'completed' : isBusy ? 'loading' : 'idle'}
              >
                <DraftSection draft={data?.draft ?? null} />
              </PipelineStep>

              <PipelineStep
                stepNumber={2}
                title="Compliance Review Agent"
                description="Validates content against brand guidelines using strict regex guards."
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
                description="Creates platform-specific content formats. Powered by Groq LLaMA 3.1 Fast Inference."
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
              <div className="mt-8 pt-8 border-t border-slate-200 animate-fade-in-up">
                <AgentLogs logs={data?.logs ?? null} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
