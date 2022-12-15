import React from 'react';

interface Props {
  color?: string;
}

const LinkIcon: React.FC<Props> = ({ color = '#909599' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <g stroke={color} strokeWidth="2">
        <g>
          <g>
            <g>
              <g>
                <g>
                  <path d="M13.333 8.889v5.333c0 .982-.796 1.778-1.777 1.778H1.778C.796 16 0 15.204 0 14.222V4.444c0-.981.796-1.777 1.778-1.777H7.11M10.667 0L16 0 16 5.333M6.222 9.778L16 0" transform="translate(-161 -168) translate(145 152) translate(0 8) translate(16 8) translate(5 4)" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default LinkIcon;
