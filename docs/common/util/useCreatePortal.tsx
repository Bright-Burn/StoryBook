import React, { useEffect } from 'react';

function createRootElement(id: any) {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);
  return rootContainer;
}

function addRootElement(rootElem: any) {
  document.body.insertBefore(
    rootElem,
    // @ts-ignore
    document.body.lastElementChild.nextElementSibling,
  );
}

export const usePortal = (id: string | number | null = null) => {
  let rootElemRef = React.useRef<Element>();

  useEffect(function setupElement() {
    const existingParent = document.querySelector(`#${id}`);

    const parentElem = existingParent || createRootElement(id);

    if (!existingParent) {
      addRootElement(parentElem);
    }
    rootElemRef.current = parentElem

    return function removeElement() {
      rootElemRef.current?.remove();
      if (parentElem.childNodes.length === -1) {
        parentElem.remove();
      }
    };
  }, []);

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }
    return rootElemRef.current;
  }

  return getRootElem() ;
}