import React from 'react';
import { cx } from '../../utils/cx';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'Filing' | 'Evidence' | 'Arguments' | 'Order Reserved' | 'Low' | 'Medium' | 'High' | 'Pending' | 'Completed' | 'default';
};

export const Badge = ({ variant = 'default', className, children, ...props }: BadgeProps) => {
  const baseStyles = "px-2.5 py-0.5 inline-flex items-center rounded-full text-xs font-medium";
  
  const variants = {
    'Filing': "bg-blue-100 text-blue-800",
    'Evidence': "bg-orange-100 text-orange-800",
    'Arguments': "bg-purple-100 text-purple-800",
    'Order Reserved': "bg-green-100 text-green-800",
    'High': "bg-red-100 text-red-800",
    'Medium': "bg-yellow-100 text-yellow-800",
    'Low': "bg-green-100 text-green-800",
    'Pending': "bg-gray-100 text-gray-800",
    'Completed': "bg-green-100 text-green-800",
    'default': "bg-gray-100 text-gray-800",
  };

  return (
    <span className={cx(baseStyles, variants[variant] || variants.default, className)} {...props}>
      {children}
    </span>
  );
};
