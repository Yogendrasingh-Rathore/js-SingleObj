(function () {

    if(!sessionStorage.getItem('activeUser'))
    {
        location.replace("registration.html");
    }
    
    let d = new Date();
    let display_date = ''+ d.getDate() +'/'+ (d.getMonth()+1) + '/'+d.getFullYear();
    document.getElementById("time_date").innerHTML = display_date;    

    selected_searchItem();
    document.getElementById("status_columnName").style.display = "none";
    document.getElementById("status_columnData").style.display = "none";
    document.getElementById("search_list").style.display = "none";
    document.getElementById("Update_btn").style.display = "none";
    
    category_onload('category');
    category_onload('category_search');

})();

function category_onload(category_elementId)
{
    let get_userData = JSON.parse(localStorage.getItem('users'));
    for (i = 0; i < get_userData.length; i++) {
        if(get_userData[i].userName === sessionStorage.activeUser)
        {
            for(key in get_userData[i].Category)
            {        
                let sel = document.getElementById(category_elementId);
                let opt = document.createElement('option');            
                
                opt.text = opt.value = get_userData[i].Category[key]; 
                sel.add(opt, key); 
            }
        }
    }
}


function selected_searchItem()
{
    let selected_item = document.getElementById("search_by").value;

    if(selected_item === "Category")
    {
        document.getElementById("searchby_StartDate").style.display = "none";
        document.getElementById("searchby_EndDate").style.display = "none";
        document.getElementById("searchby_status").style.display = "none";
        document.getElementById("task_details").style.display = "none";
        document.getElementById("searchby_DateRange").style.display = "none";
        document.getElementById("searchby_category").style.display = "block";        
    }
    else if(selected_item === "Start_date")
    {
    document.getElementById("searchby_category").style.display = "none";
    document.getElementById("searchby_EndDate").style.display = "none";
    document.getElementById("searchby_status").style.display = "none"; 
    document.getElementById("task_details").style.display = "none";
    document.getElementById("searchby_DateRange").style.display = "none";
    document.getElementById("searchby_StartDate").style.display = "block";
    }
    else if(selected_item === "End_date")
    {
        document.getElementById("searchby_category").style.display = "none";
        document.getElementById("searchby_StartDate").style.display = "none";
        document.getElementById("searchby_status").style.display = "none"; 
        document.getElementById("task_details").style.display = "none";
        document.getElementById("searchby_DateRange").style.display = "none";
        document.getElementById("searchby_EndDate").style.display = "block";
    }
    else if(selected_item === "Status")
    {
        document.getElementById("searchby_category").style.display = "none";
        document.getElementById("searchby_EndDate").style.display = "none";
        document.getElementById("searchby_StartDate").style.display = "none";
        document.getElementById("task_details").style.display = "none";
        document.getElementById("searchby_DateRange").style.display = "none";
        document.getElementById("searchby_status").style.display = "block"; 
    }
    else if(selected_item === "Task Details")
    {
        document.getElementById("searchby_category").style.display = "none";
        document.getElementById("searchby_EndDate").style.display = "none";
        document.getElementById("searchby_StartDate").style.display = "none";
        document.getElementById("searchby_status").style.display = "none"; 
        document.getElementById("searchby_DateRange").style.display = "none";
        document.getElementById("task_details").style.display = "block";
    }
    else{
        document.getElementById("searchby_category").style.display = "none";
        document.getElementById("searchby_EndDate").style.display = "none";
        document.getElementById("searchby_StartDate").style.display = "none";
        document.getElementById("searchby_status").style.display = "none"; 
        document.getElementById("task_details").style.display = "none";
        document.getElementById("searchby_DateRange").style.display = "block";

    }
}


let d = new Date();
let display_date = ''+ d.getDate() +'/'+ (d.getMonth()+1) + '/'+d.getFullYear();
document.getElementById("time_date").innerHTML = display_date;    

function add_category()
{
    let category_name = document.getElementById('category_name').value;
    let get_userData = JSON.parse(localStorage.getItem('users'));
    let flag = 0;

    for (i = 0; i < get_userData.length; i++) {
        if(get_userData[i].userName === sessionStorage.activeUser)
        {
            for(key in get_userData[i].Category)
            {        
                if(get_userData[i].Category[key] === category_name)
                {
                    alert("Category Already Exists!");
                    flag = 1;
                    break;
                }            
                let sel = document.getElementById('category');
                let opt = document.createElement('option');            
                
                opt.text = opt.value = get_userData[i].Category[key]; 
                sel.add(opt, key); 
                
            }
            if(flag!=1){
                get_userData[i].Category.push(category_name);  
                localStorage.setItem("users",JSON.stringify(get_userData));
                alert(category_name + "  Added");
            }
        }
    }
    
    cleanup();
    location.reload();
}
