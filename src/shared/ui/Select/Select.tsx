import SelectA from 'antd/es/select/';
import { clientsSliceActions } from 'pages/MainPage/model/slice/clientSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface SelectProps {
    className?: string;
}

const Select = (props: SelectProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const handleChange = (value: string) => {
        dispatch(clientsSliceActions.setDays(value));
        dispatch(clientsSliceActions.setPage(1))
    };
    return (
        <SelectA
            defaultValue="Все"
            style={{ width: 140 }}
            onChange={handleChange}
            className={className}
            options={[
                { value: '', label: 'Все' },
                { value: 'today', label: 'Сегодня' },
                { value: 'tomorrow', label: 'Завтра' },
                { value: 'expired', label: 'Прошедшие' },
            ]}
        />
    );
};

export default Select;
