import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../provider/auth.context';
import { Footer } from './Footer';
import HeaderBar from './Header';

export default function MainLayout() {
  const { isAuthenticated, user, logout} = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = ['/sign-in', '/sign-up', '/forgot-password', '/verify-otp', '/reset-password'].includes(location.pathname);
  const isMessagePage = location.pathname.startsWith('/chat');

  if (isAuthPage) {
    return <Outlet />;
  }

  const handleLogout = () => {
    logout();
    navigate('/sign-in');
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <HeaderBar
        user={user}
        isAuthenticated={isAuthenticated}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleLogout={handleLogout}
      />
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      {!isMessagePage && (
        <Footer />
      )}
    </div>
  );
}
