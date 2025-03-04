import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs,limit , query, where, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBO5R1pBY0ZgxLif13xHDhu15aCHi212kY",
    authDomain: "database-e77bf.firebaseapp.com",
    projectId: "database-e77bf",
    storageBucket: "database-e77bf.firebasestorage.app",
    messagingSenderId: "445149188563",
    appId: "1:445149188563:web:7de8f2b637871929fe5f26"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


let sendRequestFriend = document.querySelector(".requestboxreqfrd");
sendRequestFriend.addEventListener("click", (e) => {
  e.target.remove();
})
sendRequestFriend.addEventListener("click", async () => {

    try {
        const docRef = await addDoc(collection(db, "requests"), {
          Name: "Person",
          From: window.localStorage.getItem('userEmail'),
          To: "xyz@gmail.com",
          Status: "Request Sent"
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}); 
// sendRequestFriend.innerHTML = "<button>Request Send</button>";
// sendRequestFriend.classList.add("requestedboxreqfrd");
// sendRequestFriend.classList.remove("requestboxreqfrd");


async function getAllMails(){
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const userReq = collection(db, "usermails");
  const q = query(collection(db, "usermails"), where("userEmail", "!=", window.localStorage.getItem('userEmail')), limit(6));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let none = document.querySelector(".none");
    none.style.display = "none";
    let div = document.createElement("div");
    div.classList.add("requestbox");
    div.innerHTML = `<div class="requestboximg"><img src=${doc.data().dpURL} alt=""></div>
    <div class="requestboxhd"><h4>${doc.data().userName}</h4></div>
    <div class="requestboxreqfrd"><button class="mail" id=${doc.data().userEmail}>Add Friend</button></div>
    <div class="requestboxremfrd"><button>Remove Friend</button></div>`;
    
    let Maindiv = document.querySelector(".requestdiv");
    Maindiv.appendChild(div);
  });
}
getAllMails();

async function getDpandUser_Name() {

  const qi = query(collection(db, "usermails"), where("userEmail", "==", window.localStorage.getItem('userEmail')));
  const querySnapshot = await getDocs(qi);
  querySnapshot.forEach((doc) => {
      let UserName = doc.data().userName;
      let UserDP = doc.data().dpURL;
      let Logo = document.querySelector(".navbarlogo");
      Logo.src = UserDP;
      let Lo = document.querySelector(".lo");
      Lo.src = UserDP;
      let UserNameText = document.querySelector(".logosidetext");
      UserNameText.innerText = UserName;
  });

}
getDpandUser_Name();

// window.document.querySelectorAll(".requestboxreqfrd").forEach(button => {
//   button.addEventListener("click", () => {
//       console.log("fdfd");
//   });
// });