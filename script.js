
let addBtn = document.querySelector('.add-btn')
let modalCont = document.querySelector('.modal-cont')
let mainCont = document.querySelector('.main-cont')
modalCont.style.display = 'none'
let taskArea = document.querySelector('.textArea-cont')
let removeBtn = document.querySelector('.remove-btn')

let colors = ['lightpink', 'lightgreen', 'lightblue', 'black']
let allPriorityColors = document.querySelectorAll('.priority-color')


let addFlag = false
let removeFlag = false
let modalPriorityColor = colors[colors.length-1]
let lockClass = "fa-lock"
let unlockClass = 'fa-lock-open'
{/* <i class="fa-solid fa-lock-open"></i> */}

addBtn.addEventListener('click', function(){
    // display the modal
    // console.log('add btn clicked')
    addFlag = !addFlag
    if(addFlag == true){
        modalCont.style.display = 'flex'
    }else{
        modalCont.style.display = 'none'
    }
})

modalCont.addEventListener('keydown', function(e){
    let key = e.key
    if(key == 'Shift'){
        createTicket(taskArea.value, modalPriorityColor)
        modalCont.style.display = 'none'
        addFlag = false
        taskArea.value = ''
    }
})

function createTicket(ticketTask, ticketColor){
    let id = shortid()                      //got from shortId CDN script link
    let ticketCont = document.createElement('div')
    ticketCont.setAttribute('class', 'ticket-cont')
    ticketCont.innerHTML = `
    <div class="ticket-color ${ticketColor}"></div>
    <div class="ticket-id">${id}</div>
    <div class="task-area">${ticketTask}</div>
    <div class="ticket-lock"><i class="fa-solid fa-lock"></i></div>
    `
    mainCont.append(ticketCont)
    handleRemoval(ticketCont)
    // On every ticket creation, event listener is added to the ticket through handle removal
    handleLock(ticketCont)
    handleColor(ticketCont)
}

removeBtn.addEventListener('click', function(){
    removeFlag = !removeFlag
    if(removeFlag == true){
        removeBtn.style.color = 'red'
    }else{
        removeBtn.style.color = 'white'
    }
})

function handleRemoval(ticket){
    ticket.addEventListener('click', function(){
        if(!removeFlag) return
        ticket.remove()             // UI removal
    })
}

allPriorityColors.forEach(function(colorEle){
    colorEle.addEventListener('click', function(e){
        allPriorityColors.forEach(function(priorityEle){
            priorityEle.classList.remove('active')
        })
        colorEle.classList.add('active')
        modalPriorityColor = colorEle.classList[0]
    })
})

function handleLock(ticket){
    let ticketLockEle = ticket.querySelector('.ticket-lock')
    let ticketLockIcon = ticketLockEle.children[0]
    let ticketTaskArea = ticket.querySelector('.task-area')
    ticketLockEle.addEventListener('click', function(ele){
        if(ticketLockIcon.classList[1] == lockClass){
            ticketLockIcon.classList.remove(lockClass)
            ticketLockIcon.classList.add(unlockClass)
            ticketTaskArea.setAttribute('contenteditable', 'true')
            // contenteditable is the feature in UI that allows us to edit any element
        }else{
            ticketLockIcon.classList.remove(unlockClass)
            ticketLockIcon.classList.add(lockClass)
            ticketTaskArea.setAttribute('contenteditable', 'false')
        }
    })

}

function handleColor(ticket){
    let ticketColorBand = ticket.querySelector('.ticket-color')
    ticketColorBand.addEventListener('click', function(e){
        let currentColor =  ticketColorBand.classList[1]
        let currentColorIdx = colors.findIndex(function(color){
            return currentColor == color
        })
        ticketColorBand.classList.remove(currentColor)
        ticketColorBand.classList.add(colors[(currentColorIdx+1)%colors.length])
    })
}