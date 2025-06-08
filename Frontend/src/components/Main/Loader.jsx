import {ColorRing} from 'react-loader-spinner';
import style from './Main.module.css';
const Loader = () => {
    return (
        <div className={style.container_loader}>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel='color-ring-loading'
                colors={["#4169e1", "#4169e1", "#4169e1", "#4169e1", "#4169e1"]}
               />
        </div>
    )
}
export default Loader
