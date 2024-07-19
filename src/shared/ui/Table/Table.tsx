import { lazy } from 'react';
const TableA = lazy(() => import('antd/es/table/Table'));

interface TableProps {
    className?: string;
    dataSource: any;
    columns: any;
    rowKey?: any;
    pagination?: any;
    loading?: boolean;
}

const Table = (props: TableProps) => {
    const { className, dataSource, loading, columns, rowKey, ...otherProps } =
        props;

    return (
        <TableA
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            className={className}
            rowKey={rowKey}
            scroll={{ x: true }}
            {...otherProps}
        />
    );
};

export default Table;
