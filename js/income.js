//adding income data to table from firestore onload of page
firebase.firestore().collection("income").get()
    .then((querySnapshot) => {
        var content = "";
        var num = 1;

        querySnapshot.forEach((doc) => {
            var clientName = doc.data().clientName;
            var amount = doc.data().amount;
            var date = doc.data().date;
            var time = doc.data().time;
            var docId = doc.data().incomeId;

            content += "<tr>";
                content += "<th scope=\"row\">"+ num +"</th>";
                content += "<td>"+ clientName +"</td>";
                content += "<td>Ksh. "+ amount +"</td>";
                content += "<td>"+ date +"</td>";
                content += "<td>"+ time +"</td>";
                content += "<td><span data-bs-toggle=\"modal\" data-bs-target=\"#editIncomeModal\" onclick=editRow(\""+docId+"\") class=\"rowIcon\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></span></td>";
                content += "<td><span data-bs-toggle=\"modal\" data-bs-target=\"#deleteModal\" onclick=removeRow(\""+docId+"\") class=\"rowIcon\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></span></td>";
            content += "</tr>";

            num = num + 1;
        })
        $("#incomeTableBody").append(content);
    })

//adding income data to its respective firestore collection
function incomeDataSubmit(){
    var clientName = document.getElementById("incomeClientName").value;
    var amount = document.getElementById("incomeAmount").value;
    var date = document.getElementById("incomeDate").value;
    var time = document.getElementById("incomeTime").value;

    var incomeRow = firebase.firestore().collection("income").doc();

    incomeRow.set({
        clientName: clientName,
        amount: amount,
        date: date,
        time: time,
        incomeId: incomeRow.id
    }).then(() => {
        window.location.reload();
    });
}

//removing a row(document) of income data onclick of its removeBtn
function removeRow(docId, num){
    //collecting 
    firebase.firestore().collection("income").where("incomeId", "==", docId).get()
        .then((incomeData) =>{

            incomeData.forEach((doc)=>{
                //getting row data and putting it in variable as string
                var clientName = doc.data().clientName;
                var amount = doc.data().amount;
                var date = doc.data().date;
                var time = doc.data().time;
                let outputText = clientName + "\tKsh. " + amount + "\t" + date + "\t" + time;

                document.getElementById("deleteModalContent").innerText = outputText;
            });
        })
        .catch((error) => {
            console.log(error.message);
        })
    
    //function to delete income row data from firestore
    document.getElementById("deleteBtn").onclick = function(){
        console.log("Delete clicked");
        firebase.firestore().collection("income").doc(docId).delete()
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
}

//function to update the data of an income row in firestore
function editRow(docId){
    console.log(docId);
    firebase.firestore().collection("income").where("incomeId", "==", docId).get()
        .then((incomeData) => {
            console.log(incomeData);
            incomeData.forEach((doc) =>{
                var clientName = doc.data().clientName;
                var amount = doc.data().amount;
                var date = doc.data().date;
                var time = doc.data().time;

                console.log(clientName);
                
                document.getElementById("editIncomeClientName").value = clientName;
                document.getElementById("editIncomeAmount").value = amount;
                document.getElementById("editIncomeDate").value = date;
                document.getElementById("editIncomeTime").value = time;
            });
        })
        .catch((error) => {
            console.log(error.message);
        });

    //function to update income row data from firestore
    document.getElementById("updateIncomeBtn").onclick = function(){
        console.log("Delete clicked");
        var clientName = document.getElementById("editIncomeClientName").value;
        var amount = document.getElementById("editIncomeAmount").value;
        var date = document.getElementById("editIncomeDate").value;
        var time = document.getElementById("editIncomeTime").value;

        firebase.firestore().collection("income").doc(docId).update({
            clientName: clientName,
            amount: amount,
            date: date,
            time: time,
            incomeId: docId
        })
        .then(() => {
            window.location.reload();
        })
        .error((error) => {
            console.log(error.message);
        });
    }

}