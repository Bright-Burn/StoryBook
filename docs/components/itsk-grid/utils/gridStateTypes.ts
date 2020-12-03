import { StringFilterType } from "./enum/string-filter-type.enum"
import {ListFilterType} from "./enum/list-filter-type.enum";
import {pagerType} from "../../itsk-pager/pager-type";

export type gridState = {
    stringFilters: StringFilter[]
    numericFilters: NumericFilter[]
    dateFilters: DateFilter[]
    listFilters: ListFilter[]
    sortParams: SortParam[]
    paging: pagerType

}

type StringFilter = {
    value?: string;
    type?: StringFilterType;
    fieldName: string | undefined;
    name: string;
}

type NumericFilter = {
    fieldName: string | undefined;
    name: string;
    strict: boolean
    value: {
        equalsTo: number | null,
        greaterThan: number | null,
        lessThan: number | null
    }
}
type ListFilter = {
    fieldName: string | undefined;
    name: string;
    type: ListFilterType | undefined
    value: any[]
}

type DateFilter = {
    fieldName: string | undefined;
    name: string;
    value: {
        greaterThan: number | null,
        lessThan: number | null
    }
}

type SortParam = {
    asc: boolean
    field: string
}
