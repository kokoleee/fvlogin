import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const FVBankLogo: React.FC<IconProps> = ({ size = 32, className, ...props }) => {
  return (
    <svg
      width={size * 3.5}
      height={size}
      viewBox="0 0 140 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Polished Shield Icon */}
      <path
        d="M2 4C2 2.89543 2.89543 2 4 2H18C20.2091 2 22 3.79086 22 6V16C22 22.6274 16.6274 28 10 28C3.37258 28 2 22.6274 2 16V4Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 8H16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M6 13H14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M6 18L10 22L18 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* FV BANK brand typography with bold geometric weight */}
      <text
        x="29"
        y="21"
        fill="currentColor"
        fontSize="17"
        fontWeight="800"
        letterSpacing="0.05em"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        FV BANK
      </text>
    </svg>
  );
};

export const USFlag: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-full shadow-sm object-cover ${className}`}
      style={{ minWidth: size, minHeight: size }}
    >
      <mask id="circleMask" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <circle cx="12" cy="12" r="12" fill="#FFFFFF" />
      </mask>
      <g mask="url(#circleMask)">
        {/* White base */}
        <rect width="24" height="24" fill="#FFFFFF" />
        
        {/* Red stripes */}
        <rect y="0" width="24" height="1.84" fill="#BD3D44" />
        <rect y="3.68" width="24" height="1.84" fill="#BD3D44" />
        <rect y="7.36" width="24" height="1.84" fill="#BD3D44" />
        <rect y="11.04" width="24" height="1.84" fill="#BD3D44" />
        <rect y="14.72" width="24" height="1.84" fill="#BD3D44" />
        <rect y="18.4" width="24" height="1.84" fill="#BD3D44" />
        <rect y="22.08" width="24" height="1.92" fill="#BD3D44" />
        
        {/* Blue field */}
        <rect x="0" y="0" width="12" height="11.5" fill="#192F5D" />
        
        {/* Stars (Simplified star grid for micro scale) */}
        <circle cx="2.5" cy="2.5" r="0.4" fill="#FFFFFF" />
        <circle cx="5" cy="2.5" r="0.4" fill="#FFFFFF" />
        <circle cx="7.5" cy="2.5" r="0.4" fill="#FFFFFF" />
        <circle cx="10" cy="2.5" r="0.4" fill="#FFFFFF" />
        
        <circle cx="3.75" cy="4.5" r="0.4" fill="#FFFFFF" />
        <circle cx="6.25" cy="4.5" r="0.4" fill="#FFFFFF" />
        <circle cx="8.75" cy="4.5" r="0.4" fill="#FFFFFF" />
        
        <circle cx="2.5" cy="6.5" r="0.4" fill="#FFFFFF" />
        <circle cx="5" cy="6.5" r="0.4" fill="#FFFFFF" />
        <circle cx="7.5" cy="6.5" r="0.4" fill="#FFFFFF" />
        <circle cx="10" cy="6.5" r="0.4" fill="#FFFFFF" />
        
        <circle cx="3.75" cy="8.5" r="0.4" fill="#FFFFFF" />
        <circle cx="6.25" cy="8.5" r="0.4" fill="#FFFFFF" />
        <circle cx="8.75" cy="8.5" r="0.4" fill="#FFFFFF" />
      </g>
    </svg>
  );
};

export const BitcoinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="12" fill="#F7931A" />
      <path
        d="M15.75 10.125C15.75 8.125 14.125 7.625 12.625 7.375V5H11.375V7.25H10.125V5H8.875V7.28125C8.5 7.28125 8 7.25 7.5 7.25V8.5C7.9 8.5 8.125 8.375 8.5 8.5V15.5C8.125 15.625 7.9 15.5 7.5 15.5V16.75H10.125V19H11.375V16.75H12.625V19H13.875V16.7188C15.375 16.4688 17 15.625 17 13.5C17 11.875 15.875 11 15.75 10.125ZM10.125 8.5H12.25C13.25 8.5 14 8.875 14 9.75C14 10.625 13.25 11 12.25 11H10.125V8.5ZM10.125 15.5V12.25H12.75C13.75 12.25 14.5 12.625 14.5 13.625C14.5 14.625 13.75 15.5 12.75 15.5H10.125Z"
        fill="white"
      />
    </svg>
  );
};

export const EthereumIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="12" fill="#3C3C3D" />
      <g opacity="0.9">
        {/* Eth diamond top central */}
        <path d="M12 4.5L11.85 5V12L12 12.15L15 10L12 4.5Z" fill="#C3C3C3" />
        <path d="M12 4.5L9 10L12 12.15V5L12 4.5Z" fill="#EDEDED" />
        <path d="M12 12.85V18.5L12.07 18.25L15 13.5L12 12.85Z" fill="#A4A4A4" />
        <path d="M12 18.5V12.85L9 13.5L12 18.5Z" fill="#C3C3C3" />
        <path d="M12 12.15L15 10L12 8.5V12.15Z" fill="#8C8C8C" />
        <path d="M9 10L12 12.15V8.5L9 10Z" fill="#A4A4A4" />
      </g>
    </svg>
  );
};

export const USDCIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="12" fill="#2775CA" />
      <circle cx="12" cy="12" r="9.5" stroke="white" strokeWidth="1" strokeDasharray="1.5 1.5" />
      {/* S outline symbol for USD Coin */}
      <path
        d="M10.8 15.2C10.8 15.8 11.2 16.1 11.9 16.1C12.7 16.1 13.2 15.6 13.2 14.9C13.2 13.2 10.5 13.4 10.5 11.5C10.5 10.5 11.2 9.8 12.2 9.8C12.8 9.8 13.4 10.1 13.6 10.6"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M13.2 8.8C13.2 8.2 12.8 7.9 12.1 7.9C11.3 7.9 10.8 8.4 10.8 9.1C10.8 10.8 13.5 10.6 13.5 12.5C13.5 13.5 12.8 14.2 11.8 14.2C11.2 14.2 10.6 13.9 10.4 13.4"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line x1="12" y1="6.5" x2="12" y2="17.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
};
