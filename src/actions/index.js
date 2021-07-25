import { auth,provider } from "../firebase"; 
import { SET_USER } from "./actionType";


export const setUser = (payload) => ({         //  taking from dispatch and setting to user
    type:SET_USER,
    user:payload
})

export function signInAPI(){
         return(dispatch) =>{
             auth
                 .signInWithPopup(provider)       // this popup the signin 
                 .then((payload)=>{                     
                    dispatch(setUser(payload.user))    // after receiving the user , dispatching it
                 })
                 .catch((error)=>  alert(error.message))

         }
}


export function getUserAuth(){
    return(dispatch)=>{

         auth.onAuthStateChanged(async(user)=>{
             if(user){
                 dispatch(setUser(user))
             }
         })
    }
}



export function signOutAPI(){
    return(dispatch) =>{
        auth
            .signOut()     // this popup the signin 
            .then(()=>{                     
               dispatch(setUser(null))    // after receiving the user , dispatching it
            })
            .catch((error)=>  console.log(error.message))

    }
}