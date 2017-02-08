/// <reference types="react" />
import * as React from "react";
import { IColumn, TableItem } from "./Interfaces";
import "./TableView.less";
export interface TableViewProps<E> {
    columns: IColumn<E, any>[];
    items: TableItem<E>[];
    containerClassName?: string;
    tableClassName?: string;
    selectedRows?: number[];
    onRowSelection?: (rowIndex: number) => void;
    onRowLeftMouseClick?: (rowIndex: number) => void;
    onRowRightMouseClick?: (rowIndex: number) => void;
    contextMenu?: React.ReactElement<{
        clearSelection: () => void;
        rows: any;
    }>;
}
export declare class TableView<E> extends React.Component<TableViewProps<E>, any> {
    constructor(props: TableViewProps<E>, context: any);
    componentDidMount(): void;
    private recalculateWidthsAndHeight();
    private processRowSelection(rowIndex);
    private handleRowClick(rowIndex, e);
    private handleRowContextMenu(rowIndex, e);
    private handleCloseContextMenu(e);
    private handleColumnSort(column);
    private clearSelection();
    private handleRowExpand(rowIndex, e);
    render(): JSX.JSXElement;
}
