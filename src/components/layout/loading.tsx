import { cn } from '@/lib/utils';

export type LoadingAttr = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  loading: boolean;
};

export const Loading = ({ loading, className, ...props }: LoadingAttr) => {
  return (
    <div className={cn(className, 'h-1.5 w-full overflow-hidden')} {...props}>
      {loading && (
        <div className="progress w-full h-full bg-white left-right"></div>
      )}
    </div>
  );
};
