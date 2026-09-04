import React from 'react';
import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number;
  ratingCount?: string;
  size?: 'sm' | 'md';
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  rating,
  ratingCount,
  size = 'sm',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm border border-gray-100 font-bold text-gray-800 ${
        size === 'sm' ? 'text-[11px]' : 'text-xs px-2.5 py-1'
      }`}
    >
      <span>{rating.toFixed(1)}</span>
      <Star className="w-3 h-3 fill-myntra-teal text-myntra-teal -mt-[1px]" />
      {ratingCount && (
        <>
          <span className="text-gray-300 font-normal">|</span>
          <span className="text-gray-500 font-medium">{ratingCount}</span>
        </>
      )}
    </div>
  );
};
