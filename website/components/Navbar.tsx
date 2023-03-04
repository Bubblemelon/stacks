import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <a href="">
        <img className={styles.logo} src="https://i.imgur.com/iR4V9Le.png" />
      </a>
      <a href="">Products</a>
      <a href="">Donate</a>
      <a href="">Lending Pool</a>
      <ConnectButton label="Sign in"></ConnectButton>
    </nav>
  );
}
