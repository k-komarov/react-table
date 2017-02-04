import * as React from "react";
import * as ReactDOM from "react-dom";
import {TableViewProps, TableView} from "../src/TableView";
import "./index.less";
import {ContextMenu, ContextMenuItem} from "../src/ContextMenu";

const items = [];
for (let i = 0; i < 10; i++) {
    items.push({
        a: i + "(props: TableViewProps<any>, state: any)",
        b: +(Math.random() * 100 + 1).toFixed(2),
        c: "const Table = (props: TableViewProps<any>, state: any) => new TableView<any>(props, state);"
    });
}

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

const Table = (props: TableViewProps<any>, state: any) => new TableView<any>(props, state);
ReactDOM.render(
    <div style={{height: "100%"}}>
        <Table columns={[
                    {
                        header: () => "A",
                        footer: () => "AA",
                        value: (item: any) => item.a,
                        width: "300px",
                        sorting: true,
                        sortFunc: (sortDirection, valueFunc, a: any, b: any) => {
                            const valueA = valueFunc(a);
                            const valueB = valueFunc(b);
                            return (sortDirection) * (valueA > valueB ? 1 : (valueA < valueB ? -1 : 0));
                        }
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
               items={items}
               tableClassName="table table-striped table-bordered"
               contextMenu={<MyContextMenu/>}
        />
    </div>,
    document.getElementById("example")
);
