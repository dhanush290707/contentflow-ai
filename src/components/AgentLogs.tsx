import { Terminal, CheckCircle, AlertCircle } from 'lucide-react';

interface AgentLogsProps {
  logs: Array<{
    step: number;
    agent: string;
    action: string;
    status: string;
    timestamp: string;
    details: string;
  }> | null;
}

export default function AgentLogs({ logs }: AgentLogsProps) {
  if (!logs) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 border border-dashed border-gray-300">
        <p className="text-gray-500 italic text-sm">Waiting for agent execution...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-5">
        <Terminal className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900">Agent Execution Logs</h3>
        <span className="ml-auto px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
          {logs.length} steps
        </span>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {logs.map((log) => (
          <div
            key={log.step}
            className={`flex gap-3 p-3 rounded-lg border transition-colors ${
              log.status === 'success'
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {log.status === 'success' ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-gray-600 bg-gray-200 px-2 py-0.5 rounded">
                  {log.step}
                </span>
                <span className="text-sm font-medium text-gray-900">{log.agent}</span>
              </div>
              <p className="text-sm text-gray-700">{log.action}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-600">{log.details}</p>
                <p className="text-xs text-gray-400 whitespace-nowrap ml-2">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
