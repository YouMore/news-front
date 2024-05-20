export const getAuthToken = () =>{
    return localStorage.getItem('auth_token');
};

export const setAuthToken = (token) => {
    if (token){
        localStorage.setItem('auth_token', token);
    } else{
        localStorage.removeItem('auth_token');
    }
}
