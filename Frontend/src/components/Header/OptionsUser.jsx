import { useContext} from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import styles from "./Header.module.css";
import Context from '../../context/context';

const User = ({dropDown, closeDropDown, handleDropDown}) => {
  const {closeSession} = useContext(Context)
  const handleLogout = () => {
    closeDropDown()
    closeSession()
  }
  return (
    <div className={styles.dropdown}>
      <button className={`${styles.btn} ${styles.center}`} onClick={handleDropDown}>
        Perfil {dropDown 
        ? 
        <IoIosArrowUp size={18} style={{ marginLeft: '.2rem' }}/> 
        : 
        <IoIosArrowDown size={18} style={{ marginLeft: '.2rem' }}/>}
      </button>
      {dropDown && (
        <ul className={styles.dropdown_menu}>
          <li >
            <NavLink
              to={'/panel'}
              className={styles.link}
              onClick={closeDropDown}
            >
              Ir a mi perfil
            </NavLink>
          </li>
          <li
            onClick={handleLogout}
            className={styles.link}
          >
            Cerrar sesión
          </li>
        </ul>
      )}
    </div>
  );
};

export default User;
