function auth()
{
    var uname = document.getElementById("l_uname").value;
    var password = document.getElementById("l_password").value;
    let obj = JSON.parse(localStorage.getItem('users')) || {};
    let username = [];
    username = obj.userNames;
    let email = [];
    email = obj.emailId;
    let flag=0;

    if(uname == "" || password == "")
    {
        alert("UserName and Password cannot be left blank!");
        location.href = 'homepage.html';
    }

    for(let key in username)
    {              
            if(username[key] == uname || email[key] == uname)
            {
                let userDetails = JSON.parse(localStorage.getItem(obj.userNames[key]));

                if(userDetails){
                    if(userDetails.password == password){
                        sessionStorage.setItem('activeUser',obj.userNames[key]);
                        location.replace('to-do-mainpage.html');
                        flag=1;
                        break;
                    }else{
                        alert("Incorrect Password");
                    } 
               }
               
            }
    }


    if(flag ==0)
    {
        alert("Invalid Credentials");
        location.href = 'homepage.html';
    }

}