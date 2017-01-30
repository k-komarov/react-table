import * as React from "react";
import * as ReactDOM from "react-dom";
import {TableViewProps, TableView} from "./components/TableView";
import "./index.less";
import {ContextMenu, ContextMenuItem} from "./components/ContextMenu";

const items = [];
for (let i = 0; i < 1000; i++) {
    items.push({
        a: "(props: TableViewProps<any>, state: any)",
        b: i,
        c: "const Table = (props: TableViewProps<any>, state: any) => new TableView<any>(props, state);"
    });
}

const MyContextMenu = (props: {rows?: any}) => {
    return <ContextMenu>
        <ContextMenuItem onClick={() => {console.log("Bearbaiten", props.rows)}}>Bearbeiten</ContextMenuItem>
        <ContextMenuItem onClick={() => {console.log("Löschen", props.rows)}}>Löschen</ContextMenuItem>
    </ContextMenu>
};

const Table = (props: TableViewProps<any>, state: any) => new TableView<any>(props, state);
ReactDOM.render(
    <div style={{height: "50%"}}>
        <Table columns={[
                    {
                        header: () => "A",
                        footer: () => "AA",
                        value: (item: any) => item.a,
                        width: "300px"
                    },
                    {
                        header: () => "B",
                        footer: () => "BB",
                        value: (item: any) => item.b,
                        width: "400px"
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
               contextMenu={<MyContextMenu />}
        />
    </div>,
    document.getElementById("example")
);
