import {useContext,useEffect} from 'react'
import style from '../panel.module.css';
import context from '../../../../context/context.jsx';
import axios from 'axios';
import {ToastContainer} from 'react-toastify';
import {useForm} from 'react-hook-form';    

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const PostUser = ({btnEdit}) =>{
    const { authToken,usuario,msgSuccess} = useContext(context)
    const {register, handleSubmit, reset, setValue } = useForm()   
    useEffect(()=>{
        setValue('nombre',usuario.nombre)
        setValue('apellido',usuario.apellido)
        setValue('edad',usuario.edad)
        setValue('telefono',usuario.telefono)        
    },[])
    const onSubmit = async (formData) => {
        btnEdit()//false

        try {
            await axios.put(`${BACKEND_URL}/user/${usuario._id}`,formData,
                {
                    headers: {
                        Authorization: 'Bearer ' + authToken
                    }
                }
            )
            msgSuccess('Se editaron los datos con éxito')
            reset()
        } catch (error) {
            console.error('Error al editar los datos', error);
        }
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <div className={style.inputs_textContainer}> 
                <div className={style.div_inputs}>
                    <input type="text" className={style.inputs} placeholder="Nombre*" {
                        ...register('nombre')}/>
                </div>
                <div className={style.div_inputs}>
                    <input type="text" className={style.inputs} placeholder="Apellido*" {
                        ...register('apellido')}/>
                </div> 
                <div className={style.div_inputs}>
                    <input type="number" className={style.inputs} placeholder="Edad*" {
                        ...register('edad')}/>
                </div> 
                <div className={style.div_inputs}>
                    <input type="number" className={style.inputs} placeholder="Teléfono*" {
                        ...register('telefono')}/>
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