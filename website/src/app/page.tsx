import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./styles/page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <div>
          Welcome to our web3 crowdfunding platform. Our platform is built on
          the principles of privacy and security, ensuring that every
          transaction is conducted in a safe and anonymous manner. Using zk
          technology, we enable our users to donate or receive donations without
          revealing their personal information, ensuring complete
          confidentiality.
        </div>
        <div className={styles.center}>GO EARLY</div>
      </div>
    </main>
  );
}
