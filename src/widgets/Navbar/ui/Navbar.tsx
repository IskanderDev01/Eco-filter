import {
    faArrowRightFromBracket,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AddClientForm } from 'features/AddClientForm';
import { useGetClients } from 'pages/MainPage/api/clientsApi';
import { clientsSliceActions } from 'pages/MainPage/model/slice/clientSlice';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN } from 'shared/const/localstorage';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { Button, Input } from 'shared/ui/AntD/AntD';

const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const debounceFetchData = useDebounce(useGetClients, 300);

    const handleOpenModal = useCallback(() => {
        setOpen(true);
    }, []);
    const handleCloseModal = useCallback(() => {
        setOpen(false);
    }, []);

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(clientsSliceActions.setSearch(search));
        },
        [dispatch, debounceFetchData],
    );

    const logout = () => {
        localStorage.removeItem(TOKEN);
        navigate('/login');
    };

    return (
        <div className="bg-slate-50 text-slate-950 py-4 shadow-slate-300 shadow-sm fixed w-full z-50">
            <div className="container mx-auto max-w-screen-xl flex">
                <div className="flex items-center basis-1/4">
                    <span className="text-green-500 text-2xl font-semibold">
                        ECO
                    </span>
                    <span className="ml-1 text-sky-400 text-2xl font-semibold">
                        filter
                    </span>
                </div>
                <Input
                    placeholder="Поиск.."
                    className="basis-1/2 py-2 rounded-sm"
                    onChange={(e) => onChangeSearch(e.target.value)}
                />
                <div className="basis-1/4 flex justify-end items-center">
                    <Button
                        onClick={handleOpenModal}
                        className="py-5 hover: !border-inherit"
                    >
                        <FontAwesomeIcon icon={faUserPlus} />
                    </Button>
                    <Button
                        onClick={logout}
                        className="py-5  ml-2 hover:!border-red-500 hover:!text-red-500"
                    >
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </Button>
                </div>
            </div>
            <AddClientForm onClose={handleCloseModal} isOpen={open} />
        </div>
    );
};

export default Navbar;
