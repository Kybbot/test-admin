import React from 'react';

interface Props {
  color?: string;
}

const PhoneIcon: React.FC<Props> = ({ color = '#B4BABF' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
  >
    <g
      fill="none"
      fillRule="evenodd"
      fontFamily="SFProText-Heavy, SF Pro Text"
      fontSize="14"
      fontWeight="600"
    >
      <g fill={color}>
        <g>
          <g>
            <g>
              <text transform="translate(-104 -941) translate(17 923) translate(51.824 15) translate(36 3)">
                <tspan x="0" y="13">􀌾</tspan>
              </text>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default PhoneIcon;
