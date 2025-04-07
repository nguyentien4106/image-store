import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { authApi } from "@/apis/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setUser } from "@/store/slices/userSlice";
import { AppSidebar } from "@/components/app-sidebar";
import { Sidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AUTH_PATH } from "@/constants/path";
import { SiteHeader } from "@/components/site-header";
import { NavUser } from "@/components/nav-user";

export function ProtectedLayout() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = authApi.getAccessToken();
      const refreshToken = authApi.getRefreshToken();

      if (!accessToken && !refreshToken) {
        dispatch(setUser(null));
        navigate(AUTH_PATH.login);
        return;
      }

      if (!accessToken && refreshToken) {
        try {
          await authApi.refreshAccessToken();
        } catch (error) {
          navigate(AUTH_PATH.login);
          return;
        }
      }

      const userInfo = authApi.getCurrentUser();
      if (userInfo) {
        dispatch(setUser(userInfo));
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <AppSidebar />
          <div className="mt-auto border-t p-4">
            <NavUser user={user} />
          </div>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <SiteHeader />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}