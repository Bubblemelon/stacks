import styles from "../styles/Inventory.module.css";
import Item from "../components/Item";

export default function Inventory() {
  return (
    <div className={styles.grid}>
      <Item></Item>
    </div>
  );
}
