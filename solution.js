var input = document.querySelector("#todo-item");
var addTaskBtn = document.querySelector("#todo-save");
var deleAllBtn = document.querySelector("#todo-delall");
var deleCompBtn = document.querySelector("#todo-delcom");
var divListContainer = document.querySelector("#todo-list");
var prevTasks = [];
var Task = /** @class */ (function () {
    function Task(taskVlaue, isDone) {
        this.taskVlaue = taskVlaue;
        this.isDone = isDone;
    }
    return Task;
}());
// get from storage
if (localStorage.getItem("tasks") !== null) {
    prevTasks = [];
    prevTasks = JSON.parse(localStorage.getItem("tasks"));
    //let jsonTasks = JSON.parse(localStorage.getItem(`tasks`)); || []
    //prevTasks = [...jsonTasks]
    for (var i = 0; i < prevTasks.length; i++) {
        createDOMTask(prevTasks[i]);
    }
}
// event listener to add task
addTaskBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var taskValue = input.value;
    var task = new Task(taskValue, false);
    var pattern = /^[\w]+/;
    if (pattern.test(taskValue)) {
        prevTasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(prevTasks));
        createDOMTask(task);
    }
});
//creat task + add to DOM function
function createDOMTask(task) {
    if (task["isDone"]) {
        divListContainer.innerHTML += "<div id=\"todo-add\" class=\"todo-add taskdiv\">\n        <p class=\"todo-item todo-row done\">" + task["taskVlaue"] + "</p>\n        <button class=\"todo-ok todo-item\" id=\"ok\">X</button>\n        </div>";
    }
    else {
        divListContainer.innerHTML += "<div id=\"todo-add\" class=\"todo-add taskdiv\">\n        <p class=\"todo-item todo-row\">" + task["taskVlaue"] + "</p>\n        <button class=\"todo-ok todo-item\" id=\"ok\">X</button>\n        </div>";
    }
    var okBtn = document.querySelectorAll(".todo-ok");
    var p = document.querySelectorAll("p");
    var _loop_1 = function (i) {
        okBtn[i].addEventListener("click", function (e) {
            e.preventDefault();
            p[i].classList.add("done");
            prevTasks[i]["isDone"] = true;
            localStorage.setItem("tasks", JSON.stringify(prevTasks));
        });
    };
    for (var i = 0; i < okBtn.length; i++) {
        _loop_1(i);
    }
}
// delete complited btn
deleCompBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var l = prevTasks.length;
    for (var j = 0; j < l; j++) {
        if (prevTasks[j]["isDone"]) {
            var p = document.querySelectorAll("p");
            var taskDivChosen = p[j].parentNode;
            divListContainer.removeChild(taskDivChosen);
            prevTasks.splice(j, 1);
            j--;
            localStorage.setItem("tasks", JSON.stringify(prevTasks));
        }
    }
});
// delete all btn
deleAllBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var yesORNo = confirm("are you sure?");
    var taskDiv = document.querySelectorAll(".todo-add");
    if (yesORNo) {
        for (var i = 0; i < taskDiv.length; i++) {
            divListContainer.removeChild(taskDiv[i]);
            // localStorage.clear();
        }
        prevTasks = [];
        localStorage.setItem("tasks", JSON.stringify(prevTasks));
    }
});
