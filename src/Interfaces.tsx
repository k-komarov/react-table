export interface IColumn<T> {
    header: () => string;
    footer: () => string;
    value: (item: T) => any;
    width?: string;
    sorting?: boolean;
    sortFunc?: (sortDirection: number, valueFunc: (v: any) => any, a: any, b: any) => number;
}