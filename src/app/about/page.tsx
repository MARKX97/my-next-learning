import Link from "next/link";
import styles from "./about.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <p>This is the home page content.</p>
      <ul className={styles["page-list"]}>
        <li>
          <Link href="/about/me">Me Page</Link>
        </li>
        <li>
          <Link href="/about/others">Others Page</Link>
        </li>
        <li>
          <Link href="/about/blog">Blog Page</Link>
        </li>
        <li>
          <Link href="/about/dynamic/1">Dynamic Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default About;


