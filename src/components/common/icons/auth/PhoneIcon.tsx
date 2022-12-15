import React from 'react';

interface Props {
  color?: string;
}

const PhoneIcon: React.FC<Props> = ({ color = '#B4BABF' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <path
                d="M0 0L24 0 24 24 0 24z"
                transform="translate(-296 -382) translate(96 347) translate(200 35)"
              />
              <path
                fill={color}
                d="M18.432 14.91l-2.262-.257c-.543-.063-1.078.124-1.46.507l-1.64 1.64c-2.52-1.283-4.587-3.34-5.87-5.87L8.85 9.282c.383-.383.57-.918.507-1.461l-.258-2.244C8.991 4.677 8.234 4 7.326 4H5.785c-1.007 0-1.844.837-1.782 1.844.472 7.606 6.556 13.68 14.153 14.153 1.007.062 1.844-.775 1.844-1.782v-1.54c.009-.9-.668-1.657-1.568-1.764z"
                transform="translate(-296 -382) translate(96 347) translate(200 35)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default PhoneIcon;
