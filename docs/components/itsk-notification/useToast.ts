import { useContext } from 'react';
import {ToastContext} from './itsk-toast-notification-context';

export const useToast = () => {
  const context = useContext(ToastContext);
  return { add: context.add };
};

