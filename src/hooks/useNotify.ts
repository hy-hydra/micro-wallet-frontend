import { useDispatch } from 'src/store';
import { openSnackbar } from 'src/store/slices/snackbar';

export const useNotify = () => {
    const dispatch = useDispatch();

    return (type: string, message: string) =>
        dispatch(
            openSnackbar({
                open: true,
                message: message,
                variant: 'alert',
                alert: {
                    color: type
                },
                close: false
            })
        );
};
