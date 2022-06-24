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
    room_name = localStorage.getItem("room_name");

    function Send()
    {
      msg = document.getElementById("message").value;
      console.log(msg);
      console.log(user_name);
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
      document.getElementById("message").innerHTML = "";
    }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
         name_1 = message_data['name'];
         like =message_data['like']; 
         message = message_data['message']; 
         console.log(message);
         name_tag = '<h4> '+name_1+ '<img src="tick.png" class="user_tick"> </h4>';
         message_tag = '<h4 class="message_h4">'+message+ '</h4>';
         like_tag = '<button class= "btn btn-danger" id=' +firebase_message_id+ ' value = ' +like+ ' onclick= "Update_like(this.id)">'; 
         span_tag = '<span class ="glyphicon glyphicon-thumbs-up">Like: '+like+ '</span></button><hr>';
         document.getElementById("output").innerHTML += name_tag+message_tag+like_tag+span_tag;
//End code
      } });  }); }
getData();

function Update_like(message_data)
{
      button_id = message_data;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      firebase.database().ref(room_name).child(message_data).update({
            like: updated_likes
      });
};

function Logout()
{
    localStorage.removeItem("user_name");
    localStorage.removeItem("Room_name");
    window.location = "index.html";
}