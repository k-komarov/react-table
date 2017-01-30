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
var contextMenu = <ContextMenu_1.ContextMenu>
    <ContextMenu_1.ContextMenuItem>Bearbeiten</ContextMenu_1.ContextMenuItem>
    <ContextMenu_1.ContextMenuItem>Löschen</ContextMenu_1.ContextMenuItem>
</ContextMenu_1.ContextMenu>;
var Table = function (props, state) { return new TableView_1.TableView(props, state); };
ReactDOM.render(<Table columns={[
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
]} items={items} tableClassName="table table-striped table-bordered" contextMenu={contextMenu}/>, document.getElementById("example"));
