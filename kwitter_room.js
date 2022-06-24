var firebaseConfig = {
      apiKey: "AIzaSyBY5JXObA9hMEd8hiJmktqRrAnFOQEblqc",
      authDomain: "kwitter-ddb94.firebaseapp.com",
      databaseURL: "https://kwitter-ddb94-default-rtdb.firebaseio.com",
      projectId: "kwitter-ddb94",
      storageBucket: "kwitter-ddb94.appspot.com",
      messagingSenderId: "115023021700",
      appId: "1:115023021700:web:52e562f3201710984c24d1",
      measurementId: "G-PQPR7JVCZV"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    user_name = localStorage.getItem("Username");

    document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

    function Add_Room()
    {
        room_name = document.getElementById("Room_name").value;
        firebase.database().ref("/").child(room_name).update({
            purpose: "Add Room Name"
        });
        localStorage.setItem("Room_name", room_name);
        window.location = "kwitter_page.html";
    }
      

function getData() 
{
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey  = childSnapshot.key;
       Room_names = childKey;
       row = '<div class="roomname" id= '+Room_names+' onclick="redirect(this.id)"> #'+ Room_names+ '</div> <hr>';
      document.getElementById("output").innerHTML += row;

    });});}

getData();

function redirect(room)
{
    localStorage.setItem("room_name", room);
    window.location = "kwitter_page.html";
}

function Logout()
{
    localStorage.removeItem("user_name");
    localStorage.removeItem("Room_name");
    window.location = "index.html";
}