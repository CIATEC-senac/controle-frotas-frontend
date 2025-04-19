import { cn } from '@/lib/utils';

export type LoadingAttr = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  loading: boolean;
};

export const FormLoading = ({ loading, className, ...props }: LoadingAttr) => {
  const containerClassName =
    'h-1.5 w-full overflow-hidden mb-6 ml-[-24px] mr-[-24px]';

  const style = {
    width: 'calc(100% + 48px)',
    backgroundColor: 'var(--primary-background)',
  };

  return (
    <div className={cn(className, containerClassName)} style={style} {...props}>
      {loading && (
        <div className="progress w-full h-full bg-primary left-right"></div>
      )}
    </div>
  );
};
