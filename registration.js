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

function validation() {
    let flag = 1;
    let password = document.getElementById("r_password").value;
    let userName = document.getElementById("r_uname").value;
    let cpassword = document.getElementById("r_cpassword").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let profile_pic = sessionStorage.ImagePath;

    let gender = document.querySelector('input[name="gender"]:checked');
    if (gender != null)
        gender = document.querySelector('input[name="gender"]:checked').value;
    else
        flag = 0;

    let patt_uname = /[a-zA-Z]/;

    if (!patt_uname.test(userName) || userName == "") {
        alert("UserName must have Alphabets!");
        flag = 0;
    }

    let patt_password = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!patt_password.test(password) || password == "") {
        alert("Invalid Password, Must have minimum length 6, 1 lowercase, 1 uppercase, 1 digit, 1 special char");
        flag = 0;
    }

    if (password != cpassword) {
        alert("Password Not Match");
        flag = 0;
    }

    let patt_email = /\w+\d*\@\w+\.\w{2,6}/;

    if (!patt_email.test(email) || email == "") {
        alert("Invalid Email id, Must be in this format abc@abc.com or abc@abc.org.in");
        flag = 0;
    }

    if (flag != 0) {
        profile_data(userName, password, email, address, profile_pic, gender);
    }
    else {
        alert("Your data is not stored until you clear all the errors!");
    }

}

function profile_image() {
    var Image = document.getElementById("profile_pic").files[0];

    var imageReader = new FileReader();
    imageReader.readAsDataURL(Image);

    imageReader.onload = function () {
        var imgdata = imageReader.result;
        sessionStorage.setItem("ImagePath", imgdata);
        document.getElementById("displayProfileImage").src = sessionStorage.ImagePath;
    };

    imageReader.onerror = function (error) { };
}

function check_ExistsUserName(userName) {
    let flag = 0;
    let users = JSON.parse(localStorage.getItem("users")) || [];

    for (i = 0; i < users.length; i++) {
        if (userName === users[i].userName) {
            alert("UserName Already Exists");
            flag = 1;
            break;
        }

    }
    return flag;
}

function check_ExistsEmail(email) {
    let flag = 0;
    let users = JSON.parse(localStorage.getItem("users")) || [];

    for (i = 0; i < users.length; i++) {
        if (email === users[i].email) {
            alert("Email Id Already Exists");
            flag = 1;
            break;
        }
    }
    return flag;
}

function profile_data(userName, password, email, address, profile_pic, gender) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let flag = check_ExistsUserName(userName);
    if(flag != 1){
        flag = check_ExistsEmail(email)
    }
    

    if (flag != 1) {
        if (userName == users[userName]) {
            alert("User Already Exists! Choose Different UserName");
        } else {
            let category = [];
            let todo = [];
            let toDoId = 0;

            let obj = {
                userName: userName,
                email: email,
                password: password,
                gender: gender,
                address: address,
                userImage: profile_pic,
                Category: category,
                todo: todo,
                toDoId: toDoId
            };

            users.push(obj);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Registration Successful..");
            login_fn();
        }
    }
}