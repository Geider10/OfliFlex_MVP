import styles from './Inicio.module.css';
import resenas from '../../../data/resenas.json';
import Servicios from '../Servicios/Servicios';
import { Resena } from './Resena';
import { NavLink } from 'react-router-dom'

const Inicio = () => {
  return (
    <div className={styles.container}>

      <div className={styles.container_portada}>
        <div>
          <h1 className={styles.title}>Nuestro espacio para vos</h1>
        </div>
      </div>
      {/* Servicios */}
      <div className={styles.container_servicios}>
        <h2 className={styles.subtitle}>Soluciones modernas</h2>
        <Servicios/>
        <NavLink to={'/servicios/oficinas'} className={styles.reservar_button}>Reservar</NavLink>

      </div>
      {/* Reseñas */}
      <div className={styles.container_servicios}>
        <h2 className={styles.subtitle}>Reseñas</h2>
{/* 
        <div className={styles.resenas}>
          {resenas.map((item) => {
            return (
              <Resena
                key={item.id}
                nombre={item.nombre}
                descripcion={item.descripcion}
                img={item.img}
                fecha={item.fecha}
                puntuacion={item.puntuacion}
              />
            )
          })}
        </div> */}

      </div>

    </div>

  )
}

export default Inicio