import React from "react";

interface DefaultButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; 
  disabled?: boolean
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  children,
  ...props
}) => {
  return <button {...props}>{children}</button>;
};

export default DefaultButton;
