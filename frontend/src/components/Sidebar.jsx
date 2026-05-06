import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) {
    return (
      <aside style={{ width: '300px', borderRight: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader"></div>
      </aside>
    );
  }

  return (
    <aside style={{ width: '300px', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-2 mb-4 font-semibold text-secondary">
          <Users size={20} />
          <span>Contacts</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <input 
            type="checkbox" 
            id="onlineFilter"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            style={{ accentColor: 'var(--primary-color)' }}
          />
          <label htmlFor="onlineFilter" className="text-secondary cursor-pointer">
            Show online only ({onlineUsers.length - 1 > 0 ? onlineUsers.length - 1 : 0})
          </label>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              transition: 'var(--transition)',
              backgroundColor: selectedUser?._id === user._id ? 'var(--bg-color)' : 'transparent',
              border: selectedUser?._id === user._id ? '1px solid var(--border-color)' : '1px solid transparent'
            }}
            className="btn-ghost"
          >
            <div style={{ position: 'relative' }}>
              <img
                src={user.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.fullName) + "&background=random"}
                alt={user.name}
                className="avatar"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '12px',
                    height: '12px',
                    backgroundColor: 'var(--success-color)',
                    border: '2px solid var(--surface-color)',
                    borderRadius: '50%'
                  }}
                />
              )}
            </div>

            <div style={{ textAlign: 'left', overflow: 'hidden' }}>
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-xs text-secondary truncate">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-secondary py-4 text-sm">
            No users found
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
