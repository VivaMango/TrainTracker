// DOIN SOME JAVASCRIPT

// Initialize Firebase to test database
var config = {
    apiKey: "AIzaSyBm6pRi90hU-NU0aiDJzpYI1FRvtUDgoKs",
    authDomain: "test-682b3.firebaseapp.com",
    databaseURL: "https://test-682b3.firebaseio.com",
    projectId: "test-682b3",
    storageBucket: "test-682b3.appspot.com",
    messagingSenderId: "804469624379"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


// When #inputSubmit button is clicked, dynamically generate new Table Row for infoDisplay in index.html
$("#inputSubmit").on("click" , function () {
    event.preventDefault()
    // rowGenerator(name , role , start , rate)
    var nameInput = $("#nameInput").val().trim()
    var destinationInput = $("#destinationInput").val().trim()
    var startInput = $("#startInput").val().trim()
    var rateInput = $("#rateInput").val().trim()
    console.log(nameInput , "nameInput") //WORKING
    console.log(destinationInput , "dI") //WORKING
    console.log(startInput , "sI") //WORKING
    console.log(rateInput , "rateI") //WORKING
    database.ref().push({
        name: nameInput,
        destination: destinationInput,
        start: startInput,
        rate: rateInput,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
    
})

database.ref().on("child_added" , function(childSnapshot) {
    console.log(childSnapshot.val().name , "cSname")
    console.log(childSnapshot.val().destination , "cSdestination")
    console.log(childSnapshot.val().start , "cSstart")
    console.log(childSnapshot.val().rate , "cSrate")
    console.log(childSnapshot.val().dateAdded , "cSdateAdded")
    var cSValname = childSnapshot.val().name
    var cSValdestination = childSnapshot.val().destination
    var cSValstart = childSnapshot.val().start
    var cSValrate = childSnapshot.val().rate
    var cSValdateAdded = childSnapshot.val().dateAdded
    rowGenerator(cSValname , cSValdestination , cSValstart , cSValrate)
})



database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added" , function(snapshot) {
    console.log(snapshot.val().name , "oBC name")
    console.log(snapshot.val().destination , "oBC destination")
    console.log(snapshot.val().start , "oBC start")
    console.log(snapshot.val().rate , "oBC rate")
    console.log(snapshot.val().dateAdded , "oBC dateAdded")
    var snapValname = snapshot.val().name
    var snapValdestination = snapshot.val().destination
    var snapValstart = snapshot.val().start
    var snapValrate = snapshot.val().rate
    var snapValdateAdded = snapshot.val().dateAdded
    rowGenerator(snapValname , snapValdestination , snapValstart, snapValrate)
})

function rowGenerator (name , destination , start , rate) {
    var newRow = $("<tr>")
    // var newData = $("<td>")
    var dataArray = [name , destination , start , rate]
    var thData = $("<th>")
    thData.attr("scope" , "row")
    dataArray.forEach(function(element) {
        var newData = $("<td>")
        newData.text(element)
        newRow.append(newData)
    })
    // var nameData = name
    // var roleData = role
    // var startData = start
    // var rateData = rate
    
    // newRow.append(newData)
    newRow.prepend(thData)
    $("#tableBody").append(newRow)
}