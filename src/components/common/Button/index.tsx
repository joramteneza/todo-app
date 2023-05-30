interface ButtonProps {
  variant: "primary" | "secondary";
  title: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  title,
  onClick,
  className,
}) => {
  let buttonClassName = "";
  if (variant === "primary") {
    buttonClassName = "bg-navy text-white";
  } else if (variant === "secondary") {
    buttonClassName = "bg-navy text-white";
  }

  return (
    <button
      className={`px-4 py-2 font-bold ${buttonClassName} ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
