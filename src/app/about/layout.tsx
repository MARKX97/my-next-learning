import styles from "./about.module.css";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={styles["about-container"]}>
      <h1>Welcome to Our Home Page</h1>

      {children}
    </section>
  );
}
