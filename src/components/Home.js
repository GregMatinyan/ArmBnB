import styles from "./Home.module.css";
import Header from "./headerComponents/Header";
import Categories from "./Categories";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <Categories />
      </div>
    </>
  );
}
