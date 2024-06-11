import styles from './Servicios.module.css';
import ServicioCard from './componentes/ServicioCard.jsx';
import { useContext } from 'react';
import Context from '../../../context/context.jsx';
import { Buscador } from '../../Filtrado/Buscador.jsx';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const ServicioCategoria = () => {
  const { serviciosFiltrados } = useContext(Context);
  const { categoria } = useParams();

  const servicios = serviciosFiltrados.filter(servicio => servicio.categoria.toLowerCase() === categoria.toLowerCase());

  return (
    <div className={styles.container}>

      <div className={styles.banner_categoria}>
        <h2 className={styles.title_categoria}>{categoria.toUpperCase()}</h2>
      </div>

      <ul className={styles.container_ul}>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.navlink_cat} ${styles["navlink-active"]}` : styles.navlink_cat)}
          to="/servicios/oficinas"
        >
          Oficinas
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.navlink_cat} ${styles["navlink-active"]}` : styles.navlink_cat)}
          to="/servicios/salas"
        >
          Salas
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.navlink_cat} ${styles["navlink-active"]}` : styles.navlink_cat)}
          to="/servicios/eventos"
        >
          Eventos
        </NavLink>
      </ul>

      <Buscador categoria={categoria} />

      <div className={styles.container_reservas}>
        {servicios.map(servicio => (
          <ServicioCard
            key={servicio.servicioID}
            id={servicio.servicioID}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
            disponible={servicio.disponible}
            imagen={servicio.imagen}
            fecha={servicio.fecha}
            hora={servicio.hora}
            categoria={servicio.categoria}
          />
        ))}
      </div>

    </div>
  );
};

export default ServicioCategoria;