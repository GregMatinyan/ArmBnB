import styles from "./Home.module.css";
import Header from "../headerComponents/Header";
import Categories from "./Categories";
import HostDescriptions from "./HostDescriptions";
import FiltersDialog from "../dialogs/FiltersDialog";

export default function Home() {
  return (
    <>
      <div className={styles.homeContainer}>
        <Header search={true} />
        <Categories />
        <FiltersDialog />
        <HostDescriptions />
      </div>
    </>
  );
}
