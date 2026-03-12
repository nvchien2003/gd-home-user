interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

export default function CustomButton({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: CustomButtonProps) {
  return (
    <button
      type={type}
      className={`custom-btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}