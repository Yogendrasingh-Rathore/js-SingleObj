(function () {

    if(!sessionStorage.getItem('activeUser'))
    {
        location.replace("homepage.html");
    }
    
    let d = new Date();
    let display_date = ''+ d.getDate() +'/'+ (d.getMonth()+1) + '/'+d.getFullYear();
    document.getElementById("time_date").innerHTML = display_date;    

    selected_searchItem();
    document.getElementById("status_columnName").style.display = "none";
    document.getElementById("status_columnData").style.display = "none";
    document.getElementById("search_list").style.display = "none";
    document.getElementById("Update_btn").style.display = "none";
    let get_userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    
    for(key in get_userData.Category)
    {        
            let sel = document.getElementById('category');
            let opt = document.createElement('option');
            
            opt.text = opt.value = get_userData.Category[key]; 
            sel.add(opt, key); 
 
    }

    for(key in get_userData.Category)
    {        
            let sel = document.getElementById('category_search');
            let opt = document.createElement('option');
            
            opt.text = opt.value = get_userData.Category[key]; 
            sel.add(opt, key); 
 
    }
    
})();



function selected_searchItem()
{
    let selected_item = document.getElementById("search_by").value;

    if(selected_item === "Category")
    {
        document.getElementById("searchby_StartDate").style.display = "none";
        document.getElementById("searchby_EndDate").style.display = "none";
        document.getElementById("searchby_status").style.display = "none";
        document.getElementById("task_details").style.display = "none";
        document.getElementById("searchby_category").style.display = "block";        
    }
    else if(selected_item === "Start_date")
    {
    document.getElementById("searchby_category").style.display = "none";
    document.getElementById("searchby_EndDate").style.display = "none";
    document.getElementById("searchby_status").style.display = "none"; 
    document.getElementById("task_details").style.display = "none";
    document.getElementById("searchby_StartDate").style.display = "block";
    }
    else if(selected_item === "End_date")
    {
        document.getElementById("searchby_category").style.display = "none";
        document.getElementById("searchby_StartDate").style.display = "none";
        document.getElementById("searchby_status").style.display = "none"; 
        document.getElementById("task_details").style.display = "none";
        document.getElementById("searchby_EndDate").style.display = "block";
    }
    else if(selected_item === "Status")
    {
        document.getElementById("searchby_category").style.display = "none";
        document.getElementById("searchby_EndDate").style.display = "none";
        document.getElementById("searchby_StartDate").style.display = "none";
        document.getElementById("task_details").style.display = "none";
        document.getElementById("searchby_status").style.display = "block"; 
    }
    else if(selected_item === "Task Details")
    {
        document.getElementById("searchby_category").style.display = "none";
        document.getElementById("searchby_EndDate").style.display = "none";
        document.getElementById("searchby_StartDate").style.display = "none";
        document.getElementById("searchby_status").style.display = "none"; 
        document.getElementById("task_details").style.display = "block";
    }
}


let d = new Date();
let display_date = ''+ d.getDate() +'/'+ (d.getMonth()+1) + '/'+d.getFullYear();
document.getElementById("time_date").innerHTML = display_date;    

function add_category()
{
    let category_name = document.getElementById('category_name').value;

    let get_userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    get_userData.Category.push(category_name);  

    localStorage.setItem(sessionStorage.getItem('activeUser'),JSON.stringify(get_userData));     

    let get_userData2 = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    
    for(key in get_userData2.Category)
    {        
            let sel = document.getElementById('category');
            let opt = document.createElement('option');            
            
            opt.text = opt.value = get_userData2.Category[key]; 
            sel.add(opt, key); 
    }

    alert(category_name + "  Added");
    
    cleanup();
    location.reload();

}
