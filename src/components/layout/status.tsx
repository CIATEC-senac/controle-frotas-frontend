export const Status = ({ status }: { status: boolean }) => {
  if (status) {
    return (
      <span className="text-green-600 bg-green-100 rounded-2xl py-1 px-3">
        Ativo
      </span>
    );
  }

  return (
    <span className="text-gray-600 bg-gray-100 rounded-2xl py-1 px-3">
      Inativo
    </span>
  );
};
