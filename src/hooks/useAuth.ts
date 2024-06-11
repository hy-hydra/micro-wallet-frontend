import { useContext } from 'react';
import UserContext from 'src/contexts/UserContext';

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
    const context = useContext(UserContext);

    if (!context) throw new Error('context must be use inside provider');

    return context;
};

export default useAuth;
