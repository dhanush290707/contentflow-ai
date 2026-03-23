import { Linkedin, Twitter, HelpCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface FinalOutputsProps {
  outputs: {
    linkedin: string;
    twitter: string;
    faq: string;
  } | null;
}

export default function FinalOutputs({ outputs }: FinalOutputsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!outputs) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 border border-dashed border-gray-300">
        <p className="text-gray-500 italic text-sm">Waiting for final outputs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-blue-700" />
            <h4 className="font-semibold text-gray-900">LinkedIn Post</h4>
          </div>
          <button
            onClick={() => copyToClipboard(outputs.linkedin, 'linkedin')}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
          >
            {copiedId === 'linkedin' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="bg-blue-50 rounded p-3 border border-blue-200">
          <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
            {outputs.linkedin}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Twitter className="w-5 h-5 text-blue-500" />
            <h4 className="font-semibold text-gray-900">Twitter Post</h4>
          </div>
          <button
            onClick={() => copyToClipboard(outputs.twitter, 'twitter')}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-500 rounded hover:bg-blue-100 transition-colors"
          >
            {copiedId === 'twitter' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="bg-blue-50 rounded p-3 border border-blue-200">
          <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
            {outputs.twitter}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-orange-600" />
          <h4 className="font-semibold text-gray-900">FAQ</h4>
        </div>
        <div className="bg-orange-50 rounded p-3 border border-orange-200">
          <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
            {outputs.faq}
          </p>
        </div>
      </div>
    </div>
  );
}
