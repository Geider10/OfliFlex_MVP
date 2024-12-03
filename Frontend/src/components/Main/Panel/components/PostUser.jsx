import {useContext,useRef} from 'react'
import style from '../panel.module.css';
import context from '../../../../context/context.jsx';
import axios from 'axios';
import {ToastContainer} from 'react-toastify';

const PostUser = ({btnEdit}) =>{
    const { authToken,usuario,msgSuccess} = useContext(context)
    const form = useRef(null)
    const handleSubmit = async (e) => {
        btnEdit()
        e.preventDefault()

        const formu = new FormData(e.target)
        const formData = {
            nombre : formu.get('nombre'),
            apellido : formu.get('apellido'),
            edad : formu.get('edad'),
            telefono : formu.get('telefono')
        }
        try {
            await axios.put(`http://localhost:3000/user/${usuario._id}`,formData,
                {
                    headers: {
                        Authorization: 'Bearer ' + authToken
                    }
                }
            )
            msgSuccess('Se editaron los datos con éxito')
            form.current.reset()
        } catch (error) {
            console.error('Error al editar los datos', error);
        }
    }
    return(
        <form onSubmit={handleSubmit} ref={form} className={style.form}>
            <div className={style.inputs_textContainer}> 
                <div className={style.div_inputs}>
                    <input type="text" name = 'nombre' className={style.inputs} placeholder="Nombre*" required/>
                </div>
                <div className={style.div_inputs}>
                    <input type="text" name = 'apellido' className={style.inputs} placeholder="Apellido*" required/>
                </div> 
                <div className={style.div_inputs}>
                    <input type="number" name = 'edad' className={style.inputs} placeholder="Edad*" required/>
                </div> 
                <div className={style.div_inputs}>
                    <input type="number" name = 'telefono' className={style.inputs} placeholder="Teléfono*" required/>
                </div>
            </div>
            <div className={style.btn_container}>
                <button className={style.file_label} type='submit'>Editar</button>
                <button className={style.btn_edit} onClick={btnEdit}>Cancelar</button>
            </div>
            <ToastContainer/>
        </form>
    )
}
export default PostUser