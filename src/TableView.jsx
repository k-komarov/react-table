"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
require("./TableView.less");
var HeaderCell_1 = require("./HeaderCell");
var SortingDirection_1 = require("./SortingDirection");
var TableView = (function (_super) {
    __extends(TableView, _super);
    function TableView(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            items: props.items.slice(),
            selectedRows: props.selectedRows || [],
            showContextMenu: false,
            contextMenuPosition: {
                top: 0,
                left: 0
            },
            sorting: {
                column: null,
                dir: SortingDirection_1.SortingDirection.NO
            }
        };
        return _this;
    }
    TableView.prototype.componentDidMount = function () {
        this.recalculateWidthsAndHeight();
        window.addEventListener("resize", this.recalculateWidthsAndHeight.bind(this));
    };
    TableView.prototype.recalculateWidthsAndHeight = function () {
        var container = this.refs["container"];
        var header = this.refs["header"];
        var rows = this.refs["rows"];
        var footer = this.refs["footer"];
        var columnsWidths = [];
        for (var i = 0; i < rows.rows.item(0).cells.length; i++) {
            columnsWidths.push(rows.rows.item(0).cells.item(i).clientWidth);
        }
        for (var i = 0; i < header.rows.length; i++) {
            for (var j = 0; j < header.rows.item(i).cells.length; j++) {
                header.rows.item(i).cells.item(j).style.width = columnsWidths[j] + 1 + "px";
            }
        }
        for (var i = 0; i < footer.rows.length; i++) {
            for (var j = 0; j < footer.rows.item(i).cells.length; j++) {
                footer.rows.item(i).cells.item(j).style.width = columnsWidths[j] + 1 + "px";
            }
        }
        var tbodyHeight = container.clientHeight - header.clientHeight - footer.clientHeight - 2;
        rows.style.height = tbodyHeight + "px";
    };
    TableView.prototype.processRowSelection = function (rowIndex) {
        if (this.props.onRowSelection) {
            this.props.onRowSelection(rowIndex);
        }
        var indexInSelectedRows = this.state.selectedRows.indexOf(rowIndex);
        var selectedRows = indexInSelectedRows !== -1
            ? this.state.selectedRows.slice(0, indexInSelectedRows).concat(this.state.selectedRows.slice(indexInSelectedRows + 1)) : this.state.selectedRows.concat([rowIndex]);
        this.setState({
            selectedRows: selectedRows
        });
    };
    TableView.prototype.handleRowClick = function (rowIndex, e) {
        e.preventDefault();
        this.processRowSelection(rowIndex);
        if (this.props.onRowLeftMouseClick) {
            this.props.onRowLeftMouseClick(rowIndex);
        }
    };
    ;
    TableView.prototype.handleRowContextMenu = function (rowIndex, e) {
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
    };
    TableView.prototype.handleCloseContextMenu = function (e) {
        this.setState({
            showContextMenu: false
        });
    };
    TableView.prototype.handleColumnSort = function (column) {
        var sortDirection = this.state.sorting.dir;
        sortDirection = sortDirection === SortingDirection_1.SortingDirection.ASC ? SortingDirection_1.SortingDirection.DESC : ++sortDirection;
        var items;
        if (sortDirection === SortingDirection_1.SortingDirection.NO) {
            items = this.props.items.slice();
            column = null;
        }
        else {
            items = this.state.items.slice();
            var sortFunc = column.sortFunc
                ? column.sortFunc.bind(null, sortDirection, column.value)
                : (function (a, b) { return (sortDirection) * (column.value(a) > column.value(b) ? 1 : (column.value(a) < column.value(b) ? -1 : 0)); });
            items.sort(sortFunc);
        }
        this.setState({
            items: items,
            sorting: {
                column: column,
                dir: sortDirection
            }
        });
    };
    TableView.prototype.clearSelection = function () {
        this.setState({
            selectedRows: []
        });
    };
    TableView.prototype.render = function () {
        var _this = this;
        var contextMenu;
        if (this.state.showContextMenu && React.isValidElement(this.props.contextMenu)) {
            var newContextMenu = React.cloneElement(this.props.contextMenu, {
                clearSelection: this.clearSelection.bind(this),
                rows: this.state.selectedRows
            });
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
        return (<div className={"TableView" + (this.props.containerClassName || "")} ref="container">
                {contextMenu}
                <table className={this.props.tableClassName || ""}>
                    <thead ref="header">
                    <tr>
                        {this.props.columns.map(function (column, i) {
            var sortDirection = _this.state.sorting.column === column ? _this.state.sorting.dir : null;
            return (<th key={i} onClick={column.sorting ? _this.handleColumnSort.bind(_this, column) : null}>
                                        <HeaderCell_1.HeaderCell sortDirection={sortDirection}>
                                            {column.header()}
                                        </HeaderCell_1.HeaderCell>
                                    </th>);
        })}
                    </tr>
                    </thead>
                    <tbody ref="rows">
                    {this.state.items.map(function (item, rowIndex) {
            return (<tr key={rowIndex} className={_this.state.selectedRows.indexOf(rowIndex) !== -1 ? "selected" : ""} onClick={_this.handleRowClick.bind(_this, rowIndex)} onContextMenu={_this.handleRowContextMenu.bind(_this, rowIndex)}>
                                    {_this.props.columns.map(function (column, columnIndex) {
                var cellWidth = column.width || "auto";
                return <td key={columnIndex} style={{
                    minWidth: cellWidth,
                    maxWidth: cellWidth
                }}>
                                                {column.value(item)}
                                            </td>;
            })}
                                </tr>);
        })}
                    </tbody>
                    <tfoot ref="footer">
                    <tr>
                        {this.props.columns.map(function (column, i) { return <th key={i}>{column.footer()}</th>; })}
                    </tr>
                    </tfoot>
                </table>
            </div>);
    };
    return TableView;
}(React.Component));
exports.TableView = TableView;
