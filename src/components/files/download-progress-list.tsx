import React from 'react';
import { Progress } from '@/types'; // Assuming this is the correct type for download progress items
import DownloadProgressItem from './download-progress-item';

interface DownloadProgressListProps {
  downloads: Progress[];
  onCancelDownload: (id: string) => void; // Callback for when a download is cancelled
}

const DownloadProgressList: React.FC<DownloadProgressListProps> = ({ downloads, onCancelDownload }) => {
  if (!downloads || downloads.length === 0) {
    return null;
  }

  // Filter for items that are explicitly downloads, if the Progress type is shared
  const downloadItems = downloads.filter(item => item.type === 'download');

  if (downloadItems.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <h3 className="text-lg font-semibold mb-2 text-right mr-2">Downloads</h3>
      {downloadItems.map((item) => (
        <DownloadProgressItem
          key={item.id}
          item={item}
          onCancel={onCancelDownload}
        />
      ))}
    </div>
  );
};

export default DownloadProgressList; 