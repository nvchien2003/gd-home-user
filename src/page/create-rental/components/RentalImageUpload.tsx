import { Form, Upload, notification } from "antd";
import type { UploadProps } from "antd";
import { ImagePlus, X } from "lucide-react";
import type { FileUpload } from "../../../hook/medias.hook";

interface RentalImageUploadProps {
  filePreview: FileUpload[];
  onChangeFiles: UploadProps["onChange"];
  onRemoveFile: (id: string) => void;
  uploadProgress?: number;
}

export default function RentalImageUpload({
  filePreview,
  onChangeFiles,
  onRemoveFile,
  uploadProgress,
}: RentalImageUploadProps) {
  const uploadProps: UploadProps = {
    showUploadList: false,
    multiple: true,
    accept: "image/*",
    beforeUpload: (file) => {
      if (!file.type.startsWith("image/")) {
        notification.error({ message: "Only image files are allowed" });
        return Upload.LIST_IGNORE;
      }

      return false;
    },
    onChange: onChangeFiles,
  };

  return (
    <Form.Item
      label="Images"
      required
      validateStatus={filePreview.length ? undefined : "error"}
      help={filePreview.length ? undefined : "Upload at least one room image"}
    >
      <Upload {...uploadProps}>
        <button
          type="button"
          className="w-full border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
        >
          <ImagePlus className="h-8 w-8 mb-2" />
          <span className="font-medium">Upload room images</span>
          <span className="text-xs text-gray-400 mt-1">Up to 6 images</span>
        </button>
      </Upload>

      {filePreview.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {filePreview.map((image) => (
            <div key={image.id} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
              <img
                src={image.preview}
                alt="Rental preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemoveFile(image.id)}
                className="absolute top-2 right-2 p-1 bg-white text-gray-600 rounded-full shadow hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      {Boolean(uploadProgress) && (uploadProgress ?? 0) < 100 && (
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 transition-all" style={{ width: `${uploadProgress ?? 0}%` }} />
        </div>
      )}
    </Form.Item>
  );
}
