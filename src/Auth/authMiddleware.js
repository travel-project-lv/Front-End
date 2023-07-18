class Authentication {
    isAuthentication(){
        const token = localStorage.getItem('permission')
        return token
    }
}

const authentication = new Authentication()
export default authentication;
