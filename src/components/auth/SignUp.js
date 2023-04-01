import SignUpForm from "./SignUpForm";
import Logo from "../../assets/images/Logo.png";
import styles from "./InputForm.module.css";
import { Link } from "react-router-dom";
import { HOME_PATH } from "../../constants/path";

export default function SignUp() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logocontainer}>
          <Link to={HOME_PATH}>
            <img src={Logo} alt="logo"></img>
          </Link>
        </div>
        <SignUpForm />
      </div>
    </>
  );
}
