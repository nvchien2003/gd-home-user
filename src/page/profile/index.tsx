import { Camera } from "lucide-react";
import { useAuth } from "../../provider/AuthProvider";
import { Upload, notification } from "antd";
import type { UploadProps } from "antd";
import { usePreview } from "../../hook/medias.hook";
import { UserApi } from "../../api/user/user.api";

export default function ProfilePage() {
  const { user } = useAuth();

  const { filePreview, onChangeFiles, onUpload } = usePreview(1);
  const uploadProps: UploadProps = {
    showUploadList: false,
    multiple: false,

    beforeUpload: (file) => {
      if (!file.type.startsWith("image/")) {
        notification.error({ message: "Only image files are allowed" });
        return Upload.LIST_IGNORE;
      }

      return false; // chặn antd auto upload
    },

    onChange: onChangeFiles,
  };

  /**
   * save avatar
   */
  const handleSave = async () => {
    try {
      let avatarUrl = user?.avatar;

      /**
       * nếu có file mới thì upload
       */
      if (filePreview?.length) {
        const uploadRes = await onUpload(filePreview);

        avatarUrl = uploadRes?.[0]?.url || uploadRes?.url;
      }

      /**
       * update profile
       */
      await UserApi.updateProfileApi({
        ...user,
        avatar: avatarUrl,
      });

      notification.success({
        message: "Profile updated successfully",
      });

    } catch (error) {
      notification.error({
        message: "Update profile failed",
      });
    }
  };
  console.log(user);
  console.log(user?.avatar);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Personal Information</h2>

          <button
            onClick={handleSave}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Save Changes
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <img
                src={filePreview?.at(-1)?.preview ?? user?.avatar}
                alt={user?.firstName}
                className="w-24 h-24 rounded-full object-cover"
              />

              <Upload {...uploadProps}>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-md"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </Upload>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900">
                {user?.firstName} {user?.lastName}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>

              <input
                type="text"
                defaultValue={`${user?.firstName}`}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>

              <input
                type="text"
                defaultValue={`${user?.lastName}`}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>

              <input
                type="email"
                defaultValue={user?.email}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>

              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>

              <input
                type="text"
                placeholder="San Francisco, CA"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}