// style clickables
// add clickable mouse icon in options and button
// add button animation????? nahh to much, just use bootstrap next time ok
// upload to netlify and show to baby!!

const characters = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T",
    "U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n",
    "o","p","q","r","s","t","u","v","w","x","y","z"
]

const numbers = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
]

const symbols = [
    "~","`","!","@","#","$","%","^","&","*","(",")","_","-","+",
    "=","{","[","}","]",",","|",":",";","<",">",".","?","/"
]

// Checkboxes and text fields
let symbolCheckboxEl = document.getElementById("symbol-checkbox-el")
let numberCheckboxEl = document.getElementById("number-checkbox-el")
let passwordLengthEl = document.getElementById("password-length-el")

let button = document.querySelector("button")

let optionsDiv = document.querySelector("#options-div")
let OptionsDivStartingHeight = optionsDiv.getBoundingClientRect().height
optionsDiv.style.height = OptionsDivStartingHeight

let toggleHideEl = document.querySelector("#toggle-hide-el")
toggleHideEl.style.zIndex = 2
let toggleHideIcon = document.querySelector("#toggle-hide-icon")

let optionElements = document.querySelectorAll(".option-el")
let optionElTranslationDistance = [] // Will contain by how much to move each option to hide
let areOptionsHidden = false

let passwordBoxes = [
    document.getElementById("password-box-el-1"), 
    document.getElementById("password-box-el-2")
]

function isChecked() {
    return symbolCheckboxEl.checked
}

function generatePasswords() {
    let passwordLength = Number(passwordLengthEl.value)
    if (passwordLength < 1 || passwordLength > 100) {
        passwordBoxes.forEach(box => {
            box.textContent = ""
        })
        passwordBoxes[0].style.color = "red"
        passwordBoxes[0].textContent = "Please insert a value that is between 1 and 100"
        return
    }

    let selectedCharacters = [...characters];
    
    if (symbolCheckboxEl.checked) {
        selectedCharacters.push(...symbols)
    }
    if (numberCheckboxEl.checked) {
        selectedCharacters.push(...numbers)
    }
    
    passwordBoxes.forEach(box => {
        let password = ""
        for (let i = 0; i < passwordLength; i++) {
            password += selectedCharacters[generateIndex(selectedCharacters.length)]
        }
        box.style.color = "white"
        box.textContent = password
    })
}

function generateIndex(length) {
    return Math.floor(Math.random() * length)
}

function moveOptions() {
    // First time the function is executed
    if (optionElTranslationDistance.length === 0) {
        // get distance between option and toggleHide
        let toggleHideElPosition = toggleHideEl.getBoundingClientRect().y
        optionElements.forEach(op => {
            let distance = op.getBoundingClientRect().y - toggleHideElPosition
            optionElTranslationDistance.push(Math.round(distance))
            op.style.zIndex = 1
        })
    }
    
    if (!areOptionsHidden){
        for (let i = 0; i < optionElements.length; i++) {
            optionElements[i].style.transform = "translateY(-" + optionElTranslationDistance[i] + "px)"
            optionElements[i].style.opacity = "0"
        }
        areOptionsHidden = true;
        optionsDiv.style.height = optionElTranslationDistance[0]
        toggleHideIcon.style.transform = "rotate(180deg)"
    } else {
        for (let i = 0; i < optionElements.length; i++) {
            optionElements[i].style.transform = "translateY(0px)"
            optionElements[i].style.opacity = "1"
        }
        areOptionsHidden = false;
        optionsDiv.style.height = OptionsDivStartingHeight
        toggleHideIcon.style.transform = "rotate(0deg)"
    }
}