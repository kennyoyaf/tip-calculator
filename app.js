const billAmt = document.getElementById('bill')
const numberOfPeople = document.querySelector('.people')
const peopleInput = document.getElementById('people')
const tipAmount = document.getElementById('tipAmount')
const billTotal = document.getElementById('total')
const errorMsg = document.querySelector('.error-msg')
const resetBtn = document.getElementById('resetBtn')
const buttons = document.querySelectorAll('.second-tip')
const tipCustom = document.getElementById('custom')

billAmt.addEventListener('input', setBill)
buttons.forEach(button => {
    button.addEventListener('click', setButton) 
})
tipCustom.addEventListener('input', setTipCustomValue)
numberOfPeople.addEventListener('input', setPeopleValue)
resetBtn.addEventListener('click', resetEverything);

let bill = 0.0;
let tipValue = 0.15;

function validateFloat(s){
    const rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s){
    const rgx = /^[0-9]*$/;
    return s.match(rgx);
}

function setBill(){
    if(billAmt.value.includes(',')){
        billAmt.value = billAmt.value.replace(',', '.');
    }

    if(!validateFloat(billAmt.value)){
        billAmt.value = billAmt.value.substring(0, billAmt.value.length-1)
    }

    bill = parseFloat(billAmt.value)
}


function setButton(e){
    buttons.forEach(button => {
        button.classList.remove('btn-active')

        if(e.target.innerHTML == button.innerHTML){
            button.classList.add('btn-active')
            tipValue = parseFloat(button.innerHTML)/100;
        }

        let subTotal = bill / parseFloat(numberOfPeople.value)
        let tipCost = tipValue * subTotal
        let totalCost = subTotal + tipCost

        tipAmount.innerHTML = '$' + tipCost.toFixed(2);
        billTotal.innerHTML = '$' + totalCost.toFixed(2);
    })

    tipCustom.value = '';

    if(numberOfPeople.value === "") {
        peopleInput.style.border = '1px solid hsl(354, 100%, 66%)';
        errorMsg.classList.remove('hide');
        tipAmount.innerHTML = '$0.00';
        billTotal.innerHTML = '$0.00';
    }else{
        peopleInput.style.borderColor = '';
        errorMsg.classList.add('hide')
    }
}

function setTipCustomValue(){
    if(!validateInt(tipCustom.value)){
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1);
    }

    tipValue = parseFloat(tipCustom.value/100);

    buttons.forEach(button => {
        button.classList.remove('btn-active');
    })
}

function setPeopleValue(){
    if(!validateInt(numberOfPeople.value)){
        numberOfPeople.value = numberOfPeople.value.substring(0, numberOfPeople.value.length-1)
    }

    peopleCount = parseFloat(numberOfPeople.value);
}

function calculation(){
    
}

function resetEverything() {
    tipAmount.innerHTML = "$0.00";
    billTotal.innerHTML = "$0.00";
    billAmt.value = "";
    numberOfPeople.value ="";
    tipCustom.value = "";
    buttons.forEach(button => {
        button.classList.remove('btn-active');
    });
}