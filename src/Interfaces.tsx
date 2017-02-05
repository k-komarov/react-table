export interface IColumn<E, T> {
    header: () => any;
    footer: () => any;
    value: (entity: E) => any;
    width?: string;
    sorting?: boolean;
    sortFunc?: (sortDirection: number, valueFunc: (v: any) => any, a: any, b: any) => number;
}

export class TableItem<E> {
    readonly entity: E;
    readonly children?: E[];

    constructor(item: E, children?: E[]) {
        this.entity = item;
        this.children = children || [];
    }
}