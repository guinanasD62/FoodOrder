
import React, { useEffect } from 'react';
import { useAuth } from './auth-context';
import { useRouter } from 'next/navigation';


const withPermission = (WrappedComponent: React.ComponentType, requiredPermissions: string[]) => {
    return (props: any) => {
        const router = useRouter();
        const { user } = useAuth();
        const userPermissions = user?.role ? getPermissionsForRole(user.role) : []; // Assuming role-based permissions

        const hasPermission = requiredPermissions.every(permission =>
            userPermissions.includes(permission)
        );

        useEffect(() => {
            if (!hasPermission) {
                router.replace('/forbidden');
            }
        }, [hasPermission, router]);

        if (!hasPermission) {
            return null; // Render nothing if user doesn't have permission
        }

        return <WrappedComponent {...props} />;
    };
};

// A function to map roles to permissions
const getPermissionsForRole = (role: string) => {
    const rolePermissions: { [key: string]: string[] } = {
        adminAdmin: ['ADD_RESTAURANT', 'VIEW_RESTAURANTS', 'VIEW_RESTAURANT', 'UPDATE_RESTAURANT', 'DELETE_RESTAURANT'],
        admin: ['VIEW_RESTAURANTS', 'VIEW_RESTAURANT', 'UPDATE_RESTAURANT'],
        user: ['VIEW_RESTAURANTS', 'VIEW_RESTAURANT']
    };
    return rolePermissions[role] || [];
};

export default withPermission;
