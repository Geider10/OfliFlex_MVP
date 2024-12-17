import { useContext } from 'react';
import { Usuario } from './Usuario';
import { Propietario } from './Propietario';
import Context from '../../../context/context';

export const Panel = () => {
  const { usuario } = useContext(Context);
  let rol;
  {
    switch (usuario.rol) {
      case 'usuario':
        return rol = <Usuario />;
      case 'propietario':
        return rol = <Propietario />;
      default:
        return rol = <Usuario />;
    }
  }
};