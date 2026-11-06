import type { ComponentProps } from "react";
import styles from "./PillButton.module.css";

type PillButtonProps = Omit<ComponentProps<"button">, "aria-pressed"> & { selected: boolean };

export default function PillButton({ selected, className, type = "button", ...props }: PillButtonProps) {
  return <button {...props} type={type} aria-pressed={selected} className={[styles.pill, className].filter(Boolean).join(" ")} />;
}
