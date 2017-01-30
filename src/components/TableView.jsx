"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
require("./TableView.less");
var TableView = (function (_super) {
    __extends(TableView, _super);
    function TableView(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.handleRowMouseDown = function (rowIndex, e) {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            if (e.button === 0) {
                console.debug("left mouse click");
                _this.processRowSelection(rowIndex);
                if (_this.props.onRowLeftMouseClick) {
                    _this.props.onRowLeftMouseClick(rowIndex, e);
                }
            }
            else if (e.button === 2) {
                console.debug("right mouse click");
                if (_this.props.onRowRightMouseClick) {
                    _this.props.onRowRightMouseClick(rowIndex, e);
                }
                if (_this.props.contextMenu) {
                    console.log("context menu");
                }
            }
        };
        _this.state = {
            selectedRows: props.selectedRows || []
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
        var _this = this;
        if (this.props.onRowSelection) {
            this.props.onRowSelection(rowIndex);
        }
        var indexInSelectedRows = this.state.selectedRows.indexOf(rowIndex);
        var selectedRows = indexInSelectedRows !== -1
            ? this.state.selectedRows.slice(0, indexInSelectedRows).concat(this.state.selectedRows.slice(indexInSelectedRows + 1)) : this.state.selectedRows.concat([rowIndex]);
        this.setState({
            selectedRows: selectedRows
        }, function () {
            _this.forceUpdate();
        });
    };
    TableView.prototype.render = function () {
        var _this = this;
        return (<div className={"TableView" + (this.props.containerClassName || "")} ref="container">
                {this.props.contextMenu}
                <table className={this.props.tableClassName || ""}>
                    <thead ref="header">
                    <tr>
                        {this.props.columns.map(function (column, i) { return <th key={i}>{column.header()}</th>; })}
                    </tr>
                    </thead>
                    <tbody ref="rows">
                    {this.props.items.map(function (item, rowIndex) {
            return (<tr key={rowIndex} className={_this.state.selectedRows.indexOf(rowIndex) !== -1 ? "selected" : ""} onMouseDown={_this.handleRowMouseDown.bind(_this, rowIndex)}>
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
                        {this.props.columns.map(function (column, i) { return <th key={i}>{column.header()}</th>; })}
                    </tr>
                    </tfoot>
                </table>
            </div>);
    };
    return TableView;
}(React.Component));
exports.TableView = TableView;
