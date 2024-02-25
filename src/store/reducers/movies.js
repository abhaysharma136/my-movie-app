const initialState = {
  movies: [],
};

const movieReducer= (state=initialState, action)=>{
    switch(action.type) {
        case 'Add_Movie':
            return {
                ...state,
                movies: [...state.movies, action.payload],
            };

        case 'Delete_Movie':
            return {
                ...state,
                movies:[]
            }
    }
}