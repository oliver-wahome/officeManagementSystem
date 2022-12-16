//adding inventory data to its respective firestore collection
function inventoryDataSubmit(){
    var item = document.getElementById("itemName").value;
    var quantity = document.getElementById("quantity").value;
    var itemCost = document.getElementById("itemCost").value;
    var amount = quantity * itemCost;
    var date = document.getElementById("itemDate").value;
    var time = document.getElementById("itemTime").value;

    console.log(item+" "+quantity+" "+itemCost+" "+amount+" "+date+" "+time);

    firebase.firestore().collection("inventory").doc().set({
        item: item,
        quantity: quantity,
        itemCost: itemCost,
        amount: amount,
        date: date,
        time: time
    }).then(() => {
        window.location.reload();
    })
}