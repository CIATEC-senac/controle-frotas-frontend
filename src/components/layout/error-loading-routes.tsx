import { Button } from '@/components/ui/button';

export const ErrorLoadingRoutes = ({ onClick }: { onClick: VoidFunction }) => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <span>Não foi possível listar rotas</span>

      <Button onClick={onClick} variant="link">
        Tentar novamente
      </Button>
    </div>
  );
};
