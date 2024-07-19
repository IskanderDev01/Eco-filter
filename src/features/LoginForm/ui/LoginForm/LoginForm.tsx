import { memo, lazy, useEffect } from 'react';
import Form, { FormProps } from 'antd/es/form';
import Input from 'antd/es/input';
import { useLoginMutation } from 'features/LoginForm/api/loginApi';
import { validate } from 'shared/lib/validate/validate';
import { TOKEN } from 'shared/const/localstorage';
import { useNavigate } from 'react-router-dom';
const Button = lazy(() => import('antd/es/button'));

type FieldType = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const [login, { isLoading, isError, isSuccess, data }] = useLoginMutation();
    const navigate = useNavigate();

    const onFinish: FormProps<FieldType>['onFinish'] = ({
        email,
        password,
    }) => {
        login({ email, password }).unwrap();
    };

    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem(TOKEN, String(data?.token));
            navigate('/');
        }
    }, [isSuccess]);

    return (
        <div className="bg-slate-100 fixed top-0 z-50 left-0 w-full h-screen flex justify-center items-center">
            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                className="w-96 bg-slate-50 p-5 rounded-lg shadow-lg shadow-slate-200"
            >
                <div className="mb-3 text-xl font-semibold pl-2">Вход</div>
                <div className="text-red-600 pl-2">
                    {isError ? 'Введен неправильный email или password' : ''}
                </div>
                <Form.Item<FieldType>
                    className="text-xl"
                    label="Email"
                    name="email"
                    rules={[validate.required('Введите Email')]}
                >
                    <Input className="p-2" type="email" />
                </Form.Item>

                <Form.Item<FieldType>
                    className="text-xl"
                    label="Password"
                    name="password"
                    rules={[validate.required('Введите пароль')]}
                >
                    <Input.Password className="p-2" />
                </Form.Item>

                <Form.Item className="mb-0">
                    <Button
                        disabled={isLoading}
                        className="w-full disabled:bg-opacity-15"
                        type="primary"
                        htmlType="submit"
                    >
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default memo(LoginForm);
