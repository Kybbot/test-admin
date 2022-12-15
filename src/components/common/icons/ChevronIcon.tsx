import React from 'react';

interface Props {
  width?: string;
  height?: string;
  color?: string;
}

const ChevronIcon: React.FC<Props> = ({ width = '25', height = '24', color = '#B4BABF' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 25 24">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <path d="M0 0L23.467 0 23.467 24 0 24z" transform="translate(-320 -363) translate(8 351) translate(312.889 12)" />
              <path fill={color} d="M9.084 6.71c-.382.39-.382 1.02 0 1.41L12.877 12l-3.793 3.88c-.382.39-.382 1.02 0 1.41.38.39.997.39 1.378 0l4.488-4.59c.382-.39.382-1.02 0-1.41L10.462 6.7c-.371-.38-.997-.38-1.378.01z" transform="translate(-320 -363) translate(8 351) translate(312.889 12)" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default ChevronIcon;
