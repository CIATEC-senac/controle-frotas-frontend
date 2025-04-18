import React from 'react';

import { SkeletonCard } from './skeleton-card';

export const SkeletonGrid = ({ length = 3 }: { length?: number }) => {
  return (
    <React.Fragment>
      {new Array(length).fill(1).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </React.Fragment>
  );
};
