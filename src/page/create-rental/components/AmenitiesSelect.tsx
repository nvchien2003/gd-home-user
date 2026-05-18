import { Checkbox, Form } from "antd";

const AMENITIES = [
  "Wifi",
  "Air conditioning",
  "Parking",
  "Kitchen",
  "Laundry",
  "Security",
  "Balcony",
  "Pet friendly",
];

export default function AmenitiesSelect() {
  return (
    <Form.Item
      name="amenities"
      label="Amenities"
      rules={[{ required: true, message: "Select at least one amenity" }]}
    >
      <Checkbox.Group className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {AMENITIES.map((amenity) => (
          <Checkbox key={amenity} value={amenity}>
            {amenity}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </Form.Item>
  );
}
