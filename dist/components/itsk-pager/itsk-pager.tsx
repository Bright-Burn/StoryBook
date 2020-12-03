import React, {useState} from 'react';
import {pagerType} from "./pager-type";
import {IBaseComponentProps} from '../common';
import { ItskIcon } from '../itsk-icon/itskIcon';

interface ItskPagerProps extends IBaseComponentProps{
  // pagesCount?: string;
  // recordsCount?: string;
  paging?: pagerType
  pageSizeList?: number[]
  pageSizeCallback: (size: number) => void
  pageNumberCallback: (page: number) => void
  arrowLeftCallback: () => void
  arrowRightCallback: () => void
}

export const ItskPager: React.FC<ItskPagerProps> = ({ paging = {},
                                                      pageSizeList = [25, 50, 75, 100],
                                                      pageSizeCallback,
                                                      pageNumberCallback,
                                                      arrowLeftCallback,
                                                      arrowRightCallback,
                                                      className,
                                                      style}) => {
  const [togglePageSizeList, setTogglePageSizeList] = useState(false);

  const getPagesArray = (pages: number[], currentPage: number): number[] => {
    let result: number[] = [];
    if (currentPage <= 3) {
      result = pages.filter(page => page <= 4)
    } else if (pages.length <= 5) {
      result = pages
    } else if (currentPage >= pages.length - 2) {
      result = pages.filter(page => page >= pages.length - 5)
    } else {
      result = pages.filter(page => (page <= currentPage + 2) && (page >= currentPage - 2))
    }
    return result
  };
  const pagesArray = [];
  let count: number = paging.count !== undefined ? paging.count : 0;
  if (!paging.count && paging.totalCount && paging.pageSize) {
    count = paging.totalCount / paging.pageSize
  }
  for (let i = 0; i < count; i++)
    pagesArray.push(i);
  const onTogglePageList = () => setTogglePageSizeList(!togglePageSizeList)
  return (
    <div className={`pager ${className}`}
         style={style}>
      <button className="pager__button__move"
              onClick={arrowLeftCallback}>
        <ItskIcon icon={'chevron_left-arrow-outline'} className={'icon'}/>
      </button>
      {paging.page !== undefined && getPagesArray(paging.pages || pagesArray, paging.page).map(page =>
        <div
          className={`pager__button__page ${paging.page !== undefined && (paging.page === page) && 'pager__button__page_active'}`}
          key={page}
          onClick={() => pageNumberCallback(page)}>
          {page + 1}
        </div>)}

      <button className="pager__button__move"
              onClick={arrowRightCallback}>
        <ItskIcon icon={'chevron_right-arrow-outline'} className={'icon'}/>
      </button>

      <div className='display-inline-block margin-l-4'>
        Размер страницы
        <div className='position-relative display-inline-block margin-l-2'>
          <div className='pager__button__count container align-center'
               onClick={onTogglePageList}>
            <span>{paging.pageSize}</span>
            <ItskIcon icon={'chevron_down-arrow-outline'} className={'margin-l-2 icon'}/>
          </div>
          {togglePageSizeList &&
          <span className='pager__dropdown'>
                        {pageSizeList.map(size =>
                          <button className="pager__button__page"
                                  key={size}
                                  onClick={() => {
                                    pageSizeCallback(size);
                                    setTogglePageSizeList(!togglePageSizeList)
                                  }}>
                            {size}
                          </button>)}
                    </span>}
        </div>

        {paging.count && <div className='display-inline-block margin-l-3'> Всего страниц: {paging.count} </div>}
        {paging.totalCount !== null && paging.totalCount !== undefined && paging.totalCount > 0 ?
          <div className='display-inline-block margin-l-3'>
            Количество записей: {paging.totalCount}
          </div>
          : null}

      </div>

    </div>
  );
};

