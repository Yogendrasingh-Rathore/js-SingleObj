(function () {
    display_todolist();
})();

function get_todolist(get_userData) {
    let to_do_list = [];
    for (i = 0; i < get_userData.length; i++) {
        if (sessionStorage.getItem("activeUser") === get_userData[i].userName) {
            to_do_list = get_userData[i].todo;
            return to_do_list;
            break;
        }
    }
}

function display_todolist() {
    let get_userData = [];
    get_userData = JSON.parse(localStorage.getItem('users'));
    let to_do_list = [];
    to_do_list = get_todolist(get_userData);

    let todoid;

    for (key in to_do_list) {
        let data = [];
        data = Object.values(to_do_list[key]);
        let tr = document.createElement("TR");
        document.getElementById("todolist").appendChild(tr);


        for (let key2 in data) {
            todoid = data[8];
            if (key2 > 7) {
                createButton(todoid, "todolist");
                break;
            } else {
                let td = document.createElement("TD");
                let td_data = document.createTextNode(data[key2]);
                td.appendChild(td_data);
                document.getElementById("todolist").appendChild(td);
            }
        }

        let d = new Date();
        if (data[5] == "Yes" && new Date(data[6]).getDate() == d.getDate() && new Date(data[6]).getMonth() == d.getMonth() && new Date(data[6]).getFullYear() == d.getFullYear()) {
            alert("Reminder for Task : " + data[1] + ' Start Date: ' + data[2] + ' End Date: ' + data[3] + ' Status: ' + data[4]);
        }
    }
}

function to_do() {
    let flag = reminder_validation();

    let e = document.getElementById("category").value;
    if (e == "") {
        flag = 1;
        alert("To Do not added, Must select the category");
    }

    if (flag == 0) {
        let userData = JSON.parse(localStorage.getItem('users'));

        let category = get_todo_category();
        let start_date = get_todo_startDate();
        let end_date = get_todo_endDate();
        let task = get_todo_task();
        let isReminder = get_todo_isReminder();
        let isReminder_date = get_todo_isReminderDate();
        let isPublic = get_todo_isPublic();

        obj = {
            category: category,
            task: task,
            start_date: start_date,
            end_date: end_date,
            status: "To-Do",
            isReminder: isReminder,
            isReminder_date: isReminder_date,
            isPublic: isPublic
        };


        for (i = 0; i < userData.length; i++) {
            if (sessionStorage.activeUser === userData[i].userName) {
                userData[i].toDoId++;
                obj.id = userData[i].toDoId;
                userData[i].todo.push(obj);
                localStorage.setItem("users", JSON.stringify(userData));
                break;
            }
        }

        cleanup();
        location.reload();
    }

}


function createButton(checkbox_id, flag) {
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "checkbox";
    checkbox.id = checkbox_id;

    let td = document.createElement("TD");
    td.appendChild(checkbox);

    if (flag == "todolist") {
        document.getElementById("todolist").appendChild(td);
    }
    else {
        document.getElementById("table_data").appendChild(td);
    }
}

function todo_EditMode() {
    let checkbox_id = checkbox_selection("EditMode");

    if (checkbox_id !== "false") {
        document.getElementById("status_columnName").style.display = "block";
        document.getElementById("status_columnData").style.display = "block";
        document.getElementById("Add_Task").style.display = "none";
        document.getElementById("Update_btn").style.display = "block";

        let isReminder_yes = document.getElementById("isReminder_yes");
        let isReminder_no = document.getElementById("isReminder_no");
        let isPublic_yes = document.getElementById("isPublic_yes");
        let isPublic_no = document.getElementById("isPublic_no");
        let isReminder, isPublic;

        let get_userData = JSON.parse(localStorage.getItem("users"));

        var to_do_list = [];
        to_do_list = get_todolist(get_userData);

        for (key in to_do_list) {
            let data = [];
            data = Object.values(to_do_list[key]);

            for (let key2 in data) {

                if (data[8] == checkbox_id) {
                    // alert(data[8]);
                    let category = document.getElementById("category");
                    category.value = data[0];
                    let task = document.getElementById("task");
                    task.value = data[1];
                    let start_date = document.getElementById("start_date");
                    start_date.value = data[2];
                    let end_date = document.getElementById("end_date");
                    end_date.value = data[3];
                    let status = document.getElementById("status");
                    status.value = data[4];
                    isReminder = data[5];

                    if (isReminder == "Yes")
                        isReminder_yes.checked = true;
                    else
                        isReminder_no.checked = true;

                    let isReminder_date = document.getElementById("isReminder_date");
                    isReminder_date.value = data[6];

                    isPublic = data[7];
                    if (isPublic == "Yes")
                        isPublic_yes.checked = true;
                    else
                        isPublic_no.checked = true;

                    alert("Selected Record is Displayed on the 'Add Task' tab!");
                    break;
                }
            }
        }
    }
}

function todo_Delete() {
    checkbox_selection("Delete");
    let checkboxes = document.getElementsByName("checkbox");

    let get_userData = JSON.parse(localStorage.getItem("users"));
    let to_do_list = [];
    to_do_list = get_todolist(get_userData);

    for (let i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            let confirm_delete = confirm("Are you sure you want to delete the record with record id : " + checkboxes[i].id + " ?");
            if (confirm_delete == true) {
                to_do_list.splice(i, 1);
            }
        }
    }

    for (i = 0; i < get_userData.length; i++) {
        if (sessionStorage.activeUser === get_userData[i].userName) {
            get_userData[i].todo = to_do_list;
            localStorage.setItem("users", JSON.stringify(get_userData));
            break;
        }
    }
    location.reload();
}

function checkbox_selection(flag) {
    let checkboxes = document.getElementsByName("checkbox");
    let counter = 0;

    for (let i = 0; i < checkboxes.length; i++) {

        if (checkboxes[i].checked) {
            counter++;
            if (flag != "Delete") {
                if (counter > 1) {
                    alert("Multiple Selection is Not Allowed");
                    break;
                }
                checkbox_id = checkboxes[i].id;
            }
        }
    }
    if (counter < 1) {
        alert("No record selected, Must select a record!");
    }
    if (flag != "Delete") {
        if (counter == 1)
            return checkbox_id;
        else
            return "false";
    }
}

function get_todo_category() {
    let e = document.getElementById("category");
    let category = e.options[e.selectedIndex].value;
    return category;
}

function get_todo_status() {
    let s = document.getElementById("status");
    let status = s.options[s.selectedIndex].value;
    return status;
}

function get_todo_startDate() {
    let start_date = document.getElementById("start_date").value;
    return start_date;
}

function get_todo_endDate() {
    let end_date = document.getElementById("end_date").value;
    return end_date;
}

function get_todo_task() {
    let task = document.getElementById("task").value;
    return task;
}

function get_todo_isReminder() {
    let isReminder = "No";
    if (document.querySelector('input[name="isReminder"]:checked') != null) {
        isReminder = document.querySelector('input[name="isReminder"]:checked').value;
        // if (isReminder == "Yes")
        //     isReminder = "Yes";
        // else
        //     isReminder = "No";
    }
    return isReminder;
}

function get_todo_isReminderDate() {
    let isReminder_date = document.getElementById("isReminder_date").value;
    return isReminder_date;
}

function get_todo_isPublic() {
    if (document.querySelector('input[name="isPublic"]:checked') == "null") {
        let isPublic = document.querySelector('input[name="isPublic"]:checked').value;
        if (isPublic == true)
            isPublic = "Yes";
        else
            isPublic = "No";
    } else {
        isPublic = "No";
    }

    return isPublic;
}

function todo_Update() {
    let checkbox_id = checkbox_selection("Update");

    if (checkbox_id !== "false") {
        let category = get_todo_category();
        let status = get_todo_status();
        let start_date = get_todo_startDate();
        let end_date = get_todo_endDate();
        let task = get_todo_task();
        let isReminder = get_todo_isReminder();
        let isReminder_date = get_todo_isReminderDate();
        let isPublic = get_todo_isPublic();

        let flag = reminder_validation();

        if (flag == 0) {
            let get_userData = JSON.parse(localStorage.getItem("users"));

            let to_do_list = [];
            to_do_list = get_todolist(get_userData);


            for (key in to_do_list) {
                let data = [];
                data = Object.values(to_do_list[key]);

                if (data[8] == checkbox_id) {
                    let confirm_update = confirm("Old Record : " +
                        data[0] + " " + data[1] + " " + data[2] + " " + data[3] + " " + data[4]
                        + "\nUpdated Record :  " + category + " " + task + " " + start_date + " " + end_date + " " + status
                        + "\nDo you want to Update");
                    if (confirm_update == true) {
                        data[0] = category;
                        data[1] = task;
                        data[2] = start_date;
                        data[3] = end_date;
                        data[4] = status;
                        data[5] = isReminder;
                        data[6] = isReminder_date;
                        data[7] = isPublic;
                        to_do_list[key] = data;
                        alert('Data Updated');
                    }
                    break;
                }


            }

            for (i = 0; i < get_userData.length; i++) {
                if (sessionStorage.activeUser === get_userData[i].userName) {
                    get_userData.todo = to_do_list;
                    localStorage.setItem("users", JSON.stringify(get_userData));
                    break;
                }
            }

            cleanup();
            location.reload();
        }
    }
}

function table_data_appendChild(data) {
    let table = document.getElementById("table_data");
    let row = table.insertRow(0);

    for (let key in data) {
        if (key > 7) {
            let cell = row.insertCell(key);
            cell.innerHTML = ('<input type="checkbox" name = "checkbox" id = " ' + data[8] + '">');
            break;
        } else {
            let cell = row.insertCell(key);
            cell.innerHTML = data[key];
        }
    }
}

function searchby_category(to_do_list, selected_data) {
    let found = "false";
    for (key in to_do_list) {
        let data = [];
        data = Object.values(to_do_list[key]);

        todoid = data[8];

        if (data[0] === selected_data) {
            found = "true";
            table_data_appendChild(data);
        }
    }

    NoRecordFound(found);
}

function searchby_startDate(to_do_list, selected_data) {
    let found = "false";
    for (key in to_do_list) {
        let data = [];
        data = Object.values(to_do_list[key]);

        todoid = data[8];

        if (data[2] === selected_data) {
            found = "true";
            table_data_appendChild(data);
        }
    }
    NoRecordFound(found);
}

function searchby_endDate(to_do_list, selected_data) {
    let found = "false";
    for (key in to_do_list) {
        let data = [];
        data = Object.values(to_do_list[key]);

        todoid = data[8];
        if (data[3] === selected_data) {
            found = "true";
            table_data_appendChild(data);
        }
    }
    NoRecordFound(found);
}

function searchby_DateRange(to_do_list, start_date, end_date) {
    let endDateValidation = endDate_validation(start_date, end_date);
    let emptyDateValidation = emptyDate_validation(start_date, end_date);
    let startEndDateValidation = startEndDate_validation(start_date, end_date);
    let found = "false";

    if (endDateValidation != "false" && emptyDateValidation != "false" && startEndDateValidation != "false") {
        for (key in to_do_list) {
            let data = [];
            data = Object.values(to_do_list[key]);

            todoid = data[8];
            let v = new Date(data[2]);
            let w = new Date(data[3]);
            let selected_startDate = new Date(start_date);
            let selected_endDate = new Date(end_date);
            if (v.getTime() >= selected_startDate.getTime() && w.getTime() <= selected_endDate.getTime()) {
                found = "true";
                table_data_appendChild(data);
            }
        }
        NoRecordFound(found);
    }
}



function searchby_status(to_do_list, selected_data) {
    let found = "false";
    for (key in to_do_list) {
        let data = [];
        data = Object.values(to_do_list[key]);

        todoid = data[8];
        if (data[4] === selected_data) {
            found = "true";
            table_data_appendChild(data);
        }
    }
    NoRecordFound(found);
}


function searchby_taskDetails(to_do_list, selected_data) {
    let found = "false";
    for (key in to_do_list) {
        let data = [];
        data = Object.values(to_do_list[key]);
        todoid = data[8];

        if (data[1] === selected_data) {
            found = "true";
            table_data_appendChild(data);
        }
    }
    NoRecordFound(found);
}

function NoRecordFound(found) {
    if (found == "false") {
        let td = document.createElement("TR");
        let td_data = document.createTextNode("No Record Found");
        td.appendChild(td_data);
        document.getElementById("table_data").appendChild(td);
    }
}

function to_do_search() {
    document.getElementById("todolist").style.display = "none";
    document.getElementById("search_list").style.display = "block";

    empty_table();

    let get_userData = JSON.parse(localStorage.getItem('users'));
    let to_do_list = [];
    to_do_list = get_todolist(get_userData);

    let searchby = document.getElementById("search_by").value;
    let selected_data;

    if (searchby === "Category") {
        selected_data = document.getElementById("category_search").value;
        searchby_category(to_do_list, selected_data);
    }
    if (searchby === "Start_date") {
        selected_data = document.getElementById("startdate_search").value;
        searchby_startDate(to_do_list, selected_data);
    }
    if (searchby === "End_date") {
        selected_data = document.getElementById("enddate_search").value;
        searchby_endDate(to_do_list, selected_data);
    }
    if (searchby === "DateRange") {
        start_date = document.getElementById("DateRange_startdate").value;
        end_date = document.getElementById("DateRange_enddate").value;
        searchby_DateRange(to_do_list, start_date, end_date);
    }
    if (searchby === "Status") {
        selected_data = document.getElementById("status_search").value;
        searchby_status(to_do_list, selected_data);
    }
    if (searchby === "Task Details") {
        selected_data = document.getElementById("task_details").value;
        searchby_taskDetails(to_do_list, selected_data);
    }

    cleanup();
}


function empty_table() {
    let Parent = document.getElementById("table_data");
    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    }
}

function cleanup() {
    document.getElementById("category_name").value = "";
    document.getElementById("end_date").value = "";
    document.getElementById("start_date").value = "";
    document.getElementById("isReminder_date").value = "";
    document.getElementById("task").value = "";
}

function date_validation() {
    let startDate = get_todo_startDate();
    let endDate = get_todo_endDate();

    var today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

    emptyDate_validation(startDate, endDate);

    if (startDate < today) {
        alert("Selected Date must be greater than or equal to today");
        clear();
    } 

    if (startDate == "" && endDate != "" ){
        alert("Must select Start Date before selecting End Date");
        clear();
    }

    if (Date.parse(startDate) > Date.parse(endDate)) {
        alert("End date should be greater than Start date");
        document.getElementById("end_date").value = "";
    }
    
}

function clear() {
    document.getElementById("end_date").value = "";
    document.getElementById("start_date").value = "";
}

function startEndDate_validation(startDate, endDate) {
    if (startDate == "" && endDate != "") {
        alert("Must select Start Date before selecting End Date");
        clear();
        return "false";
    } else if(startDate != "" && endDate == "") {
        alert("Must select the end date");
        return "false";
    } else {
        return "true";
    }
}

function emptyDate_validation(startDate, endDate) {
    if (startDate == "" && endDate == "") {
        alert("Must select Start & End Date");
        clear();
        return "false";
    } else {
        return "true";
    }
}

function endDate_validation(startDate, endDate) {
    if (Date.parse(startDate) >= Date.parse(endDate)) {
        alert("End date should be greater than Start date");
        document.getElementById("end_date").value = "";
        return "false";
    } else {
        return "true";
    }
}

function reminder_validation() {
    let start_date = get_todo_startDate();
    let end_date = get_todo_endDate();
    let isReminder = get_todo_isReminder();
    let isReminder_date = get_todo_isReminderDate();
    let flag = 0;

    if (start_date == "" || end_date == "") {
        alert("Cannot Add To-Do, Must have Start and End Date");
        flag = 1;
    } else if (isReminder_date < start_date && isReminder == "Yes" || isReminder_date > end_date && isReminder == "Yes") {
        alert("The Reminder Date must be between " + start_date + " and " + end_date);
        document.getElementById("isReminder_date").value = "";
        flag = 2;
    } else if (isReminder == "Yes" && isReminder_date == "") {
        alert("Cannot Add To-Do, Must Set the Reminder Date!");
        flag = 3;
    } else if (isReminder == "No" && isReminder_date != "") {
        alert("Cannot Set Reminder Date, isReminder is Not Selected");
        document.getElementById("isReminder_date").value = "";
        flag = 4;
    }




    return flag;
}