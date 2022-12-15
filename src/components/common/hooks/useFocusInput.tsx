import React, { useRef } from 'react';

export default (): [React.MutableRefObject<any>, () => void] => {
  const inputRef = useRef<HTMLInputElement>();

  const handlerFocusInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw ('No input ref');
    }
  };

  return [inputRef, handlerFocusInput];
};
