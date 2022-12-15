import React from 'react';

interface Props {
  color?: string;
  width?: string;
  height?: string;
}

const Edit2Icon: React.FC<Props> = ({
  color = 'rgb(180, 186, 191)',
  width = '24',
  height = '24',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-edit-3"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

export default Edit2Icon;
