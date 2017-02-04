import * as React from "react";
import {IColumn} from "./Interfaces";
import "./TableView.less";
import {HeaderCell} from "./HeaderCell";
import {SortingDirection} from "./SortingDirection";

export interface TableViewProps<T> {
    columns: IColumn<T>[];
    items: T[];
    containerClassName?: string;
    tableClassName?: string;
    selectedRows?: number[];
    onRowSelection?: (rowIndex: number) => void;
    onRowLeftMouseClick?: (rowIndex: number) => void;
    onRowRightMouseClick?: (rowIndex: number) => void;
    contextMenu?: React.ReactElement<{rows: any}>;
}

export class TableView<T> extends React.Component<TableViewProps<T>, any> {

    constructor(props: TableViewProps<T>, context: any) {
        super(props, context);
        this.state = {
            items: [...props.items],
            selectedRows: props.selectedRows || [],
            showContextMenu: false,
            contextMenuPosition: {
                top: 0,
                left: 0
            },
            sorting: {
                column: null,
                dir: SortingDirection.NO
            }
        };
    }

    componentDidMount() {
        this.recalculateWidthsAndHeight();
        window.addEventListener("resize", this.recalculateWidthsAndHeight.bind(this));
    }

    private recalculateWidthsAndHeight() {
        const container = this.refs["container"] as HTMLDivElement;
        const header = this.refs["header"] as HTMLTableSectionElement;
        const rows = this.refs["rows"] as HTMLTableSectionElement;
        const footer = this.refs["footer"] as HTMLTableSectionElement;

        let columnsWidths = [];
        for (let i = 0; i < rows.rows.item(0).cells.length; i++) {
            columnsWidths.push(rows.rows.item(0).cells.item(i).clientWidth);
        }

        for (let i = 0; i < header.rows.length; i++) {
            for (let j = 0; j < header.rows.item(i).cells.length; j++) {
                header.rows.item(i).cells.item(j).style.width = columnsWidths[j] + 1 + "px";
            }
        }

        for (let i = 0; i < footer.rows.length; i++) {
            for (let j = 0; j < footer.rows.item(i).cells.length; j++) {
                footer.rows.item(i).cells.item(j).style.width = columnsWidths[j] + 1 + "px";
            }
        }

        const tbodyHeight = container.clientHeight - header.clientHeight - footer.clientHeight - 2;
        rows.style.height = tbodyHeight + "px";
    }

    private processRowSelection(rowIndex: number) {
        if (this.props.onRowSelection) {
            this.props.onRowSelection(rowIndex);
        }
        const indexInSelectedRows = this.state.selectedRows.indexOf(rowIndex);
        const selectedRows: number[] = indexInSelectedRows !== -1
            ? [
                ...this.state.selectedRows.slice(0, indexInSelectedRows),
                ...this.state.selectedRows.slice(indexInSelectedRows + 1)
            ]
            : [...this.state.selectedRows, rowIndex];
        this.setState({
            selectedRows: selectedRows
        })
    }

    private handleRowClick(rowIndex: number, e: any) {
        e.preventDefault();
        this.processRowSelection(rowIndex);
        if (this.props.onRowLeftMouseClick) {
            this.props.onRowLeftMouseClick(rowIndex);
        }
    };

    private handleRowContextMenu(rowIndex: number, e: any) {
        e.preventDefault();
        if (this.props.onRowRightMouseClick) {
            this.props.onRowRightMouseClick(rowIndex);
        }
        if (this.props.contextMenu) {
            this.setState({
                showContextMenu: true,
                contextMenuPosition: {
                    top: e.clientY,
                    left: e.clientX
                }
            });
        }
    }

    private handleCloseContextMenu(e: any) {
        this.setState({
            showContextMenu: false
        })
    }

    private handleColumnSort(column: IColumn<any>) {
        let sortDirection = this.state.sorting.dir;
        sortDirection = sortDirection === SortingDirection.ASC ? SortingDirection.DESC : ++sortDirection;
        let items;
        if (sortDirection === SortingDirection.NO) {
            items = [...this.props.items];
            column = null;
        }
        else {
            items = [...this.state.items];
            const sortFunc = column.sortFunc
                ? column.sortFunc.bind(null, sortDirection, column.value)
                : ((a: T, b: T) => (sortDirection) * (column.value(a) > column.value(b) ? 1 : (column.value(a) < column.value(b) ? -1 : 0)));
            items.sort(sortFunc);
        }

        this.setState({
            items: items,
            sorting: {
                column: column,
                dir: sortDirection
            }
        });
    }

    render() {
        let contextMenu;
        if (this.state.showContextMenu && React.isValidElement(this.props.contextMenu)) {
            const newContextMenu = React.cloneElement(this.props.contextMenu, {rows: this.state.selectedRows});
            contextMenu = <div style={{
                        position: "fixed",
                        width: "100vw",
                        height: "100vh"
                    }} onClick={this.handleCloseContextMenu.bind(this)}>
                <div style={{
                            position: "absolute",
                            top: this.state.contextMenuPosition.top,
                            left: this.state.contextMenuPosition.left,
                            opacity: 1
                        }}>
                    {newContextMenu}
                </div>
            </div>;
        }
        return (
            <div className={"TableView" + (this.props.containerClassName || "")} ref="container">
                {contextMenu}
                <table className={this.props.tableClassName || ""}>
                    <thead ref="header">
                    <tr>
                        {
                            this.props.columns.map((column, i) => {
                                let sortDirection = this.state.sorting.column === column ? this.state.sorting.dir : null;
                                return (
                                    <th key={i}
                                        onClick={column.sorting ? this.handleColumnSort.bind(this, column) : null}>
                                        <HeaderCell sortDirection={sortDirection}>
                                            {column.header()}
                                        </HeaderCell>
                                    </th>
                                );
                            })
                        }
                    </tr>
                    </thead>
                    <tbody ref="rows">
                    {
                        this.state.items.map((item: T, rowIndex: number) => {
                            return (
                                <tr key={rowIndex}
                                    className={this.state.selectedRows.indexOf(rowIndex) !== -1 ? "selected" : ""}
                                    onClick={this.handleRowClick.bind(this, rowIndex)}
                                    onContextMenu={this.handleRowContextMenu.bind(this, rowIndex)}
                                >
                                    {
                                        this.props.columns.map((column, columnIndex) => {
                                            const cellWidth = column.width || "auto";
                                            return <td key={columnIndex}
                                                       style={{
                                                           minWidth: cellWidth,
                                                           maxWidth: cellWidth
                                                       }}>
                                                {column.value(item)}
                                            </td>;
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                    </tbody>
                    <tfoot ref="footer">
                    <tr>
                        {
                            this.props.columns.map((column, i) => <th key={i}>{column.footer()}</th>)
                        }
                    </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}