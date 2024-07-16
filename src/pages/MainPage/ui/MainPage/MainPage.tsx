import { DataType } from 'pages/MainPage';
import {
    useDeletClients,
    useGetClients,
    useUpdateItem,
} from 'pages/MainPage/model/api/clientsApi';
import {
    getDays,
    getPage,
    getSearch,
} from 'pages/MainPage/model/selectors/clientsSelectors';
import { Client, Filters } from 'pages/MainPage/model/types/client';
import { useSelector } from 'react-redux';
import { Select, Table } from 'shared/ui';
import {
    faCheck,
    faTrashCan,
    faUserPen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnsType } from 'antd/es/table/InternalTable';
import { Button, Tag } from 'shared/ui/AntD/AntD';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Modal } from 'antd';
import { useCallback, useState } from 'react';
import { EditClientForm } from 'features/EditClientForm';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { clientsSliceActions } from 'pages/MainPage/model/slice/clientSlice';
const { confirm } = Modal;

const getStatusClass = (filters?: Filters[]) => {
    const baseClass = 'w-5 h-5 rounded-full';

    if (!filters || filters.length === 0) return `${baseClass} bg-green-500`;

    const statuses = filters.map((filter) => filter.status);

    if (statuses.includes('expired')) {
        return `${baseClass} bg-red-500`;
    } else if (statuses.includes('be_changed')) {
        return `${baseClass} bg-yellow-200`;
    } else if (statuses.every((status) => status === 'not_expired')) {
        return `${baseClass} bg-green-500`;
    }

    return `${baseClass} bg-yellow-200`;
};

const MainPage = () => {
    const [open, setOpen] = useState(false);
    const sort = useSelector(getDays);
    const search = useSelector(getSearch);
    const page = useSelector(getPage);
    const [limit, setLimit] = useState(10);
    const { data, isFetching } = useGetClients({
        sort,
        search,
        page,
        limit,
    });
    const clients: DataType[] | undefined = data?.data;
    const [deleteClients] = useDeletClients();
    const [updateItem] = useUpdateItem();
    const dispatch = useAppDispatch();
    const handleUpdate = async (id: number) => {
        await updateItem(id).unwrap();
    };
    const handleDelete = async (id: number) => {
        await deleteClients(id).unwrap();
    };
    const showDeleteConfirm = (id: number): void => {
        confirm({
            title: 'Вы точно хотите удалить клиента ',
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            onOk() {
                handleDelete(id);
            },
        });
    };
    const showUpdateConfirm = (id: number): void => {
        confirm({
            title: 'Подтвердить?',
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            onOk() {
                handleUpdate(id);
            },
        });
    };
    const handleOpenModal = useCallback((id: number) => {
        dispatch(clientsSliceActions.setId(id));
        setOpen(true);
    }, []);
    const handleCloseModal = useCallback(() => {
        setOpen(false);
    }, []);
    const columns: ColumnsType<DataType> = [
        {
            title: '',
            dataIndex: '',
            key: 'index',
            render: (_, { filters }) => (
                <div className={getStatusClass(filters)} />
            ),
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            render: (_, { name }) => <span className="break-all">{name}</span>,
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => <span>+998{phone}</span>
        },
        {
            title: 'Адрес',
            dataIndex: 'address',
            key: 'address',
            render: (_, { address }) => (
                <span className="break-all">{address}</span>
            ),
        },
        {
            title: <div className="w-24">Старт</div>,
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Фильтр',
            dataIndex: 'filters',
            key: 'filters',
            render: (_, { filters }) => (
                <>
                    {filters.map((item) => (
                        <div className="py-1" key={item.id}>
                            <Tag className={'py-1'}>
                                {item.expiration_date + '-мес'}
                            </Tag>
                        </div>
                    ))}
                </>
            ),
        },
        {
            title: 'Была замена',
            dataIndex: 'changed_at',
            key: 'changed_at',
            render: (_, { filters }) => (
                <>
                    {filters.map((item) => (
                        <div className="py-1" key={item.id}>
                            <Tag className="py-1">
                                {item.expiration_date + ' мес - '}{' '}
                                {format(
                                    new Date(item.changed_at),
                                    'd MMMM yyyy',
                                    {
                                        locale: ru,
                                    },
                                )}
                            </Tag>
                        </div>
                    ))}
                </>
            ),
        },
        {
            title: 'Прошло',
            dataIndex: 'remaining_days',
            key: 'remaining_days',
            render: (_, { filters }) => (
                <>
                    {filters.map((item) => (
                        <div key={item.id} className="py-1">
                            {item.status === 'expired' ? (
                                <Tag className="py-1">
                                    {item.expiration_date + ' мес'} -{' '}
                                    {item.remaining_days + ' дн'}
                                </Tag>
                            ) : (
                                ''
                            )}
                        </div>
                    ))}
                </>
            ),
        },
        {
            title: 'Комментарии',
            dataIndex: 'description',
            key: 'description',
            render: (_, { description }) => (
                <span className="break-all">{description}</span>
            ),
        },
        {
            title: 'Функции',
            key: 'action',
            render: (_, i) => (
                <div className="flex">
                    <Button
                        onClick={() => showDeleteConfirm(i.id)}
                        className="text-red-500 hover:!border-inherit hover:!text-red-500"
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                    <Button
                        onClick={() => handleOpenModal(i.id)}
                        className="ml-2 text-blue-500"
                    >
                        <FontAwesomeIcon icon={faUserPen} />
                    </Button>
                    {i.filters.length === 1 ? (
                        i.filters[0].status !== 'not_expired' ? (
                            <Button
                                onClick={() =>
                                    showUpdateConfirm(i.filters[0].id)
                                }
                                className="border-none bg-inherit ml-2 px-0"
                            >
                                <Tag className="py-1">
                                    {i.filters[0].expiration_date + '-мес '}
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className="ml-1 mr-0"
                                    />
                                </Tag>
                            </Button>
                        ) : (
                            ''
                        )
                    ) : i.filters.length === 2 ? (
                        i.filters[0].status !== 'not_expired' &&
                        i.filters[1].status !== 'not_expired' ? (
                            <div className="flex">
                                <Button
                                    onClick={() =>
                                        showUpdateConfirm(i.filters[0].id)
                                    }
                                    className="border-none bg-inherit ml-2 px-0"
                                >
                                    <Tag className="py-1">
                                        {i.filters[0].expiration_date + '-мес '}
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="ml-1 "
                                        />
                                    </Tag>
                                </Button>
                                <Button
                                    onClick={() =>
                                        showUpdateConfirm(i.filters[1].id)
                                    }
                                    className="border-none bg-inherit px-0"
                                >
                                    <Tag className="py-1">
                                        {i.filters[1].expiration_date + '-мес '}
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="ml-1 "
                                        />
                                    </Tag>
                                </Button>
                            </div>
                        ) : i.filters[0].status !== 'not_expired' ? (
                            <Button
                                onClick={() =>
                                    showUpdateConfirm(i.filters[0].id)
                                }
                                className="border-none bg-inherit ml-2 px-0"
                            >
                                <Tag className="py-1">
                                    {i.filters[0].expiration_date + '-мес '}
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className="ml-1 mr-0"
                                    />
                                </Tag>
                            </Button>
                        ) : i.filters[1].status !== 'not_expired' ? (
                            <Button
                                onClick={() =>
                                    showUpdateConfirm(i.filters[1].id)
                                }
                                className="border-none bg-inherit ml-2 px-0"
                            >
                                <Tag className="py-1">
                                    {i.filters[0].expiration_date + '-мес '}
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className="ml-1 mr-0"
                                    />
                                </Tag>
                            </Button>
                        ) : (
                            ''
                        )
                    ) : (
                        ''
                    )}
                </div>
            ),
        },
    ];
    return (
        <div className="container mx-auto max-w-screen-xl pt-20">
            <Select className="my-4" />
            <Table
                rowKey={(e: Client) => e.id}
                columns={columns}
                dataSource={clients}
                className="container mx-auto max-w-screen-xl"
                loading={isFetching}
                pagination={{
                    current: page,
                    total: data?.total,
                    pageSize: limit,
                    showSizeChanger: true,
                    onChange: (page: number, limit: number) => {
                        dispatch(clientsSliceActions.setPage(page));
                        setLimit(limit);
                    },
                }}
            />
            <EditClientForm isOpen={open} onClose={handleCloseModal} />
        </div>
    );
};

export default MainPage;
