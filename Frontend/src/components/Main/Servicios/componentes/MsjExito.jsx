import React from 'react'
import styles from '../ServicioDetail.module.css'
import { Link } from 'react-router-dom'

export const MsjExito = ({ servicio, usuario, reservaId }) => {
  return (
    <>
      {servicio && usuario &&
        <div className={`${styles.center_column} ${styles.container_msj}`}>
          <h1 className={styles.titulo_msj}>Reserva exitosa</h1>
          <div>
            <h5 className={styles.datos}><b>Lugar reservado: </b> {servicio.titulo}</h5>
            <h5 className={styles.datos}><b>Fecha: </b>{servicio.fecha} </h5>
            <h5 className={styles.datos}><b>Horario:</b> {servicio.hora}</h5>
            <h5 className={styles.datos}><b>Código de reserva: </b> {reservaId}</h5>
          </div>

          <div className={`${styles.center_column} ${styles.last_msj}`}>
            <p className={styles.datos}><b>Enviamos los datos de tu reserva a tu casilla de correo electrónico.</b></p>
            <p className={styles.datos}><b>¡Muchas gracias!</b></p>
            <Link to={`/panel`} className={styles.btn}>Ver reserva</Link>
          </div>

        </div>
      }

    </>
  )
}
