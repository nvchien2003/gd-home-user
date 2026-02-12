

import { NavLink, Outlet } from 'react-router-dom';
import { Heart, Home, MessageSquare, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../provider/AuthProvider';


export default function HistoryPage() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gray-200 mb-4 overflow-hidden">
                <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-gray-900">{user?.name}</h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            
            <nav className="p-2">
              <NavLink 
                to="/history" 
                end
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <Home className="h-5 w-5" />
                Overview
              </NavLink>
              <NavLink 
                to="/favorites" 
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <Heart className="h-5 w-5" />
                Favorites
              </NavLink>
              <NavLink 
                to="/rentals" 
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <Home className="h-5 w-5" />
                My Rentals
              </NavLink>
              <NavLink 
                to="/chat" 
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <MessageSquare className="h-5 w-5" />
                Messages
              </NavLink>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <Settings className="h-5 w-5" />
                Settings
              </NavLink>
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut className="h-5 w-5" />
                Log out
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
