import styles from "./Home.module.css";
import Header from "../header/Header";
import Categories from "./Categories";
import HostDescriptions from "./HostDescriptions";
import FiltersDialog from "../dialogs/FiltersDialog";

export default function Home() {
  return (
    <>
      <div className={styles.homeContainer}>
        <Header />
        <Categories />
        <FiltersDialog />
        <HostDescriptions />
      </div>
    </>
  );
}
