import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={styles.logo} data-compact={compact || undefined} aria-label="RTJ Home">
      <Image src="/images/rtj-logo.svg" alt="RTJ" width={104} height={40} />
    </Link>
  );
}
