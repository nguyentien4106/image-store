import React from 'react';
import { Progress } from '@/types'; // Assuming this is the correct type
import { X, DownloadCloud } from 'lucide-react'; // Icons for UI

interface DownloadProgressItemProps {
  item: Progress;
  onCancel: (id: string) => void; // Function to call when a download is cancelled
}

const DownloadProgressItem: React.FC<DownloadProgressItemProps> = ({ item, onCancel }) => {
  if (item.type !== 'download') {
    return null; // Or handle other types if necessary
  }

  return (
    <div className="bg-card p-3 rounded-lg shadow-lg mb-2 flex items-center justify-between max-w-sm">
      <div className="flex items-center overflow-hidden mr-2">
        <DownloadCloud className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-medium truncate" title={item.name}>
            {item.name}
          </span>
          <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-1">
            <div
              className="bg-primary h-1.5 rounded-full"
              style={{ width: `${item.progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-muted-foreground mt-0.5">
            {item.progress?.toFixed(2)}%
          </span>
        </div>
      </div>
      <button
        onClick={() => onCancel(item.id)}
        className="text-muted-foreground hover:text-destructive p-1"
        title="Cancel download"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default DownloadProgressItem; 