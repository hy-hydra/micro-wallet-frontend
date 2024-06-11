import { useRoutes } from 'react-router-dom';
import PublicRoutes from './public';
import UserRoutes from './userRoute';
import AdminRoutes from './adminRoute';

const Routes = () => {
    return useRoutes([PublicRoutes, UserRoutes, AdminRoutes]);
};

export default Routes;
