import { ReactNode } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface PipelineStepProps {
  stepNumber: number;
  title: string;
  description?: string;
  status?: 'loading' | 'completed' | 'idle' | 'error';
  children: ReactNode;
}

export default function PipelineStep({
  stepNumber,
  title,
  description,
  status = 'idle',
  children,
}: PipelineStepProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return (
          <div className="w-5 h-5 border-2 border-gray-300 rounded-full bg-gray-50" />
        );
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                status === 'loading'
                  ? 'bg-blue-50 text-blue-600 border-2 border-blue-300'
                  : status === 'completed'
                    ? 'bg-green-50 text-green-600 border-2 border-green-300'
                    : status === 'error'
                      ? 'bg-red-50 text-red-600 border-2 border-red-300'
                      : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
              }`}
            >
              {stepNumber}
            </div>
          </div>
        </div>

        <div className="flex-1 pb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  {title}
                  {status !== 'idle' && getStatusIcon()}
                </h3>
                {description && (
                  <p className="text-sm text-gray-500 mt-1">{description}</p>
                )}
              </div>
            </div>

            <div className="mt-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
