import { useState } from 'react';
import { Form, Select } from 'antd';
import { useCreateClient } from '../api/addClientApi';
import { Button, Input, Modal } from 'shared/ui/AntD/AntD'
import { validatePhone } from 'shared/lib/validateForm/validateForm'

interface AddClientFormProps {
    isOpen: boolean;
    onClose: () => void;
}

interface AddClientType {
    name: string;
    address: string;
    phone: string;
    category_id: number;
    expiration_date: string | undefined;
    created_at: string | undefined;
    first_date: string | undefined;
    second_date: string | undefined;
}

const AddClientForm = ({ isOpen, onClose }: AddClientFormProps) => {
    const [form] = Form.useForm();
    const [idCat, setIdCat] = useState<number>(1);
    const [createClient, { isLoading }] = useCreateClient();

    const onFinish = async (values: AddClientType) => {
        const {
            name,
            address,
            phone,
            category_id,
            expiration_date,
            created_at,
            first_date,
            second_date,
        } = values;

        // Подготовка данных для отправки
        const data: Record<string, any> = {
            name: name.trim(),
            address: address.trim(),
            phone: phone.replace(/\s+/g, ''),
            category_id,
        };

        if (created_at) data.created_at = created_at;
        if (first_date) data.first_date = first_date;
        if (second_date) data.second_date = second_date;

        if (expiration_date) {
            const expirationArr = expiration_date
                .trim()
                .split(' ')
                .map((val) => parseInt(val, 10));
            data.expiration_date = expirationArr;
        } else {
            data.expiration_date = [];
        }

        await createClient(data);
        if (!isLoading) {
            onClose();
            form.resetFields();
        }
    };

    const validateExpirationDate = (_: any, value: string | undefined) => {
        if (!value) return Promise.resolve();

        const parts = value
            .trim()
            .split(' ')
            .map((part) => part.trim());
        if (parts.some((part) => isNaN(Number(part)))) {
            return Promise.reject(
                new Error('Поле должно содержать только цифры и пробелы'),
            );
        }

        if (+idCat === 1 && parts.length > 2) {
            return Promise.reject(
                new Error('Не должно быть больше 2 элементов'),
            );
        }

        if (+idCat === 2 && parts.length > 1) {
            return Promise.reject(
                new Error('Не должно быть больше 1 элемента'),
            );
        }

        return Promise.resolve();
    };

    const initialValues = {
        category_id: 1,
    };

    return (
        <Modal
            title="Добавить клиента"
            centered
            open={isOpen}
            onCancel={onClose}
            width={800}
            footer={null}
        >
            <Form
                form={form}
                name="adding"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                className="mt-4"
                initialValues={initialValues}
            >
                <div className="flex w-full">
                    <div className="flex-col basis-1/2 px-2">
                        <Form.Item<AddClientType>
                            className="text-sm my-2"
                            label="Имя"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите имя',
                                },
                                {
                                    transform: (value) => value.trim(),
                                    message:
                                        'Имя не должно содержать лишние пробелы',
                                },
                            ]}
                        >
                            <Input className="py-2" />
                        </Form.Item>
                        <Form.Item<AddClientType>
                            className="text-sm my-2"
                            label="Адрес"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите адрес',
                                },
                                {
                                    transform: (value) => value.trim(),
                                    message:
                                        'Адрес не должен содержать лишние пробелы',
                                },
                            ]}
                        >
                            <Input className="py-2" />
                        </Form.Item>
                        <Form.Item<AddClientType>
                            className="text-sm my-2"
                            label="Телефон"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите телефон',
                                },
                                { validator: validatePhone },
                            ]}
                        >
                            <Input addonBefore='+998' className="py-2" />
                        </Form.Item>
                        <Form.Item<AddClientType>
                            label="Категория"
                            name="category_id"
                            className="text-sm my-2"
                        >
                            <Select
                                className="py-0"
                                onChange={(e) => setIdCat(e)}
                                options={[
                                    { value: '1', label: '1' },
                                    { value: '2', label: '2' },
                                ]}
                            />
                        </Form.Item>
                    </div>
                    <div className="flex-col basis-1/2 px-2">
                        <Form.Item<AddClientType>
                            className="text-sm my-2"
                            label="Месяц(ы) фильтра"
                            name="expiration_date"
                            rules={[{ validator: validateExpirationDate }]}
                        >
                            <Input className="py-2" />
                        </Form.Item>
                        <Form.Item<AddClientType>
                            className="text-sm my-2"
                            label="Дата клиента"
                            name="created_at"
                            // rules={[{ required: true, message: 'Пожалуйста, выберите дату клиента' }]}
                        >
                            <Input
                                type="date"
                                placeholder="Выбрать дату"
                                className="w-full py-2"
                            />
                        </Form.Item>
                        {+idCat === 1 ? (
                            <>
                                <Form.Item<AddClientType>
                                    className="text-sm my-2"
                                    label="Укажите последнюю замену фильтра 1"
                                    name="first_date"
                                    // rules={[{ required: true, message: 'Пожалуйста, выберите дату' }]}
                                >
                                    <Input
                                        type="date"
                                        placeholder="Выбрать дату"
                                        className="w-full py-2"
                                    />
                                </Form.Item>
                                <Form.Item<AddClientType>
                                    className="text-sm my-2"
                                    label="Укажите последнюю замену фильтра 2"
                                    name="second_date"
                                    // rules={[{ required: true, message: 'Пожалуйста, выберите дату' }]}
                                >
                                    <Input
                                        type="date"
                                        placeholder="Выбрать дату"
                                        className="w-full py-2"
                                    />
                                </Form.Item>
                            </>
                        ) : (
                            <Form.Item<AddClientType>
                                className="text-sm my-2"
                                label="Укажите последнюю замену фильтра"
                                name="first_date"
                                // rules={[{ required: true, message: 'Пожалуйста, выберите дату' }]}
                            >
                                <Input
                                    type="date"
                                    placeholder="Выбрать дату"
                                    className="w-full py-2"
                                />
                            </Form.Item>
                        )}
                    </div>
                </div>
                <Form.Item className="mb-0 flex justify-end">
                    <Button
                        disabled={isLoading}
                        className=" disabled:bg-opacity-15 mt-1 p-5"
                        type="primary"
                        htmlType="submit"
                    >
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddClientForm;
