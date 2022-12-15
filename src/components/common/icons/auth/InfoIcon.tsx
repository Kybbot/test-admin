import React from 'react';

interface Props {
  color ? : string;
}

const InfoIcon: React.FC<Props> = ({ color = '#21272E' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 28 28"
  >
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <path
                d="M0 0L28 0 28 28 0 28z"
                transform="translate(-41 -346) translate(25 330) translate(16 16)"
              />
              <path
                fill={color}
                d="M12.833 8.167h2.334V10.5h-2.334V8.167zm0 4.666h2.334v7h-2.334v-7zM14 2.333C7.56 2.333 2.333 7.56 2.333 14c0 6.44 5.227 11.667 11.667 11.667 6.44 0 11.667-5.227 11.667-11.667C25.667 7.56 20.44 2.333 14 2.333zm0 21c-5.145 0-9.333-4.188-9.333-9.333 0-5.145 4.188-9.333 9.333-9.333 5.145 0 9.333 4.188 9.333 9.333 0 5.145-4.188 9.333-9.333 9.333z"
                transform="translate(-41 -346) translate(25 330) translate(16 16)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default InfoIcon;
