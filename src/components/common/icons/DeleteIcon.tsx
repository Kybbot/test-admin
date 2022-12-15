import React from 'react';

interface Props {
  color?: string;
}

const LinkIcon: React.FC<Props> = ({ color = '#909599' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <g>
                <g>
                  <path d="M0 0L24 0 24 24 0 24z" transform="translate(-161 -212) translate(145 152) translate(0 52) translate(16 8)" />
                  <path fill={color} fillRule="nonzero" d="M5.071 19.778C5.071 21 6.036 22 7.214 22h8.572c1.178 0 2.143-1 2.143-2.222V8.667c0-1.223-.965-2.223-2.143-2.223H7.214c-1.178 0-2.143 1-2.143 2.223v11.11zM8.286 8.667h6.428c.59 0 1.072.5 1.072 1.11v8.89c0 .61-.482 1.11-1.072 1.11H8.286c-.59 0-1.072-.5-1.072-1.11v-8.89c0-.61.482-1.11 1.072-1.11zM15.25 3.11l-.76-.789c-.194-.2-.472-.322-.75-.322H9.26c-.278 0-.556.122-.75.322l-.76.79H5.071c-.589 0-1.071.5-1.071 1.11 0 .611.482 1.111 1.071 1.111H17.93c.589 0 1.071-.5 1.071-1.11 0-.612-.482-1.112-1.071-1.112H15.25z" transform="translate(-161 -212) translate(145 152) translate(0 52) translate(16 8)" />
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
