import React from 'react';

interface Props {
  color?: string;
}

const TruckIcon: React.FC<Props> = ({ color = '#B4BABF' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <g>
                <path d="M0 0L24 0 24 24 0 24z" transform="translate(-24 -506) translate(24 423) translate(0 73) translate(0 10)" />
                <path fill={color} fillRule="nonzero" d="M20.727 8.25h-3.272V4H2.182C.982 4 0 4.956 0 6.125v11.688h2.182C2.182 19.575 3.644 21 5.455 21c1.81 0 3.272-1.424 3.272-3.188h6.546c0 1.764 1.462 3.188 3.272 3.188 1.811 0 3.273-1.424 3.273-3.188H24V12.5l-3.273-4.25zm-.545 1.594L22.32 12.5h-4.865V9.844h2.727zM5.455 18.875c-.6 0-1.091-.478-1.091-1.063 0-.584.49-1.062 1.09-1.062.6 0 1.091.478 1.091 1.063 0 .584-.49 1.062-1.09 1.062zm2.421-3.188c-.6-.648-1.45-1.062-2.421-1.062-.971 0-1.822.414-2.422 1.063h-.851V6.124h13.09v9.563H7.877zm10.67 3.188c-.6 0-1.091-.478-1.091-1.063 0-.584.49-1.062 1.09-1.062.6 0 1.091.478 1.091 1.063 0 .584-.49 1.062-1.09 1.062z" transform="translate(-24 -506) translate(24 423) translate(0 73) translate(0 10)" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default TruckIcon;
