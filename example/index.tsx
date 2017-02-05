import * as React from "react";
import * as ReactDOM from "react-dom";
import {TableViewProps, TableView} from "../src/TableView";
import "./index.less";
import {ContextMenu, ContextMenuItem} from "../src/ContextMenu";
import {TableItem} from "../src/Interfaces";

class Item {
    readonly a: any;
    readonly b: any;
    readonly c: any;

    constructor(a: any, b: any, c: any) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}
const items: Item[] = [];
for (let i = 0; i < 1000; i++) {
    items.push(new Item(
        i + "(props: TableViewProps<any>, state: any)",
        +(Math.random() * 100 + 1).toFixed(2),
        "const Table = (props: TableViewProps<any>, state: any) => new TableView<any>(props, state);"
    ));
}

const tableItems: TableItem<Item>[] = [];
items.forEach((item: Item, index: number) => {
    const tableItem = new TableItem<Item>(item);
    if (index % 4 === 0) {
        tableItem.children.push(new Item(1, 2, 3));
        tableItem.children.push(new Item(4, 5, 6));
    }
    tableItems.push(tableItem);
});

const MyContextMenu = (props: {clearSelection?: () => void, rows?: any}) => {
    return <ContextMenu>
        <ContextMenuItem
            onClick={() => {
                console.log("Bearbaiten", props.rows);
                props.clearSelection();
            }}>Bearbeiten ({props.rows.length})</ContextMenuItem>
        <ContextMenuItem
            onClick={() => {console.log("Löschen", props.rows)}}>Löschen ({props.rows.length})</ContextMenuItem>
    </ContextMenu>
};

const Table = (props: TableViewProps<any>, state: any) => new TableView<Item>(props, state);
ReactDOM.render(
    <div style={{height: "100%"}}>
        <Table columns={[
                    {
                        header: () => null,
                        footer: () => null,
                        value: () => null
                    },
                    {
                        header: () => "A",
                        footer: () => "AA",
                        value: (item: any) => item.a,
                        width: "300px",
                        sorting: true
                    },
                    {
                        header: () => "B",
                        footer: () => "BB",
                        value: (item: any) => item.b,
                        width: "400px",
                        sorting: true
                    },
                    {
                        header: () => "C",
                        footer: () => "CC",
                        value: (item: any) => item.c,
                        width: "500px"
                    }
                ]}
               items={tableItems}
               tableClassName="table table-striped table-bordered"
               contextMenu={<MyContextMenu/>}
        />
    </div>,
    document.getElementById("example")
);
