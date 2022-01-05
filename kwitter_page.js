room_name=localStorage.getItem("room_name");
user_name=localStorage.getItem("user_name");

var firebaseConfig = {
    apiKey: "AIzaSyBYQECEQJdWmL-XI6P4a1i5jOJLZ3gRjww",
    authDomain: "my-kwitter-project.firebaseapp.com",
    databaseURL: "https://my-kwitter-project-default-rtdb.firebaseio.com",
    projectId: "my-kwitter-project",
    storageBucket: "my-kwitter-project.appspot.com",
    messagingSenderId: "638606439437",
    appId: "1:638606439437:web:7c27c9a5514c18f9959144"
  };

  firebase.initializeApp(firebaseConfig);
function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";
}
function send(){
    Msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:Msg,
        like:0
    })
    document.getElementById("msg").value="";
}

function getData() {firebase.database().ref("/"+room_name).on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
    firebase_message_id = childKey;
    message_data=childData;
   //Start code
   name=message_data['name'];
   message=message_data['message'];
   like=message_data['like'];
   name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
   message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
   like_button="<button class='btn btn-warning' id="+firebase_message_id+"value="+like+" onclick='updateLike(this.id)'>"
   span_with_tag="<span class='glyphicon glyphicon-thumb-up'>Like:"+like+" </span></button><hr>";

   row=name_with_tag+message_with_tag+like_button+span_with_tag;
   document.getElementById("output").innerHTML+=row;
   //End code
   });});}
getData();

function updateLike(message_id){
    console.log("Clicked on like button"+message_id);
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    updated_likes= Number(likes)+1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
        like:updated_likes
    })
}