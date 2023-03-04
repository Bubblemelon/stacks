import styles from "../styles/Item.module.css";
import DepositBtn from "./DepositBtn";

export default function Item() {
  return (
    <div className={styles.card}>
      <img className={styles.image} src="https://i.imgur.com/W2KVhB5.png" />
      <h2>Green Keycap</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <p>Escrow Pool Balance: {""}</p>
      <DepositBtn />
    </div>
  );
}
