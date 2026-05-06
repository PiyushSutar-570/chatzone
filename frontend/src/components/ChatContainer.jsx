import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ChatHeader />

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((message) => {
          const isSentByMe = message.senderId === authUser._id;
          
          return (
            <div
              key={message._id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isSentByMe ? 'flex-end' : 'flex-start'
              }}
              ref={messageEndRef}
            >
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', flexDirection: isSentByMe ? 'row-reverse' : 'row' }}>
                <img
                  src={
                    isSentByMe
                      ? authUser.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.fullName)}&background=random`
                      : selectedUser.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.fullName)}&background=random`
                  }
                  alt="profile pic"
                  className="avatar"
                  style={{ width: '30px', height: '30px' }}
                />
                <div className={`chat-bubble ${isSentByMe ? 'chat-bubble-sent' : 'chat-bubble-received'}`}>
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      style={{ maxWidth: '200px', borderRadius: 'var(--radius-md)', marginBottom: '0.5rem' }}
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                  <div className="message-time">
                    {formatMessageTime(message.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
