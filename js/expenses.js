//adding expenses data to table from firestore onload of page
firebase.firestore().collection("expenses").get()
    .then((querySnapshot) => {
        var content = "";
        var num = 1;

        querySnapshot.forEach((doc) => {
            var expense = doc.data().expense;
            var amount = doc.data().amount;
            var date = doc.data().date;
            var time = doc.data().time;

            // console.log(num+" "+clientName+" "+amount+" "+date+" "+time);
            content += "<tr>";
                content += "<th scope=\"row\">"+ num +"</th>";
                content += "<td>"+ expense +"</td>";
                content += "<td>Ksh. "+ amount +"</td>";
                content += "<td>"+ date +"</td>";
                content += "<td>"+ time +"</td>";
                content += "<td><span class=\"removeIcon\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></span></td>";
            content += "</tr>";

            num = num + 1;
        })
        $("#expensesTableBody").append(content);
    })

//adding expense data to its respective firestore collection
function expenseDataSubmit(){
    var expense = document.getElementById("expenseName").value;
    var amount = document.getElementById("expenseAmount").value;
    var date = document.getElementById("expenseDate").value;
    var time = document.getElementById("expenseTime").value;

    console.log(expense+" "+amount+" "+date+" "+time);

    firebase.firestore().collection("expenses").doc().set({
        expense: expense,
        amount: amount,
        date: date,
        time: time
    }).then(() => {
        window.location.reload();
    })
}