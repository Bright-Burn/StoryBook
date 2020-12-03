import React, {useRef} from 'react';
import {IBaseComponentProps} from '../common';

interface ItskFileUplaodProps extends IBaseComponentProps{
  multiple?: boolean
  disabled?: boolean
  onUpload: (FileList: FileList | null, inputRef?: HTMLInputElement | null) => void
  contentClassName?: string
  id?: string
  onDelete?: () => void
}

export const ItskFileUpload: React.FC<ItskFileUplaodProps> = ({children, id = '', contentClassName, style, className, multiple, onUpload, disabled}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpload(e.target.files, inputRef.current)
  };

  const dragEnter = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const dragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const onDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();

    onUpload(e.dataTransfer.files, inputRef.current)
  };
  return (
    <div className={`file-upload ${className}`}
         style={style} >
      <label htmlFor="fileUpload" className={'file-upload__label'}>
        <input multiple={multiple}
               ref={inputRef}
               id={id}
               disabled={disabled}
               draggable={'true'}
               onDragEnter={dragEnter}
               onDragOver={dragOver}
               onDrop={onDrop}
               onChange={onChange}
               type="file"
               className={'file-upload__input'}
               name='fileUpload'/>
        <div className={`file-upload__content ${contentClassName}`}>
            {children}
        </div>
      </label>
    </div>
  );
};

