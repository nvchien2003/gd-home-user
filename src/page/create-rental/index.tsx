import { Button, Form, Input, InputNumber, Select, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { Home, MapPin, Phone, Tag } from "lucide-react";
import { useAuth } from "../../provider/auth.context";
import { usePreview } from "../../hook/medias.hook";
import { useLoading } from "../../hook/useLoading";
import type {
  CreateRentalPostPayload,
  RoomType,
} from "../../api/rental-post/rental-post.interface";
import AmenitiesSelect from "./components/AmenitiesSelect";
import RentalImageUpload from "./components/RentalImageUpload";
import { useCreateRentalPostMutation } from "../../hook/api.hooks";

interface CreateRentalFormValues {
  title: string;
  description: string;
  pricePerMonth: number;
  address: string;
  location: string;
  roomType: RoomType;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  amenities: string[];
}

const ROOM_TYPES: Array<{ label: string; value: RoomType }> = [
  { label: "Apartment", value: "apartment" },
  { label: "House", value: "house" },
  { label: "Villa", value: "villa" },
  { label: "Studio", value: "studio" },
  { label: "Shared room", value: "shared_room" },
];

export default function CreateRentalPage() {
  const [form] = Form.useForm<CreateRentalFormValues>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loading, start, stop } = useLoading("create-rental");
  const { filePreview, onChangeFiles, onRemoveFile, onUpload, uploadProgress } = usePreview(6, "rental");
  const createRentalPost = useCreateRentalPostMutation();

  const handleSubmit = async (values: CreateRentalFormValues) => {
    if (!filePreview.length) {
      notification.error({ message: "Upload at least one room image" });
      return;
    }

    try {
      start();
      const uploadResponse = await onUpload(filePreview);
      const images = Array.isArray(uploadResponse)
        ? uploadResponse.map((item) => item.url).filter(Boolean)
        : [uploadResponse?.url].filter(Boolean);

      const payload: CreateRentalPostPayload = {
        ...values,
        pricePerMonth: Number(values.pricePerMonth),
        images,
      };

      await createRentalPost.mutateAsync(payload);
      message.success("Rental post created successfully");
      navigate("/history");
    } catch {
      notification.error({
        message: "Create rental post failed",
        description: "Please check your information and try again.",
      });
    } finally {
      stop();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-600 mb-2">Rental listing</p>
        <h1 className="text-3xl font-bold text-gray-900">Create Rental Post</h1>
        <p className="text-gray-500 mt-2">
          Add room details, photos, pricing, and contact information for renters.
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          contactName: user ? `${user.firstName} ${user.lastName}` : "",
          contactEmail: user?.email,
          contactPhone: user?.phone,
          amenities: [],
        }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Home className="h-5 w-5 text-indigo-600" />
              <h2 className="font-bold text-gray-900">Room details</h2>
            </div>

            <Form.Item
              name="title"
              label="Title"
              rules={[
                { required: true, message: "Please enter a title" },
                { min: 8, message: "Title must be at least 8 characters" },
              ]}
            >
              <Input placeholder="Modern studio near city center" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter a description" },
                { min: 30, message: "Description must be at least 30 characters" },
              ]}
            >
              <Input.TextArea
                rows={5}
                placeholder="Describe the space, neighborhood, house rules, and what renters can expect..."
              />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="pricePerMonth"
                label="Room price"
                rules={[{ required: true, message: "Please enter the monthly price" }]}
              >
                <InputNumber<number>
                  min={1}
                  className="w-full"
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => Number(value?.replace(/\$\s?|(,*)/g, "") || 0)}
                />
              </Form.Item>

              <Form.Item
                name="roomType"
                label="Room type"
                rules={[{ required: true, message: "Please select a room type" }]}
              >
                <Select
                  placeholder="Select category"
                  options={ROOM_TYPES}
                />
              </Form.Item>
            </div>

            <AmenitiesSelect />
          </section>

          <section className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="h-5 w-5 text-indigo-600" />
              <h2 className="font-bold text-gray-900">Location</h2>
            </div>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter the address" }]}
            >
              <Input placeholder="Street, building, ward" />
            </Form.Item>

            <Form.Item
              name="location"
              label="City / Province"
              rules={[{ required: true, message: "Please enter the location" }]}
            >
              <Input placeholder="Ho Chi Minh City" />
            </Form.Item>
          </section>

          <section className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Phone className="h-5 w-5 text-indigo-600" />
              <h2 className="font-bold text-gray-900">Contact information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="contactName"
                label="Contact name"
                rules={[{ required: true, message: "Please enter a contact name" }]}
              >
                <Input placeholder="Your name" />
              </Form.Item>

              <Form.Item
                name="contactPhone"
                label="Phone"
                rules={[{ required: true, message: "Please enter a phone number" }]}
              >
                <Input placeholder="+84..." />
              </Form.Item>
            </div>

            <Form.Item
              name="contactEmail"
              label="Email"
              rules={[
                { required: true, message: "Please enter an email" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input placeholder="you@email.com" />
            </Form.Item>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-5">
              <Tag className="h-5 w-5 text-indigo-600" />
              <h2 className="font-bold text-gray-900">Publish</h2>
            </div>

            <RentalImageUpload
              filePreview={filePreview}
              onChangeFiles={onChangeFiles}
              onRemoveFile={onRemoveFile}
              uploadProgress={uploadProgress}
            />

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Create rental post
            </Button>
          </div>
        </aside>
      </Form>
    </div>
  );
}
