import styles from "../styles/Item.module.css";

export default function Item() {
  return (
    <div className={styles.card}>
      <img className={styles.image} src="https://i.imgur.com/xd3OpeB.png" />
    </div>
  );
}
