import { Button } from '@/components/ui/button';

export const FetchError = ({
  onClick,
  message,
  action,
}: {
  onClick: VoidFunction;
  message: string;
  action?: string;
}) => {
  return (
    <div className="flex flex-col gap-3 items-center my-12">
      <span>{message}</span>

      <Button onClick={onClick} variant="link">
        {action ?? 'Tentar novamente'}
      </Button>
    </div>
  );
};
