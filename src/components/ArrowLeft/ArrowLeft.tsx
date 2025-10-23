import React from 'react';
import './ArrowLeft.scss';

interface ArrowLeftProps {
  className?: string;
  onClick?: () => void;
  size?: number;
}

export const ArrowLeft: React.FC<ArrowLeftProps> = ({
  onClick,
  size = 32
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className="module__arrow"
      onClick={onClick}
    >
      <path
        d="M20 24L12 16L20 8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="30"
        y1="16"
        x2="13"
        y2="16"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
};