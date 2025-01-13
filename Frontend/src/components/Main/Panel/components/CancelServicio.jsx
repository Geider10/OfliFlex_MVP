import styles from '../panel.module.css';
import axios from 'axios';
import {useContext} from 'react';
import context from '../../../../context/context';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const CancelServicio = ({id}) =>{
    const {authToken} = useContext(context)
    const handleDeleteServicio = async () => {
        console.log(id);
        try {
            await axios.delete(`${BACKEND_URL}/servicios/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            )
            console.log('se elimino el servicio');
        } catch (error) {
            console.log('error al eliminar el servicio',error)
        }
    }

    return (
        <li onClick={handleDeleteServicio} className={styles.link}>Eliminar</li>
    )
}
export default CancelServicio