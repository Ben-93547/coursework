"use strict";
function getUsersList() {
    debugger;
    console.log("Invoked getUsersList()");     //console.log your BFF for debugging client side - also use debugger statement
    const url = "/users/list/";           // API method on web server will be in Users class, method list
    fetch(url, {
        method: "GET",          //Get method
    }).then(response => {
        return response.json();                 //return response as JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) { //checks if response from the web server has an "Error"
            alert(JSON.stringify(response));    // if it does, convert JSON object to string and alert (pop up window)
        } else {
            formatUsersList(response);          //this function will create an HTML table of the data (as per previous lesson)
        }
    });
}

function formatUsersList(myJSONArray){
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.UserID + "<td><td>" + item.Username + "<tr><td>" + item.Password + "<tr><td>" + item.Email + "<tr><td>";
    }
    document.getElementById("UsersTable").innerHTML = dataHTML;
}
//getUser() returns one row of data from the database using a GET and path parameter

function getUser() {
    debugger;
    console.log("Invoked getUser()");     //console.log your BFF for debugging client side
    const UserID = document.getElementById("UserID").value;  //get the UserId from the HTML element with id=UserID
    const url = "/users/getUser/";
    console.log(UserID);
    // API method on webserver
    fetch(url + UserID, {                // UserID as a path parameter
        method: "GET",
    }).then(response => {
        return response.json();                         //return response to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {         //checks if response from server has an "Error"
            alert(JSON.stringify(response));            // if it does, convert JSON object to string and alert
        } else {
            document.getElementById("DisplayOneUser").innerHTML = response.UserID + " " + response.Username + " " + response.Password + " " + response.Email + " ";  //output data
        }
    });
}

//addUser function to add a user to the database
function addUser() {
    console.log("Invoked AddUser()");
    const formData = new FormData(document.getElementById('InputUserDetails'));
    let url = "/users/add";
    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json()
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            window.location.reload();   //URL replaces the current page.  Create a new html file
        }                                                  //in the client folder called welcome.html
    });

}
function UsersLogin() {
    //debugger;
    console.log("Invoked UsersLogin() ");
    let url = "/users/login";
    let formData = new FormData(document.getElementById('LoginForm'));

    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            Cookies.set("Token", response.Token);
            Cookies.set("Username", response.Username);
            window.open("index.html", "_self");       //open index.html in same tab
        }
    });
}

function logout() {
    //debugger
    console.log("Invoked logout");
    let url = "/users/logout";
    fetch(url, {method: "POST"
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            Cookies.remove("Token", response.Token);    //UserName and Token are removed
            Cookies.remove("Username", response.Username);
            window.open("login.html", "_self");       //open index.html in same tab
        }
    });
}

function ResetPassword() {

}

function uploadImage() {
    debugger;
    console.log("invoked uploadImage()");
    //var fileInput = document.getElementById('the-file');
    //let PhotoID = document.getElementById('PhotoID');
    //var file = fileInput.files[0];
    //Removed the above so that the form id is used (the form has all the data needed)
    let formData = new FormData(document.getElementById('uploadForm'));  //Used the form element id to get all the data in one go
    const url = "/users/image";

    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.text()          //method returns a promise, have to return from here to get text
    }).then(response => {
        if (response.startsWith('Error')) {
            alert(response);
        } else {
            window.open("Admin.html", "_self");
        }
    });

}




