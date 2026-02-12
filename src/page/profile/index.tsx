
import { Camera } from 'lucide-react';
import { useAuth } from '../../provider/AuthProvider';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Profile Settings</h1>
      
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
           <h2 className="font-bold text-gray-900">Personal Information</h2>
           <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Save Changes</button>
        </div>
        <div className="p-6">
           <div className="flex items-center gap-6 mb-8">
             <div className="relative">
               <img src={user?.avatar} alt={user?.firstName} className="w-24 h-24 rounded-full object-cover" />
               <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-md">
                 <Camera className="h-4 w-4" />
               </button>
             </div>
             <div>
               <h3 className="font-bold text-lg text-gray-900">{user?.firstName} {user?.lastName}</h3>
               <p className="text-sm text-gray-500">Update your photo and personal details.</p>
             </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
               <input type="text" defaultValue={`${user?.firstName} ${user?.lastName}`} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
               <input type="email" defaultValue={user?.email} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
               <input type="text" placeholder="+1 (555) 000-0000" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
               <input type="text" placeholder="San Francisco, CA" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
             </div>
           </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
           <h2 className="font-bold text-gray-900">Security</h2>
        </div>
        <div className="p-6">
           <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
             <div>
               <h3 className="font-medium text-gray-900">Password</h3>
               <p className="text-sm text-gray-500">Last changed 3 months ago</p>
             </div>
             <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Change Password</button>
           </div>
           <div className="flex items-center justify-between">
             <div>
               <h3 className="font-medium text-gray-900">Two-factor Authentication</h3>
               <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
             </div>
             <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
