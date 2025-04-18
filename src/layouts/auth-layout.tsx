import { authApi } from '@/apis/auth';
import { AuthNavbar } from '@/components/auth-navbar';
import { DASHBOARD_PATH } from '@/constants/path';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function AuthLayout() {
    const navigate = useNavigate()

    useEffect(() => {
        const user = authApi.getCurrentUser()

        if(user){
            navigate(DASHBOARD_PATH.dashboard)        
        }
    }, [])

    return (
        <div className="min-h-screen grid grid-rows-[auto,1fr]">
            <AuthNavbar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}

export default AuthLayout;
