import { Button } from '@/components/ui/button';

export const SaveButton = (props: React.ComponentProps<'button'>) => {
  return (
    <Button type="submit" {...props}>
      Salvar
    </Button>
  );
};
