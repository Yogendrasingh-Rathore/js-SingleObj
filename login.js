function auth()
{
    let userName = document.getElementById("l_uname").value;
    let password = document.getElementById("l_password").value;
    let users = JSON.parse(localStorage.getItem('users'));
    let flag=0;

    if(userName == "" || password == "")
    {
        alert("UserName and Password cannot be left blank!");
        location.href = 'index.html';
    }
    
    for (i = 0; i < users.length; i++) {
        if (userName === users[i].userName && password === users[i].password || 
            userName === users[i].email && password === users[i].password) {
            sessionStorage.setItem("activeUser",users[i].userName);
            sessionStorage.setItem("email",users[i].email);
            flag = 1;
            break;
        }
    }
    
    if(flag == 0)
    {
        alert("Invalid Credentials");
        // location.href = 'registration.html';
    }else{
        location.replace("to-do-mainpage.html");
    }

}
