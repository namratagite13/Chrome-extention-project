let myLead = []
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const dltBtn = document.getElementById("dlt-btn")
const saveTab = document.getElementById("save-tab")

let leadFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))
console.log(leadFromLocalStorage)



if(leadFromLocalStorage){
    myLead = leadFromLocalStorage
    render(myLead)
}

function render(myLead){
    let listItems = ""
    for (let i = 0; i < myLead.length; i++) {
        //ulEl.innerHTML += "<li>" + myLead[i] + "</li>"
        //listItems += "<li><a href= '" + myLead[i] + "'>" + myLead[i] + "</a></li>"
        listItems += `
            <li>
                <a target = '_blank' href = '${myLead[i]}' > 
                    ${myLead[i]}
                </a>
            </li> 

        `
        
    //const li = document.createElement("li")
    //li.textContent = myLead[i]
    //ulEl.append(li)
    }
    ulEl.innerHTML = listItems
}



inputBtn.addEventListener("click", function(){
    myLead.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLead", JSON.stringify(myLead))
    render(myLead)
})

saveTab.addEventListener("click", function() {
     //by adding 0 in []  we navigate to the first item of url
  //by adding .url we again left with link only without{[]} brackets
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLead.push(tabs[0].url)
        localStorage.setItem("myLead", JSON.stringify(myLead))
        render(myLead)
    

    })
    

})
dltBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLead = []
    render(myLead)
})

