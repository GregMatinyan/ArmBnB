import styles from "./Home.module.css";
import Header from "./headerComponents/Header";
import Categories from "./Categories";
import HostDescriptions from "./HostDescriptions";

export default function Home() {
  return (
    <>
      <div className={styles.homeContainer}>
        <Header />
        <Categories />
        <HostDescriptions />
      </div>
    </>
  );
}
