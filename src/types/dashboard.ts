export type Dashboard = Row[]

type Row = {
    object: Properties;
    panes: Col[];
}

type Col = {
    object: Properties;
}

type Properties = {
    size?: number | null;
}