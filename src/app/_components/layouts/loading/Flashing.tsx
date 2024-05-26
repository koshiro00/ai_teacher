import React, { ComponentProps } from 'react';

const Flashing: React.FC<ComponentProps<'div'>> = (props) => {
  return (
    <div {...props}>
      <div className="relative inline-flex">
        <div className="h-4 w-4 rounded-full bg-[#40B18F]"></div>
        <div className="absolute left-0 top-0 h-4 w-4 animate-ping rounded-full bg-[#40B18F]"></div>
        <div className="absolute left-0 top-0 h-4 w-4 animate-pulse rounded-full bg-[#40B18F]"></div>
      </div>
    </div>
  );
};

export default Flashing;
