import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { RoutePath } from '../routeConfig/routeConfig';
import { TOKEN } from 'shared/const/localstorage';
import { useGetMeApi } from 'features/LoginForm/api/getMeApi';
import { useEffect } from 'react';

export function RequireAuth({ children }: { children: JSX.Element }) {
    const { isError, isSuccess } = useGetMeApi();
    const token = localStorage.getItem(TOKEN);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    }, [isSuccess]);

    if (!token || isError) {
        return (
            <Navigate to={RoutePath.login} state={{ from: location }} replace />
        );
    }

    return children;
}
