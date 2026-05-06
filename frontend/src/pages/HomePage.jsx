import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="chat-layout animate-fade-in" style={{ backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
      <Sidebar />
      
      {selectedUser ? (
        <ChatContainer />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div style={{ backgroundColor: 'var(--bg-color)', padding: '2rem', borderRadius: '50%', marginBottom: '1rem' }}>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>Welcome to ChatZone!</h2>
          </div>
          <p className="text-secondary">Select a conversation from the sidebar to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
