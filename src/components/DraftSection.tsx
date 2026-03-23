import { FileText } from 'lucide-react';

interface DraftSectionProps {
  draft: string | null;
}

export default function DraftSection({ draft }: DraftSectionProps) {
  if (!draft) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 border border-dashed border-gray-300">
        <p className="text-gray-500 italic text-sm">Waiting for draft generation...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Content Draft</h3>
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
          {draft}
        </p>
      </div>
    </div>
  );
}
