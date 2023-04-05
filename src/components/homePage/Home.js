import styles from "./Home.module.css";
import Header from "../header/Header";
import Categories from "./Categories";
import HostDescriptions from "./HostDescriptions";

export default function Home() {
  return (
    <>
      <div className={styles.homeContainer}>
        <Header search={true} />
        <Categories />
        <HostDescriptions />
      </div>
    </>
  );
}
