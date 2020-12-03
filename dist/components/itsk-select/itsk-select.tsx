import React, {CSSProperties, useEffect, useState} from 'react';
import {ItskDropdown} from "../itsk-dropdown/itsk-dropdown";
import classNames from 'classnames';
import {ItskDropdownHeader} from '../itsk-dropdown/itsk-dropdown-header';
import {ItskDropdownContent} from '../itsk-dropdown/itsk-dropdown-content';
import {IBaseComponentProps} from '../common';
import {ItskHeadViewBlock} from './itsk-head-view-block';
import {ItskSelectHeadString} from './itsk-select-head-string';
import {ItskSelectBasket} from "./itsk-select-basket";

export interface ItskSelectProps extends IBaseComponentProps{
  /**
   * callback возвращает массив выбранных элементов
   */
  selectCallback: (arg: any) => void
  /**
   * Состояние селекта true/false
   */
  disabled?: boolean
  /**
   * Шаблон или текст выводящийся если нет выбранных данных, по умолчанию пустая строка
   */
  placeholder?: string
  /**
   * Название свойства содержащего текст для отображения
   */
  textRef?: string | number
  /**
   * Название свойства содержащего значения
   */
  valueRef?: any
  /**
   * Данные для отображения
   */
  items?: any[]
  /**
   * Показать под шапкой выбранные элементы
   */
  showBasket?: boolean
  /**
   * Возможность множественного выбора
   */
  multiple: boolean
  /**
   * Подсвечивание выбранных элементов
   */
  selected?: boolean
  /**
   * Добавляет  position: fixed для выпадающей части
   */
  fixed?: boolean
  /**
   * Устанавливает возможность закрытия по нажатию на шапку
   */
  canClose?: boolean
  /**
   * Возвращает состояние селекта открыто/закрыто
   */
  dropdownCallback?: (arg: boolean) => void
  /**
   * Добавляет / удаляет возможность закрываться селекту при выборе
   */
  doesSelectCloseWhenOptionSelected?: boolean
  /**
   * Выбор типа отображения выбранных элементов, строчное и блочное
   */
  headerType?: 'stringItems' | 'viewBlock'
  /**
   * Массив выбранных значений по умолчанию
   */
  initialValue?: any[] | null
  /**
   * Класс для шапки селекта
   */
  headerClassName?: string
  /**
   * Стили для шапки селекта
   */
  headerStyle?: CSSProperties
}

const fetchFromObject = (obj: any, prop: string | number): any => {
  const propTostring = prop.toString()
  if (typeof obj === 'undefined') {
    return null;
  }
  const index = propTostring.indexOf('.');
  if (index > -1) {
    return fetchFromObject(obj[propTostring.substring(0, index)], propTostring.substring(index + 1));
  }

  return obj[prop];
};

export const ItskSelect: React.FC<ItskSelectProps> = ({
                                                        items,
                                                        selectCallback,
                                                        multiple,
                                                        showBasket,
                                                        selected = false,
                                                        textRef = '',
                                                        valueRef = '',
                                                        canClose = true,
                                                        fixed = false,
                                                        dropdownCallback,
                                                        placeholder = '',
                                                        disabled = false,
                                                        doesSelectCloseWhenOptionSelected = false,
                                                        style,
                                                        className = '',
                                                        headerType = 'stringItems',
                                                        initialValue,
                                                        headerClassName = '',
                                                        headerStyle = {}
                                                      }) => {

  const [selectedValues, setSelectedValues] = useState<[string | number, any][]>([]);
  const [itemsOnList, setItemsOnList] = useState<[string | number, any][]>([]);
  const [isSearch, setIsSearch] = useState('');
  const [filteredItemsOnList, setFilteredItemsOnList] = useState<[string | number, any][]>([]);

  useEffect(() => {
    let itemsArray: any[] = [];
    if (!items) {
      throw new Error('Не задан массив items')
    } else if (textRef && valueRef) {
      for (let i = 0; i < items.length; i++) {
        const fetchFromObjectTextRef = fetchFromObject(items[i], textRef);
        const fetchFromObjectValueRef = fetchFromObject(items[i], valueRef);
        if (typeof fetchFromObjectTextRef !== 'string' && typeof fetchFromObjectTextRef !== 'number') {
          throw new Error('textRef должен иметь тип string | number')
        }
        itemsArray = [...itemsArray, [fetchFromObjectTextRef, fetchFromObjectValueRef]];
      }
      setItemsOnList(itemsArray);
    } else if ((textRef && !valueRef) || (!textRef && valueRef)) {
      throw new Error('Не задан textRef или valueRef');
    } else if (!items.length) {
      throw new Error('Передан пустой массив')
    } else if (items) {
      if (typeof items[0] !== "string" && typeof items[0] !== 'number') {
        throw new Error('Требуется массив типа Array<string | number>');
      }
      items.map(item => itemsArray.push([item, item]))
      setItemsOnList(itemsArray);
    }
      if (!initialValue)
        return
      const selectedValuesFromModel:[string | number, any][] = [];
      initialValue.map(value => {
        itemsArray.map(item => {
          item[1] === value
          ? selectedValuesFromModel.push(item)
          : null}
        )
      });
      setSelectedValues(selectedValuesFromModel)
  }, [textRef, valueRef, items, initialValue]);

  const handleClickItem = (item: [string | number, any]) => {
    if (selectedValues.find((selectedValue) => selectedValue[0] === item[0])) {
      handleDeleteItem(item);
      return
    }
    if (multiple) {
      setSelectedValues([...selectedValues, item]);
      selectCallback([...selectedValues, item].map(value => value[1]));
      return
    }
    setSelectedValues([item]);
    selectCallback([item[1]])
  };


  const handleDeleteItem = (deletedValue: any) => {
    const deletedSelectValues = selectedValues.filter((selectedValue: any) => selectedValue[0] !== deletedValue[0]);
    setSelectedValues(deletedSelectValues);
    selectCallback(deletedSelectValues.map(value => value[1]))
  };

  const handleIsSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearch(event.target.value);
    setFilteredItemsOnList(itemsOnList.filter((item) => {
      return typeof item[0] === "string"
        ? item[0].toLowerCase().includes(event.target.value.toLowerCase())
        : item[0].toString().includes(event.target.value.toLowerCase())
    }))
  };

  return (
    <div className={`select ${className}`}
         style={style}>
      <ItskDropdown fixed={fixed}
                    canClose={canClose}
                    changeToggleState={doesSelectCloseWhenOptionSelected}
                    callback={dropdownCallback}
                    disabled={disabled}>
        <ItskDropdownHeader>
          {headerType === 'viewBlock'
            && <ItskHeadViewBlock placeholder={placeholder}
                                  handleDeleteItem={handleDeleteItem}
                                  selectedValues={selectedValues}
                                  headerClassName={headerClassName}
                                  headerStyle={headerStyle}
                                  disabled={disabled}/>
          }
          {headerType === 'stringItems'
            && <ItskSelectHeadString selectedValues={selectedValues}
                                     placeholder={placeholder}
                                     headerClassName={headerClassName}
                                     headerStyle={headerStyle}
                                     disabled={disabled}/>
          }
        </ItskDropdownHeader>

        <ItskDropdownContent>
          <div className='options'>
            <div className='container container_column'>
                {
                  showBasket &&
                  <ItskSelectBasket disabled={disabled} handleDeleteItem={handleDeleteItem} selectedValues={selectedValues}/>
                }
                {itemsOnList.length > 20
                  ?  <div className='padding-3'>
                      <input  className='input__field '
                              type="text"
                              onChange={handleIsSearch}
                              onClick={event => event.stopPropagation()}
                              value={isSearch}/>
                      <span className='select__head__text'>{isSearch && !filteredItemsOnList.length ? "Совпадений - 0" : null}</span>
                    </div>
                  : null}
              <div className='scrollbar'
                   style={{maxHeight: 256}}>
                {(isSearch ? filteredItemsOnList : itemsOnList).map((listItem, index: number) =>
                  <div key={listItem[0]}
                       tabIndex={0}
                       onClick={() => {
                         handleClickItem(isSearch ? filteredItemsOnList[index] : itemsOnList[index])
                       }}
                       className={classNames(`options__item`, {
                         'options__item_active': isSearch
                           ?  (selected && selectedValues
                             .find((selectedValue) => filteredItemsOnList[index] ? filteredItemsOnList[index][0] === selectedValue[0] : null))

                           : (selected && selectedValues
                             .find((selectedValue) => itemsOnList[index] ? itemsOnList[index][0] === selectedValue[0] : null)),
                       })}>
                    <span className='select__head__text'>
                      {isSearch
                        ? filteredItemsOnList[index] ? filteredItemsOnList[index][0] : null
                        : itemsOnList[index] ? itemsOnList[index][0] : null}
                    </span>
                  </div>)}
              </div>
            </div>
          </div>
        </ItskDropdownContent>
      </ItskDropdown>
    </div>
  );
};

