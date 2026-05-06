import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface-color)', borderTop: '1px solid var(--border-color)' }}>
      {imagePreview && (
        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            />
            <button
              onClick={removeImage}
              style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: 'var(--bg-color)', borderRadius: '50%', padding: '0.25rem', border: '1px solid var(--border-color)' }}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ borderRadius: 'var(--radius-full)' }}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`btn-ghost ${imagePreview ? 'text-primary' : 'text-secondary'}`}
            onClick={() => fileInputRef.current?.click()}
            style={{ padding: '0.75rem', borderRadius: '50%' }}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn-primary"
          disabled={!text.trim() && !imagePreview}
          style={{ width: 'auto', padding: '0.75rem', borderRadius: '50%' }}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
