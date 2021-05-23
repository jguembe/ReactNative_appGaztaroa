import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../comun/comun';

export const comentarios = (state = { errMess: null, comentarios:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return {...state, errMess: null, comentarios: action.payload};

    case ActionTypes.COMENTARIOS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_COMENTARIO:
      let mayorid = 0;
      state.comentarios.map((comentario, key) => {
        if (comentario.id> mayorid)
          mayorid = comentario.id;
      });
      mayorid++;
      action.payload.id=mayorid;
      let errmsg = null;
      // Simple POST request with a JSON body using fetch
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( action.payload )
      };
      fetch(baseUrl + 'comentarios/'+ mayorid + '.json', requestOptions)
          .then(response => response.json())
          .catch((error) => {
            console.error(error);
            errmsg = error.message;
          });

      return {...state, errMess: errmsg, comentarios: state.comentarios.concat(action.payload)};

    default:
      return state;
  }
};
