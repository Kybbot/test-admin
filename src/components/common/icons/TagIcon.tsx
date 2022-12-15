import React from 'react';

interface Props {
  color?: string;
  width?: string;
  height?: string;
}

const TagIcon: React.FC<Props> = ({
  color = '#B4BABF',
  width = '18',
  height = '18',
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <g fill={color} fillRule="nonzero">
        <g>
          <g>
            <g>
              <g transform="translate(-24 -433) translate(24 423) translate(0 10) translate(2 2)">
                <path d="M19.41 9.58l-9-9C10.05.22 9.55 0 9 0H2C.9 0 0 .9 0 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM11 18.01L2 9V2h7v-.01l9 9-7 7.02z" />
                <circle cx="4.5" cy="4.5" r="1.5" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default TagIcon;
