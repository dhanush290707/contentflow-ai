import { ShieldCheck, AlertCircle } from 'lucide-react';

interface ComplianceSectionProps {
  compliance: {
    issues: string[];
    fixedContent: string;
  } | null;
}

export default function ComplianceSection({ compliance }: ComplianceSectionProps) {
  if (!compliance) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 border border-dashed border-gray-300">
        <p className="text-gray-500 italic text-sm">Waiting for compliance check...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 mb-4">
        <ShieldCheck className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Compliance Check</h3>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4 border border-green-200 space-y-3">
        {compliance.issues.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-red-700 flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4" />
              Issues Found
            </h4>
            <ul className="space-y-1">
              {compliance.issues.map((issue, idx) => (
                <li key={idx} className="text-sm text-gray-700 ml-6">
                  • {issue}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Fixed Content</h4>
          <div className="bg-white rounded p-3 border border-green-200">
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {compliance.fixedContent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
