
export const getAccessToken = ()=>{
    return sessionStorage.getItem('accessToken')
}

export const shortString = (str,len)=>{
    return str.length > len ? str.substring(0,len) + '...' : str;
}