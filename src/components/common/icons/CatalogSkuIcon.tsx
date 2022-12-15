import React from 'react';

interface Props {
  color?: string;
}

const CatalogSkuIcon: React.FC<Props> = ({ color = '#21272E' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <g fill="none" fillRule="evenodd">
      <g fill={color} fillRule="nonzero">
        <g>
          <g>
            <path d="M11.994 0C18.554 0 24 5.446 24 12.006 24 18.566 18.566 24 12.006 24S0 18.566 0 12.006 5.434 0 11.994 0zm4.009 11.71c-1.77 0-3.198 1.405-3.198 3.145S14.233 18 16.003 18c1.769 0 3.197-1.405 3.197-3.145s-1.428-3.145-3.197-3.145zm-4.974.35H6.055c-.196 0-.355.159-.355.355v4.88c0 .197.16.356.355.356h4.974c.196 0 .355-.16.355-.356v-4.88c0-.196-.159-.355-.355-.355zm.878-7.665c-.046.028-.085.068-.114.114L8.524 9.77c-.103.167-.052.386.114.49.057.034.122.053.188.053h6.538c.196 0 .355-.16.355-.355 0-.067-.019-.132-.054-.188l-3.269-5.261c-.103-.167-.322-.218-.489-.114z" transform="translate(-44 -564) translate(24 540) translate(20 24)" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default CatalogSkuIcon;
