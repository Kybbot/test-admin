import React from 'react';

interface Props {
  color?: string;
}

const PencilIcon: React.FC<Props> = ({ color = '#21272E' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <path d="M0 0L24 0 24 24 0 24z" transform="translate(-24 -363) translate(8 351) translate(16 12)" />
              <path fill={color} d="M4 16.854v2.702c0 .248.196.444.444.444h2.702c.116 0 .231-.044.311-.133l9.706-9.697-3.333-3.333-9.697 9.697c-.089.089-.133.195-.133.32zm15.74-9.261c.347-.347.347-.907 0-1.253l-2.08-2.08c-.346-.347-.906-.347-1.253 0l-1.626 1.626 3.333 3.333 1.626-1.626z" transform="translate(-24 -363) translate(8 351) translate(16 12)" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default PencilIcon;
