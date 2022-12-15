import React from 'react';

interface Props {
  color?: string;
}

const CheckIcon: React.FC<Props> = ({ color = '#21272E' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <path
                d="M0 0L24 0 24 24 0 24z"
                transform="translate(-224 -465) translate(24 430) translate(200 35)"
              />
              <path
                fill={color}
                d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"
                transform="translate(-224 -465) translate(24 430) translate(200 35)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default CheckIcon;
