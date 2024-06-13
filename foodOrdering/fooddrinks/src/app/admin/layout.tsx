import NavbarAdmin from '@/ui/admindashboard/navbarAdmin/Navbar';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div>
                <NavbarAdmin />
                {children}
            </div>
        </>
    );
}

export default Layout;
