import { auth, provider, storage } from "../firebase";
import { SET_USER,SET_LOADING_STATUS,GET_ARTICLES } from "./actionType";
import db from "../firebase";

export const setUser = (payload) => ({
  //  taking from dispatch and setting to user
  type: SET_USER,
  user: payload,
});


export const setLoading = (status)=> ({
    type:SET_LOADING_STATUS,
    status:status,
})


export const getArticles = (payload)=>({
      type:GET_ARTICLES,
      payload:payload,
})




export function signInAPI() {
  return (dispatch) => {
    auth
      .signInWithPopup(provider) // this popup the signin
      .then((payload) => {
         console.log('paaaaaaaaaayyyyyyyyyyyyyload',payload)
        dispatch(setUser(payload.user)); // after receiving the user , dispatching it
      })
      .catch((error) => alert(error.message));
  };
}



export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut() // this popup the signin
      .then(() => {
        dispatch(setUser(null)); // after receiving the user , dispatching it
      })
      .catch((error) => console.log(error.message));
  };
}

 
   //   to  post data into database(firebase)

export function postArticleAPI(payload) {

  return (dispatch) => {

      dispatch(setLoading(true))  // start spinning when dispatch(loading)

    if (payload.image != "") {
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Progress: ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress: ${progress}%`);
          }
        },
        (error) => console.log('Error---code--actions--postArticleAPI',error.code),
        async () => {
    

          const downloadURL = await upload.snapshot.ref.getDownloadURL();
        
          db.collection("articles").add({
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            }
            ,
            video: payload.video,
            sharedImg: downloadURL,
            comments: 0,
            description: payload.description,

          });
          dispatch(setLoading(false))       // stop spinning when finished (after loading)
        }
      );
    }  else if(payload.video){

      
        db.collection('articles').add({
            actor:{
                description:payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,

            },
            video: payload.video,
            sharedImg:"",
            comments: 0,
            description: payload.description,

        });
        dispatch(setLoading(false))
    }
  };
}


//     to get data from database(firebase)

   export function getArticleAPI(){
           return (dispatch)=>{

             let payload;

             db.collection("articles")
             .orderBy("actor.date","desc")
             .onSnapshot((snapshot)=>{
                payload  = snapshot.docs.map((doc)=> doc.data())
                  dispatch(getArticles(payload));
             })
           }

   }
