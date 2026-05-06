import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--surface-color)' }}>
      <div className="flex items-center gap-3">
        <div style={{ position: 'relative' }}>
          <img
            src={selectedUser.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.fullName)}&background=random`}
            alt={selectedUser.fullName}
            className="avatar"
          />
          {onlineUsers.includes(selectedUser._id) && (
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

        <div>
          <h3 className="font-medium">{selectedUser.fullName}</h3>
          <p className="text-xs text-secondary">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button onClick={() => setSelectedUser(null)} className="btn-ghost" style={{ padding: '0.5rem', borderRadius: '50%' }}>
        <X />
      </button>
    </div>
  );
};

export default ChatHeader;
