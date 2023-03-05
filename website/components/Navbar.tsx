import Button from "@mui/material/Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.NavItems}>
        <a href="">
          <img className={styles.logo} src="https://i.imgur.com/302s62B.png" />
        </a>
        <a href="">About</a>
        <a href="">Catalog</a>
      </div>
      <div className={styles.NavItems}>
        <Button variant="outlined">Support Us</Button>
        <Button variant="outlined">Donate</Button>
        <ConnectButton label="Sign in"></ConnectButton>
      </div>
    </nav>
  );
}
