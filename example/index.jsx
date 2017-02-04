"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var TableView_1 = require("../src/TableView");
require("./index.less");
var ContextMenu_1 = require("../src/ContextMenu");
var items = [];
for (var i = 0; i < 10; i++) {
    items.push({
        a: i + "(props: TableViewProps<any>, state: any)",
        b: +(Math.random() * 100 + 1).toFixed(2),
        c: "const Table = (props: TableViewProps<any>, state: any) => new TableView<any>(props, state);"
    });
}
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
        header: function () { return "A"; },
        footer: function () { return "AA"; },
        value: function (item) { return item.a; },
        width: "300px",
        sorting: true,
        sortFunc: function (sortDirection, valueFunc, a, b) {
            var valueA = valueFunc(a);
            var valueB = valueFunc(b);
            return (sortDirection) * (valueA > valueB ? 1 : (valueA < valueB ? -1 : 0));
        }
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
]} items={items} tableClassName="table table-striped table-bordered" contextMenu={<MyContextMenu />}/>
    </div>, document.getElementById("example"));
