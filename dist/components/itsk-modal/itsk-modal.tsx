import React, {useEffect} from 'react';
import {IBaseComponentProps} from '../common';
import {createPortal} from 'react-dom';

interface ItskModalProps extends IBaseComponentProps{
  handleCloseModal: () => void
  backdrop?: 'modal__backdrop'
  theme?: 'block-work' | 'block-main'
  headerClassName?: string
  footerClassName?: string
  contentClassName?: string
  modalFooter?: React.ReactNode
  modalHeader?: React.ReactNode
}

export const ItskModal: React.FC<ItskModalProps> = ({ backdrop = '',
                                                      theme = '',
                                                      style,
                                                      children,
                                                      className = '',
                                                      handleCloseModal,
                                                      modalFooter,
                                                      headerClassName = '',
                                                      contentClassName = '',
                                                      footerClassName = '',
                                                      modalHeader}) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => { document.body.style.overflowY = 'auto'}
  },[]);

  return createPortal(
    <div className={`modal__window ${className} ${backdrop} ${theme}`}
         tabIndex={-1}
         style={{zIndex: 100}}
         onMouseDown={handleCloseModal}>
      <div className={`modal__container`}
           style={style}
           onClick={event => event.stopPropagation()}
           onMouseDown={event => event.stopPropagation()}>
        {modalHeader
          && <div className={`modal__head ${headerClassName}`}>
              {modalHeader}
             </div>
        }

        <div className={`modal__content ${contentClassName}`}>
          {children}
        </div>
        {modalFooter
          && <div className={`modal__foot ${footerClassName}`}>
              {modalFooter}
             </div>
        }
      </div>
    </div>, document.body);
};
