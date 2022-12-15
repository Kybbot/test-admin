import React from 'react';

interface Props {
  color ? : string;
}

const AcademyIcon: React.FC < Props > = ({ color = '#FEAA22' }) => (
  <svg
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="24px"
    height="24px"
    viewBox="0 0 965.726 965.726"
  >
    <g>
      <g>
        <path color={color} d="M766.601,628.012v-158.1l-253.101,50.9c-10,2-20.3,3-30.6,3s-20.5-1-30.6-3l-253.101-50.9v158.1c0,40.9,127,74.101,283.7,74.101S766.601,669.012,766.601,628.012z" />
        <path color={color} d="M945.7,354.312l-438.1-88.2c-8.101-1.6-16.4-2.5-24.7-2.5s-16.5,0.8-24.7,2.5l-438.1,88.2c-26.801,5.4-26.801,43.6,0,49l179.1,36l259,52.1c8.101,1.6,16.4,2.5,24.7,2.5s16.5-0.8,24.7-2.5l259-52.1l80.6-16.2v187.399c-9.5,8.301-15.5,20.601-15.5,34.2c0,25.101,20.4,45.5,45.5,45.5c25.101,0,45.5-20.399,45.5-45.5c0-13.7-6-25.899-15.5-34.2v-199.5l38.5-7.699C972.4,397.913,972.4,359.712,945.7,354.312z" />
      </g>
    </g>
  </svg>
);

export default AcademyIcon;
