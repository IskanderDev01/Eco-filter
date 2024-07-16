import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '../routeConfig/routeConfig';
import { TOKEN } from 'shared/const/localstorage';
import { useGetMeApi } from 'features/LoginForm/models/api/getMeApi';
import { useEffect } from 'react';

export function RequireAuth({ children }: { children: JSX.Element }) {
    const { isError } = useGetMeApi();
    const token = localStorage.getItem(TOKEN);
    const location = useLocation();

    useEffect(() => {
        isError ? localStorage.removeItem(TOKEN) : '';
    }, [isError, token?.length]);

    if (!token || isError) {
        return (
            <Navigate to={RoutePath.login} state={{ from: location }} replace />
        );
    }

    return children;
}
