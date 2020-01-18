(function () {
    if (!sessionStorage.getItem('activeUser')) {
        location.replace("homepage.html");
    }

    let get_userData = {};
    get_userData = JSON.parse(localStorage.getItem('users'));

    let userName = document.getElementById("userName");
    let gender_male = document.getElementById("gender_male");
    let gender_female = document.getElementById("gender_female");
    let gender_other = document.getElementById("gender_other");
    let email = document.getElementById("email");
    let address = document.getElementById("address");
    let profile_pic = document.getElementById("displayProfileImage");
    let selected_gender;

    for (i = 0; i < get_userData.length; i++) {
        if (sessionStorage.getItem("activeUser") === get_userData[i].userName) {
            userName.value = get_userData[i].userName;
            selected_gender = get_userData[i].gender;
            email.value = get_userData[i].email;
            address.value = get_userData[i].address;

            let pic_address = get_userData[i].userImage;
            profile_pic.innerHTML = profile_pic.setAttribute("src", pic_address);
            break;
        }
    }



    if (selected_gender === gender_male.value) {
        gender_male.checked = true;
    }
    else if (selected_gender === gender_female.value) {
        gender_female.checked = true;
    }
    else {
        gender_other.checked = true;
    }

})();


function profile_validation() {
    let flag = 1;
    let old_password = document.getElementById("old_password").value;
    let new_password = document.getElementById("new_password").value;
    let uname = document.getElementById("userName").value;
    let confirm_password = document.getElementById("confirm_new_password").value;
    let gender_male = document.getElementById("gender_male");
    let gender_female = document.getElementById("gender_female");
    let gender_other = document.getElementById("gender_other");
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let profile_pic = document.getElementById("profile_pic").value;


    let get_userData = {};
    get_userData = JSON.parse(localStorage.getItem('users'));

    for (i = 0; i < get_userData.length; i++) {
        if (sessionStorage.getItem("activeUser") === get_userData[i].userName) {
            if (old_password != "" && old_password !== get_userData[i].password) {
                alert("Incorrect Old Password");
                flag = 0;
            }
        }
    }

    if(old_password =="" && new_password != "")
    {
        alert("To Change password, Must Enter the old Password");
        flag =0;
    }

    let patt_password = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (new_password != "" && !patt_password.test(new_password)) {
        alert("Invalid Password, Must have minimum length 6, 1 lowercase, 1 uppercase, 1 digit, 1 special char");
        flag = 0;
    }

    if (new_password !== confirm_password) {
        alert("Password Not Match");
        flag = 0;
    }

    let patt_email = /\w+\d*\@\w+\.\w{2,6}/;

    if (!patt_email.test(email)) {
        alert("Invalid Email id, Must be in this format abc@abc.com or abc@abc.org.in");
        flag = 0;
    }


    if (flag != 0) {
        profile_update();
    }
    else {
        alert("Your data is not Updated until you clear all the errors!");
    }

}


function profile_update() {
    let get_userData = {};
    get_userData = JSON.parse(localStorage.getItem('users'));
    let gender_male = document.getElementById("gender_male");
    let gender_female = document.getElementById("gender_female");
    let new_password = document.getElementById("new_password").value;

    for (i = 0; i < get_userData.length; i++) {
        if (sessionStorage.getItem("activeUser") === get_userData[i].userName) {
            
            if (new_password != "") {
                get_userData[i].password = document.getElementById("new_password").value;
            }
            else {
                get_userData[i].password = get_userData.password;
            }

            if (gender_male.checked == true) {
                get_userData[i].gender = document.getElementById("gender_male").value;
            }
            else if (gender_female.checked == true) {
                get_userData[i].gender = document.getElementById("gender_female").value;
            }
            else {
                get_userData[i].gender = document.getElementById("gender_other").value;
            }


            get_userData[i].email = document.getElementById("email").value;
            get_userData[i].address = document.getElementById("address").value;

            let profile_pic = document.getElementById("profile_pic").value;
            get_userData[i].userImage = sessionStorage.getItem("ImagePath");

            localStorage.setItem("users", JSON.stringify(get_userData));
            break;
        }
    }

    alert("Profile Updated");
}
