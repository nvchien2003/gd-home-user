import { Camera } from "lucide-react";
import { useAuth } from "../../provider/AuthProvider";
import { Form, Spin, Upload, notification } from "antd";
import type { UploadProps } from "antd";
import { usePreview } from "../../hook/medias.hook";
import { UserApi } from "../../api/user/user.api";
import { useLoading } from "../../hook/useLoading";
import CustomInput from "../../component/Input";
import { useEffect } from "react";


export default function ProfilePage() {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const { loading, start, stop } = useLoading("profile");
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

  useEffect(() => {
    form.setFieldsValue({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone,
      location: user?.location,
    })
  }, [user])

  const handleSave = async () => {
    try {
      start();
      let avatarUrl = user?.avatar;
      if (filePreview?.length) {
        const uploadRes = await onUpload(filePreview);

        avatarUrl = uploadRes?.[0]?.url || uploadRes?.url;
      }
      const values = form.getFieldsValue();
      if (values?.email === user?.email) {
        values.email = null;
      }
      await UserApi.updateProfileApi({
        ...user,
        avatar: avatarUrl,
        ...values,
      });

      notification.success({
        message: "Profile updated successfully",
      });

    } catch (error) {
      notification.error({
        message: "Update profile failed",
      });
    } finally {
      stop();
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Personal Information</h2>

          <button
            onClick={handleSave}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            {loading ? <Spin size="large" /> : "Save Changes"}
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={filePreview?.at(-1)?.preview ?? user?.avatar ?? "/image/avatar.png"}
                  alt={user?.firstName}
                  className="w-full h-full object-cover"
                />
              </div>
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

          <Form form={form} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <CustomInput
                type="text"
                name="firstName"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <CustomInput
                name="lastName"
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <CustomInput
                name="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <CustomInput
                name="phone"
                type="text"
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <CustomInput
                name="location"
                type="text"
                placeholder="San Francisco, CA"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}