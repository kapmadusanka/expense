import React from 'react';

const Button = React.forwardRef<HTMLInputElement, any>(({ ...rest }, ref) => {
    return <button className={` ${rest?.customClass} w-full text-primary-50 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}  {...rest} ref={ref}  text={rest?.text} />;
  });

export default Button;
