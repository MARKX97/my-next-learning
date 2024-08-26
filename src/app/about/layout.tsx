import Link from "next/link";
import styles from "./about.module.css";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={styles["about-container"]}>
      <h1>Welcome to About Page</h1>
      <h2>
        <Link href="/about">返回About</Link>
      </h2>
      {children}
    </section>
  );
}
