
export const API_NOTIFICATION_MESSAGE ={
    loding:{
        title:"loading....",
        message:"Data is being loaded, please wait"
    },
    sucess:{
        title:"Success",
        message:"Data is successFully loaded"
    },
    responseFailure:{
        title:"Error",
        message:"Error while fetching response from server . please try again"
    },
    requestFailure:{
        title:"Error",
        message:"Error occured while parsing request data "
    }
    ,networkError:{
        title:"Error",
        message:"Unable to connet server , network error"
    }
}

export const SERVICE_URLS = {
    userSignup:{url:'/signup',method:'POST'},
    userLogin:{url:'/login',method:'POST'},
    uploadFile:{url:'/file/upload',method:'POST'},
    createPost:{url:'/create',method:'POST'},
    getPosts:{url:'/getposts',method:'GET'},
    getPostById:{url:'/getpost/:id',method:'GET',query:true},
    updatePost:{url:'/update/:id',method:'PUT',params:true},
    deletePost:{url:'/delete',method:'DELETE',query:true}
}