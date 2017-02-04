/// <reference types="react" />
import * as React from "react";
import { IColumn } from "./Interfaces";
import "./TableView.less";
export interface TableViewProps<T> {
    columns: IColumn<T>[];
    items: T[];
    containerClassName?: string;
    tableClassName?: string;
    selectedRows?: number[];
    onRowSelection?: (rowIndex: number) => void;
    onRowLeftMouseClick?: (rowIndex: number) => void;
    onRowRightMouseClick?: (rowIndex: number) => void;
    contextMenu?: React.ReactElement<{
        rows: any;
    }>;
}
export declare class TableView<T> extends React.Component<TableViewProps<T>, any> {
    constructor(props: TableViewProps<T>, context: any);
    componentDidMount(): void;
    private recalculateWidthsAndHeight();
    private processRowSelection(rowIndex);
    private handleRowClick(rowIndex, e);
    private handleRowContextMenu(rowIndex, e);
    private handleCloseContextMenu(e);
    render(): JSX.Element;
}
