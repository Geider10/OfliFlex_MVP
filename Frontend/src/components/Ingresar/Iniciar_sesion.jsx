import styles from './Ingresar.module.css';
import { useContext, useState } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Context from '../../context/context.jsx';

const Iniciar_sesion = () => {
  const { msgError, msgSuccess, setLoggedIn, navigate } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setLoggedIn(true);
      msgSuccess("Sesión iniciada con éxito")
      //navego al inicio luego de loguear para no perder el estado y no se vuelva a setear en false
      setTimeout(()=>{
        navigate("/");
      },2000)
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response.data);
      msgError("Error al iniciar sesión. Registrese o vuelva a intentar")
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit} className={styles.form} >
        <input
          type="email"
          placeholder="Correo electrónico*"
          className={styles.standar}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='username'
        />
        <input
          type="password"
          placeholder="Contraseña*"
          className={styles.standar}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
        />
        <button type="submit" className={styles.btn}>Ingresar</button>
        <p className={styles.parrafo}>¿No tienes una cuenta? Presiona crear cuenta</p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Iniciar_sesion;