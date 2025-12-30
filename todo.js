const tasks1 =['hola','chau'];
// console.log(tasks1);

function showTask1(){
    const toDo = document.querySelector('.input1')
    console.log(toDo.value);
    tasks1.push(toDo.value)
    document.querySelector('.print1').innerHTML=`${toDo.value}`
    // console.log(tasks1);
    toDo.value=''
}

document.querySelector('.js-add1').addEventListener('click',()=>{
    showTask1()
})

function handlekey1(event){
    if(event.key==='Enter'){
        showTask1()
    }
}


document.querySelector('.js-add2').addEventListener('click',()=>{
    addTask2()
})

let i = 0
const tasks2HTML = []
function addTask2(){
    const task = document.querySelector('.input2')
    const taskHTML = `<p>${task.value}</p>`
    tasks2HTML.push(taskHTML)
    console.log(tasks2HTML);
    for (let index = i; index < tasks2HTML.length; index++) {
        document.querySelector('.div-js').innerHTML +=`${tasks2HTML[index]}`
        i++
    }
    task.value='' 
  
}
function handlekey2(event){
    if(event.key==='Enter'){
        addTask2()
    }
}


document.querySelector('.js-add3').addEventListener('click',()=>{
    addTask3()
})

const tasks3 = []
function addTask3(){
    const inputText = document.querySelector('.input3')
    const inputDate = document.querySelector('.inputDate')
    console.log(inputText.value);
    console.log(inputDate.value);
    const task = {
        name:inputText.value,
        dueDate:inputDate.value
    }

    // console.log(pElement);
    tasks3.push(task)
    console.log(tasks3);
    
    inputText.value=''
    inputDate.value=''
    renderTasks()
}


function renderTasks(){
    const div = document.querySelector('.div3')
    div.innerHTML=''
    tasks3.forEach((task,index)=>{
            div.innerHTML +=
            // `
            //  <div>${task.name}</div> 
            //  <div>${task.dueDate}</div>  
            //  <button class="js-delete" onclick="
            //      tasks3.splice(${index},1)
            //      renderTasks()
            //  ">Delete</button>
            //  ` 
            `
              <div>${task.name}</div> 
              <div>${task.dueDate}</div>  
              <button class="js-delete">Delete</button>
            ` 

            
    })

    document.querySelectorAll('.js-delete').forEach((deleteButton,index)=>{
        deleteButton.addEventListener('click',()=>{
            tasks3.splice(index,1)
                 renderTasks()
        })
    })
    //  for (let  j= 0; j < tasks3.length; j++) {
    //     document.querySelector('.div3').innerHTML +=
    //     `
    //         <div>${tasks3[j].name}</div> 
    //         <div>${tasks3[j].dueDate}</div>  
    //         <button onclick="
    //             tasks3.splice(${j},1)
    //             renderTasks()
    //         ">Delete</button>
    //     ` 
        //this.parentElement.remove()
   
}





