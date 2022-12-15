import React from 'react';

interface Props {
  color?: string;
}

const SmallArrowIcon: React.FC<Props> = ({ color = '#B4BABF' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <path
                d="M0 0L16 0 16 16 0 16z"
                transform="translate(-324 -208) translate(0 184) translate(324 24)"
              />
              <path
                fill={color}
                d="M5.267 3.263c-.356.35-.356.914 0 1.263L8.802 8l-3.535 3.474c-.356.35-.356.914 0 1.263.355.35.929.35 1.284 0l4.182-4.11c.356-.35.356-.914 0-1.263l-4.182-4.11c-.346-.341-.93-.341-1.284.008z"
                transform="translate(-324 -208) translate(0 184) translate(324 24)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default SmallArrowIcon;
