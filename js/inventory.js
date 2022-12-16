//adding inventory data to table from firestore onload of page
firebase.firestore().collection("inventory").get()
    .then((querySnapshot) => {
        var content = "";
        var num = 1;

        querySnapshot.forEach((doc) => {
            var item = doc.data().item;
            var quantity = doc.data().quantity;
            var itemCost = doc.data().itemCost;
            var amount = doc.data().amount;
            var date = doc.data().date;
            var time = doc.data().time;

            // console.log(num+" "+clientName+" "+amount+" "+date+" "+time);
            content += "<tr>";
                content += "<th scope=\"row\">"+ num +"</th>";
                content += "<td>"+ item +"</td>";
                content += "<td>"+ quantity +"</td>";
                content += "<td>Ksh. "+ itemCost +"</td>";
                content += "<td>Ksh. "+ amount +"</td>";
                content += "<td>"+ date +"</td>";
                content += "<td>"+ time +"</td>";
                content += "<td><span onclick=removeRow('"+doc.id+"') class=\"removeIcon\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></span></td>";
            content += "</tr>";

            num = num + 1;
        });
        $("#inventoryTableBody").append(content);
    })

//adding inventory data to its respective firestore collection
function inventoryDataSubmit(){
    var item = document.getElementById("itemName").value;
    var quantity = document.getElementById("quantity").value;
    var itemCost = document.getElementById("itemCost").value;
    var amount = quantity * itemCost;
    var date = document.getElementById("itemDate").value;
    var time = document.getElementById("itemTime").value;

    firebase.firestore().collection("inventory").doc().set({
        item: item,
        quantity: quantity,
        itemCost: itemCost,
        amount: amount,
        date: date,
        time: time
    }).then(() => {
        window.location.reload();
    });
}

//removing a row(document) of inventory data onclick of its removeBtn
function removeRow(docId){
    firebase.firestore().collection("inventory").doc(docId).delete()
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.log(error.message);
        });
}