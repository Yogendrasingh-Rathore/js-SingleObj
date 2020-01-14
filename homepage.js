(function () {
    login_fn();
})();

function login_fn() {  
    document.getElementById("register").style.display = "none";     
    document.getElementById("login_btn").style.display = "none";
    document.getElementById("register_btn").style.display = "block";       
    document.getElementById("login").style.display = "block"; 
}

function register_fn() {          
    document.getElementById("login").style.display = "none"; 
    document.getElementById("login_btn").style.display = "block";
    document.getElementById("register_btn").style.display = "none";
    document.getElementById("register").style.display = "block";
}

function validation()
{
    let flag = 1;
    let password = document.getElementById("r_password").value;
    let userName = document.getElementById("r_uname").value;
    let cpassword = document.getElementById("r_cpassword").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let profile_pic = readFile();

    let gender = document.querySelector('input[name="gender"]:checked');
    if (gender != null)
        gender = document.querySelector('input[name="gender"]:checked').value;
    else
        flag = 0;

    if(userName == "" || password == "" || cpassword == "" || email == "")
    {
        alert("Fields cannot be left blank!");
        location.href = 'homepage.html';
    }

    let patt_uname = /[a-zA-Z]/;

    if(!patt_uname.test(userName))
    {
        alert("UserName must have Alphabets!");
        flag = 0;
    }

    let patt_password =/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    
    if(!patt_password.test(password))
    {
        alert("Invalid Password, Must have minimum length 6, 1 lowercase, 1 uppercase, 1 digit, 1 special char");
        flag = 0;
    }

    if(password != cpassword)
    {
        alert("Password Not Match");
        flag = 0;
    }
  
    let patt_email = /\w+\d*\@\w+\.\w{2,6}/;
    
    if(!patt_email.test(email))
    {
        alert("Invalid Email id, Must be in this format abc@abc.com or abc@abc.org.in");
        flag = 0;
    }

    if(flag != 0)
    {
        profile_data(userName,password,email,address,profile_pic,gender);
    }
    else
    {
        alert("Your data is not stored until you clear all the errors!");
    }
   
}    
  

function profile_image() {
    var Image = document.getElementById("profile_pic").files[0];

    var imageReader = new FileReader();
    imageReader.readAsDataURL(Image);

    imageReader.onload = function() {
        var imgdata = imageReader.result;
        sessionStorage.setItem("tempImageData", imgdata);
        document.getElementById("displayProfileImage").src = sessionStorage.tempImageData;
    };

    imageReader.onerror = function(error) {};
}

function profile_data(userName,password,email,address,profile_pic,gender)
{
        let category = [];
        let loadUserData = () => JSON.parse(localStorage.getItem('users'))||[];

        let obj1 = JSON.parse(localStorage.getItem('users')) || {};
        let val = [];
        val = obj1.userNames;
        let emailid = [];
        emailid = obj1.emailId;
        let flag = 1;

        for(let key in val)
        {                       
                if(val[key] == userName)
                {
                    alert(val[key] + "  UserName Already Exists!\n Account Not Created");
                    flag = 0;
                    break;                    
                }
                
                if(emailid[key] == email)
                {
                    alert(emailid[key] + "  Email Already Exists!\n Account Not Created");
                    flag = 0;
                    break;                    
                }
            
        }

        if(flag!=0)
        {

            let obj = {
                userName : userName,
                email : email,
                password : password,
                gender : gender,
                address : address,
                userImage : profile_pic,
                Category : category
                };
                
                    obj.todo = [];
                    obj.toDoId = 0;
                    let users = loadUserData();
                    let userData = {};
                    if(users == ""){
                            userData.userNames = [userName];
                            userData.emailId = [email];
                            localStorage.setItem('users', JSON.stringify(userData));
                    }else{
                        users.userNames.push(obj.userName);
                        users.emailId.push(obj.email);
                        localStorage.setItem('users', JSON.stringify(users));
                    }
                    localStorage.setItem(obj.userName, JSON.stringify(obj));
                    alert("Registration Successful..");

                    login_fn();
        }
}