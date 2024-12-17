import { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Context from "../../context/context";
import OptionsUser from "./OptionsUser";
import styles from "./Header.module.css";

const Header = () => {
  const { loggedIn} = useContext(Context);
  const [dropDown, setDropDown] = useState(false)
  const handleDropDown = () =>{
    setDropDown(!dropDown)
  }
  const closeDropDown = () =>{
    if(dropDown){
      setDropDown(false)
    }
  }

  const [show, setShow] = useState(true);
  const controlNavbar = () => {
    if (window.scrollY > 250) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
    <div className={`${styles.container} ${!show ? styles.hidden : ""}`}>
      <div className={styles.container_menu}>
        <Link to="/" onClick={closeDropDown}>
          <img className={styles.logo} src="/Logotipo.png" alt="logo" />
        </Link>
        <ul className={styles.container_ul}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.navlink} ${styles["navlink-active"]}` : styles.navlink
            }
            to="/"
            onClick = {closeDropDown}
          >
            Inicio
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.navlink} ${styles["navlink-active"]}` : styles.navlink
            }
            to="/servicios/oficinas"
            onClick = {closeDropDown}
          >
            Servicios
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.navlink} ${styles["navlink-active"]}` : styles.navlink
            }
            to="/galeria"
            onClick = {closeDropDown}
          >
            Galería
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.navlink} ${styles["navlink-active"]}` : styles.navlink
            }
            to="/contacto"
            onClick = {closeDropDown}
          >
            Contacto
          </NavLink>
        </ul>

        {loggedIn ? (
          <OptionsUser dropDown={dropDown} closeDropDown = {closeDropDown} handleDropDown = {handleDropDown}/>
        ) : (
          <Link to="/ingresar">
            <button className={styles.btn}>Ingresar</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;