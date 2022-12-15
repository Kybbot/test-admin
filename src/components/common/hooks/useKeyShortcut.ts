import { useEffect, useState } from 'react';

export default (firstTargetKey: string, secondTargetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const openCloseSearch = (e: KeyboardEvent) => {
    if (e.metaKey && e.code === secondTargetKey) {
      setKeyPressed(true);
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', openCloseSearch);

    return () => {
      window.removeEventListener('keydown', openCloseSearch);
    };
  }, []);

  return keyPressed;
};
