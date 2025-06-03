import { type FC, useState, type FormEvent, type ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AddChannelPayload } from '@/types/store';

interface NewStoreFormProps {
  onSubmit: (payload: AddChannelPayload) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const NewStoreForm: FC<NewStoreFormProps> = ({ onSubmit, onCancel, isSubmitting }) => {
  const [channelName, setChannelName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!channelName.trim()) {
      setError('Channel Name is required.');
      return;
    }

    await onSubmit({ channelName: channelName.trim(), description: description.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="channelName" className="block mb-2">
          Channel Name <span className="text-destructive">*</span>
        </Label>
        <Input 
          id="channelName" 
          value={channelName} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setChannelName(e.target.value)} 
          placeholder="Enter channel name"
          disabled={isSubmitting}
        />
        {error && <p className="text-sm text-destructive mt-1">{error}</p>}
      </div>
      <div>
        <Label htmlFor="description" className="block mb-2">
          Description
        </Label>
        <Input 
          id="description" 
          value={description} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} 
          placeholder="(optional)"
          disabled={isSubmitting}
        />
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Channel'}
        </Button>
      </div>
    </form>
  );
}; 