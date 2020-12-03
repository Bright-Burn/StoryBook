import {useEffect} from 'react';

export const useGridCallback = (callback: () => void, dep: any, condition: boolean) => {
  useEffect(() => {
    if (condition)
      callback()
  }, [dep]);
};
