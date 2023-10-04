import Image from "next/image";
import React, { MouseEventHandler, ReactNode } from "react";

type Props = {
  type: "button" | "submit";
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  isSubmitting?: boolean;
  handleClick?: MouseEventHandler;
  bgColor?: string;
  textColor?: string;
};
const Button = ({
  type,
  title,
  leftIcon,
  rightIcon,
  isSubmitting,
  handleClick,
  bgColor,
  textColor,
}: Props) => {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      // bgColor && textColor
      className={`${
        isSubmitting ? " bg-black/50" : bgColor || " bg-primary-purple"
      } ${
        textColor || "text-white"
      } rounded-xl text-sm font-meddium max-md:w-full flexCenter gap-3 px-4 py-3`}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
      {title}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right" />
      )}
    </button>
  );
};

export default Button;
