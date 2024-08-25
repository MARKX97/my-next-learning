import Link from "next/link";
import styles from "./about.module.css";

const About = () => (
  <div className={styles.about}>
    <p>This is the home page content.</p>
    <ul>
      <Link href="/about/me">Me Page</Link>
      <Link href="/about/others">Others Page</Link>
    </ul>
  </div>
);

export default About;
