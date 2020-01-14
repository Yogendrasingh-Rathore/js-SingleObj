function logout()
{
        sessionStorage.clear();
        alert("Logout Success");
        location.replace("homepage.html");    
}