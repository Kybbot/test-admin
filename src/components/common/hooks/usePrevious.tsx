import React from 'react';

export default (value: any) => {
  const ref = React.useRef<any>();

  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
