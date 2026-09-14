import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Brain,
  FileText,
  LogOut,
} from 'lucide-react';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>EquiliMind</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/predict" className="sidebar-link">
          <Brain size={20} />
          <span>Burnout Test</span>
        </NavLink>

        <NavLink to="/records" className="sidebar-link">
          <FileText size={20} />
          <span>Records</span>
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button
          type="button"
          className="sidebar-link logout-button"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;