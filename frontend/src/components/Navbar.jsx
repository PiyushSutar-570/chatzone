import { Link } from "react-router";
import { MessageSquare, User, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <nav style={{
      backgroundColor: 'var(--surface-color)',
      borderBottom: '1px solid var(--border-color)',
      padding: '1rem',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold" style={{ fontSize: '1.25rem', color: 'var(--primary-color)' }}>
          <div style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
            <MessageSquare size={24} />
          </div>
          ChatZone
        </Link>

        <div className="flex items-center gap-4">
          {authUser ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 btn-ghost" style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                <User size={20} />
                <span className="text-sm font-medium">Profile</span>
              </Link>
              <button onClick={logout} className="flex items-center gap-2 btn-ghost" style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                <LogOut size={20} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost text-sm font-medium" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)' }}>Login</Link>
              <Link to="/signup" className="btn-primary text-sm font-medium" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)' }}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
