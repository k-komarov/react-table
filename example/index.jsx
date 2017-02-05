"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var TableView_1 = require("../src/TableView");
require("./index.less");
var ContextMenu_1 = require("../src/ContextMenu");
var Interfaces_1 = require("../src/Interfaces");
var Item = (function () {
    function Item(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    return Item;
}());
var items = [];
for (var i = 0; i < 1000; i++) {
    items.push(new Item(i + "(props: TableViewProps<any>, state: any)", +(Math.random() * 100 + 1).toFixed(2), "const Table = (props: TableViewProps<any>, state: any) => new TableView<any>(props, state);"));
}
var tableItems = [];
items.forEach(function (item, index) {
    var tableItem = new Interfaces_1.TableItem(item);
    if (index % 4 === 0) {
        tableItem.children.push(new Item(1, 2, 3));
        tableItem.children.push(new Item(4, 5, 6));
    }
    tableItems.push(tableItem);
});
var MyContextMenu = function (props) {
    return <ContextMenu_1.ContextMenu>
        <ContextMenu_1.ContextMenuItem onClick={function () {
        console.log("Bearbaiten", props.rows);
        props.clearSelection();
    }}>Bearbeiten ({props.rows.length})</ContextMenu_1.ContextMenuItem>
        <ContextMenu_1.ContextMenuItem onClick={function () { console.log("Löschen", props.rows); }}>Löschen ({props.rows.length})</ContextMenu_1.ContextMenuItem>
    </ContextMenu_1.ContextMenu>;
};
var Table = function (props, state) { return new TableView_1.TableView(props, state); };
ReactDOM.render(<div style={{ height: "100%" }}>
        <Table columns={[
    {
        header: function () { return null; },
        footer: function () { return null; },
        value: function () { return null; }
    },
    {
        header: function () { return "A"; },
        footer: function () { return "AA"; },
        value: function (item) { return item.a; },
        width: "300px",
        sorting: true
    },
    {
        header: function () { return "B"; },
        footer: function () { return "BB"; },
        value: function (item) { return item.b; },
        width: "400px",
        sorting: true
    },
    {
        header: function () { return "C"; },
        footer: function () { return "CC"; },
        value: function (item) { return item.c; },
        width: "500px"
    }
]} items={tableItems} tableClassName="table table-striped table-bordered" contextMenu={<MyContextMenu />}/>
    </div>, document.getElementById("example"));
