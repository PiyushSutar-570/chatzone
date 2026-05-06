import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="flex items-center justify-center animate-fade-in" style={{ height: 'calc(100vh - 100px)' }}>
      <div className="card" style={{ maxWidth: '500px' }}>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-secondary text-sm">Your profile information</p>
        </div>

        {/* Avatar upload section */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div style={{ position: 'relative' }}>
            <img
              src={selectedImg || authUser.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.fullName)}&background=random`}
              alt="Profile"
              style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', border: '4px solid var(--surface-hover)' }}
            />
            <label
              htmlFor="avatar-upload"
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '50%',
                cursor: isUpdatingProfile ? 'not-allowed' : 'pointer',
                transition: 'var(--transition)'
              }}
            >
              <Camera size={20} />
              <input
                type="file"
                id="avatar-upload"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-secondary">
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div className="text-sm text-secondary flex items-center gap-2 mb-2">
              <User size={16} />
              Full Name
            </div>
            <p className="font-semibold">{authUser?.fullName}</p>
          </div>

          <div style={{ backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div className="text-sm text-secondary flex items-center gap-2 mb-2">
              <Mail size={16} />
              Email Address
            </div>
            <p className="font-semibold">{authUser?.email}</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem', backgroundColor: 'var(--bg-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
          <h2 className="text-sm font-semibold mb-4 text-secondary">Account Information</h2>
          <div className="flex items-center justify-between py-2 border-b border-[var(--border-color)] text-sm">
            <span>Member Since</span>
            <span>{authUser.createdAt?.split("T")[0]}</span>
          </div>
          <div className="flex items-center justify-between py-2 text-sm">
            <span>Account Status</span>
            <span className="text-[var(--success-color)] font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
