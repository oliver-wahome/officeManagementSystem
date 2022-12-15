//adding user authentication details to firebase on register
function registerUser(){
    var name = document.getElementById("regCompanyName").value;
    var email = document.getElementById("regEmail").value;
    var password = document.getElementById("regPassword").value;

    console.log(name + " " + email + " " + password);
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userInfo) => {
            console.log("User Logged in");
        })
        .catch((error) => {
            console.log(error.Message);
        })
}