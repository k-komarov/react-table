declare module "react-lazy-render" {
    interface LazyRenderProps extends React.Props<LazyRenderClass> {
        minHeight: number;
    }

    interface LazyRenderClass extends React.ComponentClass<LazyRenderProps> {}
    const LazyRender: LazyRenderClass;
    export default LazyRender;
}

