export interface TableProps {
    columns?: number,
    rows?: number,
}

const Table: React.FC<TableProps> = ({columns, rows }) => {
    return(
        <table>
            <div>{columns}</div>
            <div>{rows}</div>
        </table>
    )
}

export default Table;