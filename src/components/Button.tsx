import React from "react";

interface ButtonProps {
  border: string;
  color: string;
  font: string;
  children?: React.ReactNode;
  height: string;
  onClick?: () => void;
  radius: string
  width: string;
  fontfamily: string;
}
const Button: React.FC<ButtonProps> = ({
  border,
  color,
  font,
  children,
  height,
  onClick,
  radius,
  width,
  fontfamily
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        border,
        borderRadius: radius,
        fontSize: font,
        fontFamily: fontfamily,
        height,
        width
    }}
    >
      {children}
    </button>
  );
}
export default Button;
