import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { LayoutDashboard, Briefcase, UserCircle } from 'lucide-react';
import { cx } from '../utils/cx';

export const MainLayout = () => {
  const { role, setRole } = useRole();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Cases', path: '/cases', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar / Topbar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">Legixo</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cx(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md",
                  isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <Icon className={cx("mr-3 h-5 w-5", isActive ? "text-blue-700" : "text-gray-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Role Switcher */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3 text-sm text-gray-500">
            <UserCircle className="h-5 w-5" />
            <span>Current Role</span>
          </div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'Admin' | 'Intern')}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
          >
            <option value="Intern">Intern (Read/Write)</option>
            <option value="Admin">Admin (Full Access)</option>
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
