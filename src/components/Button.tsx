import type { ComponentProps } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type ButtonStyleProps = { tone?: "dark" | "accent"; className?: string };

export default function Button({ tone = "dark", className, type = "button", ...props }: ComponentProps<"button"> & ButtonStyleProps) {
  return <button {...props} type={type} className={[styles.button, className].filter(Boolean).join(" ")} data-tone={tone} />;
}

export function ButtonLink({ tone = "dark", className, ...props }: ComponentProps<typeof Link> & ButtonStyleProps) {
  return <Link {...props} className={[styles.button, className].filter(Boolean).join(" ")} data-tone={tone} />;
}
