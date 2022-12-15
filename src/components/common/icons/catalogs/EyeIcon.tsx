import React from 'react';

interface Props {
  style?: any;
}

const ShareIcon: React.FC<Props> = ({ style }) => (
  <svg style={style} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <g stroke="#909599" strokeWidth="1.4">
        <g>
          <g>
            <g>
              <g>
                <path d="M10.78 10.78c-1.088.83-2.412 1.289-3.78 1.31C2.545 12.09 0 7 0 7c.792-1.475 1.89-2.764 3.22-3.78m2.444-1.158c.438-.103.886-.154 1.336-.153C11.455 1.91 14 7 14 7c-.386.723-.847 1.403-1.375 2.03M8.35 8.35c-.476.51-1.193.72-1.869.547-.676-.172-1.205-.7-1.377-1.377-.173-.676.037-1.393.548-1.87M0 0L14 14" transform="translate(-240 -668) translate(24 468) translate(204 188) translate(12 12) translate(1 1)" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default ShareIcon;
