import * as ActionTypes from './ActionTypes';

export const favoritos = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:
          if (state.some(el => el === action.payload))
            return state;
          else
            return state.concat(action.payload);

        case ActionTypes.BORRAR_FAVORITO:
          if (state.some(el => el === action.payload)){
              var index = state.indexOf(action.payload);
              if (index !== -1){
                var newstate = [...state];
                newstate.splice(index, 1);
                return newstate;
              }
          }
          return state;

        default:
          return state;
    }
};
