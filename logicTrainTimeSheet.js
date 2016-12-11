/* global $,firebase,moment */

// Steps to complete:

// 1. Initialize Firebase

// ** Initialize Firebase: Replace with your database
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCZKoam2Qs2VvPyAfYZDlqL8sw-NgA_OQo",
    authDomain: "trainschedule-6facd.firebaseapp.com",
    databaseURL: "https://trainschedule-6facd.firebaseio.com",
    storageBucket: "trainschedule-6facd.appspot.com",
    messagingSenderId: "550501005767"
  };

  firebase.initializeApp(config);

var database = firebase.database();

// 2. Create button for adding new train - then update the html + update the database

// Capture Button Click
$("#add-train-btn").on("click", function() {

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.


    nameTrain = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#firstTrain-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    // 1. Get input from the form

    // 2. Push the data to the database

    database.ref().push({
        nameTrain: nameTrain,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    });

    // Don't refresh the page!
    return false;
});

// 3. Create a way to retrieve employees from the employee database.

// ** Create Firebase event for adding employee to the database and a row in the html when a user adds an entry


// ** Log the snapshot value
database.ref().on("child_added",function(snatshot){


    // ** Store everything into a variable.

    result = snatshot.val();

      // frequency of the train 
      var tFrequency = result.frequency;

      // first time of the train
      var firstTrain = result.firstTrain;
      console.log(firstTrain);

      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
      console.log(firstTimeConverted);

      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
      console.log("ARRIVAL TIME: " + nextTrain);


    // Add each train's data into the table

    $("#train-table").prepend('<tr><td>' + result.nameTrain + '</td>'  
      + '<td>' + result.destination + '</td>' + ' <td>' + result.frequency 
      + '</td>' + '<td>' + nextTrain + '</td>' + '<td>' + tMinutesTillTrain + '</td></tr>');





});