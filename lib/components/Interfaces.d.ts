export interface IRow<T> {
}
export interface IColumn<T> {
    header: () => string;
    footer: () => string;
    value: (item: T) => any;
    width?: string;
}
