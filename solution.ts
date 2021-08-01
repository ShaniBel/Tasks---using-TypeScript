let input : HTMLInputElement = document.querySelector("#todo-item");
let addTaskBtn = document.querySelector("#todo-save");
let deleAllBtn = document.querySelector("#todo-delall");
let deleCompBtn = document.querySelector("#todo-delcom")
let divListContainer = document.querySelector("#todo-list");
let prevTasks = [];

class Task {
    taskVlaue 
    isDone
    constructor(taskVlaue : string, isDone : boolean) {
        this.taskVlaue = taskVlaue;
        this.isDone = isDone;
    }
}

// get from storage

if(localStorage.getItem(`tasks`) !== null) {
    prevTasks = [];
    prevTasks = JSON.parse(localStorage.getItem(`tasks`));
    //let jsonTasks = JSON.parse(localStorage.getItem(`tasks`)); || []
    //prevTasks = [...jsonTasks]
    

    for (let i = 0; i < prevTasks.length; i++) {
        createDOMTask(prevTasks[i]);        
    }
} 

// event listener to add task

addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let taskValue = input.value;
    let task = new Task(taskValue, false);

    let pattern = /^[\w]+/;
    if(pattern.test(taskValue)){
        prevTasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(prevTasks))
    
        createDOMTask(task);
    }
});

//creat task + add to DOM function

function createDOMTask(task : Task) : void {

    if(task["isDone"]) {        
        divListContainer.innerHTML += `<div id="todo-add" class="todo-add taskdiv">
        <p class="todo-item todo-row done">${task["taskVlaue"]}</p>
        <button class="todo-ok todo-item" id="ok">X</button>
        </div>`;
    } else {        
        divListContainer.innerHTML += `<div id="todo-add" class="todo-add taskdiv">
        <p class="todo-item todo-row">${task["taskVlaue"]}</p>
        <button class="todo-ok todo-item" id="ok">X</button>
        </div>`;
    }

    let okBtn  = document.querySelectorAll(".todo-ok");
    let p = document.querySelectorAll("p");

    for (let i = 0; i < okBtn.length; i++) {
        okBtn[i].addEventListener("click", (e) => {
            e.preventDefault();
            
            p[i].classList.add("done");
            prevTasks[i]["isDone"] = true;
            localStorage.setItem("tasks", JSON.stringify(prevTasks))
                       
        });
    }
}


// delete complited btn

deleCompBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let l = prevTasks.length;
    
    for (let j = 0; j < l; j++) {
        if(prevTasks[j]["isDone"]) {
            let p = document.querySelectorAll("p");
            let taskDivChosen = p[j].parentNode;
            divListContainer.removeChild(taskDivChosen);
            
            prevTasks.splice(j,1);
            j--;
            
            localStorage.setItem("tasks", JSON.stringify(prevTasks))
        }
    }
}); 


// delete all btn

deleAllBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let yesORNo : boolean = confirm("are you sure?");
    let taskDiv : NodeListOf<Element> = document.querySelectorAll(".todo-add");
    
    if(yesORNo) {
        for (let i : number = 0; i < taskDiv.length; i++) {
            divListContainer.removeChild(taskDiv[i]);
            // localStorage.clear();
        }
        prevTasks = [];
        localStorage.setItem("tasks", JSON.stringify(prevTasks))

    }
});

