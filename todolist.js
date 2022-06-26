console.log("Here is my todo list");
showTask();
let addTask = document.getElementById("addTask");
let inputVal = document.getElementById("inputhere");
let inputDate = document.getElementById("inputDate");
addTask.addEventListener('click' , function(){
    let all={
        inputhereVal : inputVal.value,
        inputDateVal : inputDate.value   
    }
    let webTask = localStorage.getItem("Task");
    if(webTask == null){
        taskObj = []
    }
    else{
        taskObj = JSON.parse(webTask);
    }
    let inputValue = inputVal.value;
    let DateValue = inputDate.value;
    if((inputValue.length >=1) && (DateValue.length >=1)){
        taskObj.push(all);
    }
    else{
        alert("Don't add blank character")
    }
    localStorage.setItem("Task" , JSON.stringify(taskObj));
    inputVal.value = "";
    inputDate.value = "";
    showTask();

})
function showTask(){
    let webTask = localStorage.getItem("Task");
    if(webTask == null){
        taskObj = []
    }
    else{
        taskObj = JSON.parse(webTask);
    }
    let html = "";
    let table = document.getElementById("table");
    taskObj.forEach(function(element , index){
        html += `  <tr class="noteCard">
        <td>${index+1}</td>
        <td id="td1" class="elem td2">${element.inputhereVal}</td>
        <td id="td2" class="elem td1">${element.inputDateVal}</td>
        <td><button class="edit" onclick="editTask(${index})">Edit</button></td>
        <td><button class="delete" onclick="deleteTask(${index})">Delete</button></td>
      </tr>`
    })
    if(taskObj.length >=1){
        table.innerHTML = html;
    }
    else{
        table.innerHTML = `Nothing to show here. Please add task`;
    }
}
function editTask(index){
    let webTask = localStorage.getItem("Task");
    if(webTask == null){
        taskObj = []
    }
    else{
        taskObj = JSON.parse(webTask);
    }
    inputVal.value = taskObj[index];
    inputDate.value = taskObj[index];

    let saveTask = document.getElementById("saveTask");
   let addTask = document.getElementById("addTask");
   let saveIndex = document.getElementById("saveIndex");
   addTask.style.display = 'none';
   saveTask.style.display = 'inline';

   saveIndex.value = index; 
}

let saveTask = document.getElementById("saveTask");
saveTask.addEventListener('click' ,function(){
    let webTask = localStorage.getItem("Task");
    if(webTask == null){
        taskObj = []
    }
    else{
        taskObj = JSON.parse(webTask);
    }
   let saveIndex = document.getElementById("saveIndex").value;
   taskObj[saveIndex] = inputVal.value;
   localStorage.setItem("Task" , JSON.stringify(taskObj));
   inputVal.value = "";
    showTask();
   let addTask = document.getElementById("addTask");
   let saveTask = document.getElementById("saveTask");
   addTask.style.display = 'inline';
   saveTask.style.display = 'none';
})
function deleteTask(index){
    let webTask = localStorage.getItem("Task");
    if(webTask == null){
        taskObj = []
    }
    else{
        taskObj = JSON.parse(webTask);
    }
    taskObj.splice(index , 1);
   localStorage.setItem("Task" , JSON.stringify(taskObj));
   showTask();
}

let deleteAll = document.getElementById("deleteAll");
deleteAll.addEventListener('click' , function(){
    console.log("You clicked delete")
    let webTask = localStorage.getItem("Task");
    if(webTask == null){
        taskObj = []
    }
    else{
        taskObj = JSON.parse(webTask);
    }
    if(taskObj.length!=0){
        confirm("Are you sure to delete??")
        localStorage.clear();
        showTask();
    }
    else{
        alert("No items to delete");
    }

})
let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input' , searchTask);
function searchTask(){
    let value = searchTxt.value.toLowerCase();
    console.log("Input Event Fired" , value);
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element){
      let cardTxt = element.getElementsByClassName('elem')[0].innerText.toLowerCase();
        let inputVal = cardTxt.includes(value);
        if(inputVal){
            element.style.display = 'block';
        }
        else{
            element.style.display = "none";
        }
        console.log(cardTxt);
    })
}
