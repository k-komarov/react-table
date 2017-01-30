"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var TableView_1 = require("./components/TableView");
require("./index.less");
var ContextMenu_1 = require("./components/ContextMenu");
var items = [];
for (var i = 0; i < 1000; i++) {
    items.push({
        a: "(props: TableViewProps<any>, state: any)",
        b: i,
        c: "const Table = (props: TableViewProps<any>, state: any) => new TableView<any>(props, state);"
    });
}
var MyContextMenu = function (props) {
    return React.createElement(ContextMenu_1.ContextMenu, null,
        React.createElement(ContextMenu_1.ContextMenuItem, { onClick: function () { console.log("Bearbaiten", props.rows); } }, "Bearbeiten"),
        React.createElement(ContextMenu_1.ContextMenuItem, { onClick: function () { console.log("Löschen", props.rows); } }, "L\u00F6schen"));
};
var Table = function (props, state) { return new TableView_1.TableView(props, state); };
ReactDOM.render(React.createElement("div", { style: { height: "50%" } },
    React.createElement(Table, { columns: [
            {
                header: function () { return "A"; },
                footer: function () { return "AA"; },
                value: function (item) { return item.a; },
                width: "300px"
            },
            {
                header: function () { return "B"; },
                footer: function () { return "BB"; },
                value: function (item) { return item.b; },
                width: "400px"
            },
            {
                header: function () { return "C"; },
                footer: function () { return "CC"; },
                value: function (item) { return item.c; },
                width: "500px"
            }
        ], items: items, tableClassName: "table table-striped table-bordered", contextMenu: React.createElement(MyContextMenu, null) })), document.getElementById("example"));
//# sourceMappingURL=index.js.map