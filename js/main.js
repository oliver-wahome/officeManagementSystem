//adding user authentication details to firebase on register
function registerUser(){
    var name = document.getElementById("regCompanyName").value;
    var email = document.getElementById("regEmail").value;
    var password = document.getElementById("regPassword").value;

    console.log(name + " " + email + " " + password);
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userInfo) => {
            console.log("User registered and logged in");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.log(error.Message);
        })
}

//checking if user has a firebase authentication account
function loginUser() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    console.log(email + " " + password);

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userInfo) => {
            console.log("User logged In");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.log(error.message);
        })
}