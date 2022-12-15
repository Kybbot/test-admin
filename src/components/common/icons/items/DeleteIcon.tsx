import React from 'react';

interface Props {
  color ? : string;
}

const DeleteIcon: React.FC<Props> = ({ color = '#FEAA22' }) => (
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
                transform="translate(-24 -1046) translate(8 1034) translate(16 12)"
              />
              <path
                fill={color}
                fillRule="nonzero"
                d="M6.857 18.222C6.857 19.2 7.63 20 8.571 20h6.858c.942 0 1.714-.8 1.714-1.778V9.333c0-.977-.772-1.777-1.714-1.777H8.57c-.942 0-1.714.8-1.714 1.777v8.89zM17.143 4.89H15l-.609-.631c-.154-.16-.377-.258-.6-.258H10.21c-.223 0-.446.098-.6.258L9 4.888H6.857c-.471 0-.857.4-.857.89 0 .489.386.889.857.889h10.286c.471 0 .857-.4.857-.89 0-.488-.386-.888-.857-.888z"
                transform="translate(-24 -1046) translate(8 1034) translate(16 12)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default DeleteIcon;
