import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const ProfilePage = () => {
  const {authUser, isUpdatingProfile, updateProfile} = useAuthStore();
  const  [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({profilePic: base64Image});
    };
  };




  return(
  <div className="h-screen flex items-center justify-center bg-gray-900 text-white p-4">
  <div className="max-w-md w-full bg-gray-800 rounded-xl p-6 space-y-6 shadow-lg">
    <h1 className="text-center text-2xl font-semibold text-yellow-400">
      Profile
    </h1>
    <p className="text-center text-gray-400">Your profile information</p>

    <div className="flex flex-col items-center space-y-3">
      <div className="relative w-24 h-24">
        <img
          
          src={selectedImg || authUser.profilePic ||"/avatar.png"}
          alt="Profile"
          className="w-full h-full rounded-full border-5 border-yellow-400"
        />
        <label htmlFor="file-upload" className={`absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full cursor-pointer 
        ${isUpdatingProfile ? 'opacity-50 pointer-events-none' : ''}
          `}>
          <Camera className="text-black" />
          <input
          type="file"
          id="file-upload" 
           className="hidden"
           onChange={handleImageUpload} 
           disabled={isUpdatingProfile}
           />
        </label>
      </div>
      <p className="text-gray-400 text-sm">{isUpdatingProfile ? "Uploading..." : "click the camera icon to update your photo"}
      </p>
    </div>

    <div className="space-y-4 ">
      <div className="space-y-1.5">
      <p className="px-4 py-2.5 bg-base-100 rounded-lg border flex items-center">
        <User className="text-yellow-400 mr-3" />
        {authUser?.name}</p>
      </div>
      <p className="px-4 py-2.5 bg-base-100 rounded-lg border flex items-center">
        <Mail className="text-yellow-400 mr-3 " />
        {authUser?.email}</p>
    </div>

    <div className="bg-gray-700 rounded-lg p-4">
      <h2 className="text-yellow-400 font-semibold">Account Information</h2>
      <div className="flex justify-between mt-2">
        <span className="text-gray-400">Member Since</span>
        <span className="text-white">2024</span>
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-gray-400">Account Status</span>
        <span className="text-green-400">Active</span>
      </div>
    </div>
  </div>
</div>
);
}

export default ProfilePage;
