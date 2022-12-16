//adding income data to its respective firestore collection
function incomeDataSubmit(){
    var clientName = document.getElementById("incomeClientName").value;
    var amount = document.getElementById("incomeAmount").value;
    var date = document.getElementById("incomeDate").value;
    var time = document.getElementById("incomeTime").value;

    console.log(clientName+" "+amount+" "+date+" "+time);

    firebase.firestore().collection("income").doc().set({
        clientName: clientName,
        amount: amount,
        date: date,
        time: time
    }).then(() => {
        window.location.reload();
    })
}