import { cx } from '../../utils/cx';

export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cx("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  );
};
