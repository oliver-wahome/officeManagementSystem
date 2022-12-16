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

            // console.log(num+" "+clientName+" "+amount+" "+date+" "+time);
            content += "<tr>";
                content += "<th scope=\"row\">"+ num +"</th>";
                content += "<td>"+ clientName +"</td>";
                content += "<td>Ksh. "+ amount +"</td>";
                content += "<td>"+ date +"</td>";
                content += "<td>"+ time +"</td>";
                content += "<td><span class=\"removeIcon\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></span></td>";
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