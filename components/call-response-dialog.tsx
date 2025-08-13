import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Phone } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useRouter } from 'next/navigation';
import { TypeCall } from '@/app/calls/page';
import { TypeLead } from '@/app/leads/page';

export function CallResponseDialog(props: {
  callDetails: TypeCall | TypeLead;
  buttonClassName?: string | undefined;
  onSave?: (outcome: string) => void; // <-- add this
}) {
  const router = useRouter();
  const [selectedOutcome, setSelectedOutcome] = useState<string>('');
  const [saved, setSaved] = useState(false);

  const handleCallClick = () => {
    router.push(`tel:${props.callDetails.phone}`);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (props.onSave) {
      props.onSave(selectedOutcome);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={props.buttonClassName}
          size="sm"
          onClick={handleCallClick}
        >
          <Phone className="h-4 w-4 mr-2" />
          Call Back
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How did your call go?</DialogTitle>
          <form
            className="flex flex-col gap-4 items-center mt-5"
            onSubmit={handleSave}
          >
            <Select
              name="choices"
              value={selectedOutcome}
              onValueChange={setSelectedOutcome}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="How was your call" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Busy">Busy</SelectItem>
                <SelectItem value="Callback">Callback</SelectItem>
                <SelectItem value="Intrested">Intrested</SelectItem>
                <SelectItem value="NoAnswer">No Answer</SelectItem>
                <SelectItem value="NotIntrested">Not Intrested</SelectItem>
                <SelectItem value="Sale">Sale</SelectItem>
                <SelectItem value="WrongNumber">Wrong Number</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" disabled={!selectedOutcome}>
              Save
            </Button>
            {saved && (
              <span className="text-green-600 text-sm mt-2">Saved!</span>
            )}
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
