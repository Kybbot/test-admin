import React from 'react';

interface Props {
  color?: string;
}

const ShareIcon: React.FC<Props> = ({ color = '#21272E' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <g>
                <path d="M0 0L24 0 24 24 0 24z" transform="translate(-312 -120) translate(0 96) translate(312 24)" />
                <path fill={color} d="M18 16.137c-.76 0-1.44.3-1.96.773l-7.13-4.167c.05-.231.09-.462.09-.703 0-.24-.04-.472-.09-.703l7.05-4.126c.54.502 1.25.813 2.04.813 1.66 0 3-1.345 3-3.012S19.66 2 18 2s-3 1.345-3 3.012c0 .241.04.472.09.703L8.04 9.84C7.5 9.34 6.79 9.028 6 9.028c-1.66 0-3 1.345-3 3.012s1.34 3.012 3 3.012c.79 0 1.5-.311 2.04-.813l7.12 4.177c-.05.21-.08.431-.08.652C15.08 20.685 16.39 22 18 22c1.61 0 2.92-1.315 2.92-2.932 0-1.616-1.31-2.931-2.92-2.931z" transform="translate(-312 -120) translate(0 96) translate(312 24)" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default ShareIcon;
