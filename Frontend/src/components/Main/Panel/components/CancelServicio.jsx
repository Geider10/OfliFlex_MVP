import styles from '../panel.module.css';
import axios from 'axios';
import {useContext} from 'react';
import context from '../../../../context/context';
const CancelServicio = ({id}) =>{
    const {authToken} = useContext(context)
    const handleDeleteServicio = async () => {
        console.log(id);
        try {
            await axios.delete(`http://localhost:3000/servicios/${id}`,
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