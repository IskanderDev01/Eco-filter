import { Form } from 'antd';
import { validatePhone } from 'shared/lib/validateForm/validateForm';
import { Button, Input, Modal } from 'shared/ui/AntD/AntD';
import { getUserEdit, updateClient } from '../models/api/editApi';
import { useSelector } from 'react-redux';
import { getId } from 'pages/MainPage/model/selectors/clientsSelectors';
import { memo, useEffect } from 'react';
import { UserEdit } from '../models/types/editType';

interface EditClientProps {
    isOpen: boolean;
    onClose: () => void;
}

interface EditClientType {
    name: string;
    phone: string;
    address: string;
    description: string | null;
}
const EditClientForm = ({ isOpen, onClose }: EditClientProps) => {
    const [form] = Form.useForm();
    const userId = useSelector(getId);
    const [trigger, { data }] = getUserEdit();
    useEffect(() => {
        if(isOpen) trigger(userId)
    }, [userId])
    const [updateUser, {isLoading}] = updateClient()
    const initialValues: UserEdit = {
        name: data?.user.name,
        address: data?.user.address,
        phone: data?.user.phone,
        description: data?.user.description,
    };

    const onFinish = async (values: EditClientType) => {
        const { name, address, phone, description } = values;
        const data: Record<string, any> = {
            id: userId,
            name: name.trim(),
            address: address.trim(),
            phone: phone.replace(/\s+/g, ''),
            description,
        };
        await updateUser(data)
        if(!isLoading) {
            onClose()
        }
    };
    useEffect(() => {
        if (data?.user) {
            form.setFieldsValue(data?.user )
        }
    },[data?.user?.name])

    return (
        <Modal
            title="Изменить"
            centered
            open={isOpen}
            onCancel={onClose}
            width={400}
            footer={null}
        >
            <Form
                form={form}
                name="edit"
                onFinish={onFinish}
                initialValues={initialValues}
                autoComplete="off"
                layout="vertical"
                className="mt-4"
            >
                <Form.Item<EditClientType>
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
                            message: 'Имя не должно содержать лишние пробелы',
                        },
                    ]}
                >
                    <Input className="py-2" />
                </Form.Item>
                <Form.Item<EditClientType>
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
                            message: 'Адрес не должен содержать лишние пробелы',
                        },
                    ]}
                >
                    <Input className="py-2" />
                </Form.Item>
                <Form.Item<EditClientType>
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
                    <Input className="py-2" />
                </Form.Item>
                <Form.Item<EditClientType>
                    className="text-sm my-2"
                    label="Комментарии"
                    name="description"
                >
                    <Input className="py-2" />
                </Form.Item>
                <Form.Item className="mb-0 w-full flex justify-end pt-2">
                    <Button onClick={onClose}>Отмена</Button>
                    <Button
                        disabled={false}
                        className=" disabled:bg-opacity-15 ml-1"
                        type="primary"
                        htmlType="submit"
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default memo(EditClientForm);
