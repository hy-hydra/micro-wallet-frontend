import { ElementType, Suspense } from 'react';

const Loadable = (Component: ElementType) => (props: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (
        <Suspense
        // fallback={<LoadingScreen isDashboard={pathname.includes("dashboard")} />}
        >
            <Component {...props} />
        </Suspense>
    );
};

export default Loadable;
