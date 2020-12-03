import React, { useEffect } from 'react';

export const useOnClickOutside = (ref: React.RefObject<HTMLElement>, handler: (event: React.MouseEvent<HTMLElement>) => void) => {
  useEffect(
    () => {
      const listener = (event: any) => {
        if (ref && (!ref.current || ref.current.contains(event.target))) {
          return;
        }
        handler(event);
      };

      document.addEventListener('mousedown', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
      };
    },
    [ref, handler]
  );
};

