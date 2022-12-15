import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  handleDropFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}
const DragAndDrop:React.FC<Props> = ({ handleDropFile, children }) => {
  const [drag, setDrag] = useState(false);
  let dragCounter = 0;
  function handleDrag(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
  function handleDragIn(event: DragEvent, isMounted: boolean) {
    event.preventDefault();
    event.stopPropagation();
    if (isMounted) {
      dragCounter += 1;
      if (event.dataTransfer?.items && event.dataTransfer.items.length > 0) {
        setDrag(true);
      }
    }
  }

  function handleDragOut(event: DragEvent, isMounted: boolean) {
    event.preventDefault();
    event.stopPropagation();
    if (isMounted) {
      dragCounter -= 1;
      if (dragCounter === 0) {
        setDrag(false);
      }
    }
  }

  function handleDrop(event: DragEvent, isMounted: boolean) {
    event.preventDefault();
    event.stopPropagation();
    if (isMounted) {
      setDrag(false);
      if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        handleDropFile(event.dataTransfer.files[0]);
        event.dataTransfer.clearData();
        dragCounter = 0;
      }
    }
  }
  useEffect(() => {
    let isMounted = true;
    const el = document.body;
    if (isMounted) {
      el.addEventListener('dragenter', (event) => handleDragIn(event, isMounted));
      el.addEventListener('dragleave', (event) => handleDragOut(event, isMounted));
      el.addEventListener('dragover', (event) => handleDrag(event));
      el.addEventListener('drop', (event) => handleDrop(event, isMounted));
    }
    return () => {
      isMounted = false;
      el.removeEventListener('dragenter', (event) => handleDragIn(event, isMounted));
      el.removeEventListener('dragleave', (event) => handleDragOut(event, isMounted));
      el.removeEventListener('dragover', (event) => handleDrag(event));
      el.removeEventListener('drop', (event) => handleDrop(event, isMounted));
    };
  }, []);
  return (
    <div>
      {drag && (
        <DropHere>
          Drop here
        </DropHere>
      )}
      {children}
    </div>
  );
};

export const DropHere = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
  font-size: 5em;
  color: #000;
  background-color: grey;
  opacity: 0.4;
`;

export default DragAndDrop;
