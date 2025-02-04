export const getErrorMessage = (err) => {
    //console.log(err.name);
    switch(err.name){
        case 'ValidationError':
            return Object.values(err.errors).at(0).message; //->[0]
        default:
            return err.message;
    }
    
}