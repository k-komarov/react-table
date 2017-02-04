export interface IColumn<T> {
    header: () => string;
    footer: () => string;
    value: (item: T) => any;
    width?: string;
    sort?: (sortDirection: number, valueFunc: (v: any) => any, a: any, b: any) => number;
}
