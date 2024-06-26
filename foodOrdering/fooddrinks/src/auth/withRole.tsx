import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../auth/auth-context';

const withRole = (WrappedComponent: React.ComponentType, requiredRole: 'adminAdmin' | 'admin' | 'user') => {
    return (props: any) => {
        const { isAuthenticated, user } = useAuth();
        const router = useRouter();

        React.useEffect(() => {
            if (!isAuthenticated || user?.role !== requiredRole) {
                router.replace('/unauthorized'); // Redirect to an unauthorized page if role is not sufficient
            }
        }, [isAuthenticated, user, requiredRole, router]);

        if (!isAuthenticated || user?.role !== requiredRole) {
            return null; // Render nothing while checking authentication and role
        }

        return <WrappedComponent {...props} />;
    };
};

export default withRole;