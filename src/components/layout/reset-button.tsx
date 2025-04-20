import { Button } from '@/components/ui/button';

export const ResetButton = (props: React.ComponentProps<'button'>) => {
  return (
    <Button variant="secondary" type="reset" {...props}>
      Cancelar
    </Button>
  );
};
