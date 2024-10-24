
const billAmountInput = document.querySelector('#bill-amount')
const numberOfPeopleInput = document.querySelector('.number-of-people')
const customTipInput = document.querySelector('.custom-tip')

const generateBillBtn = document.querySelector('.generate-bill-btn')

const tipAmountOutput = document.querySelector('.tip-amount span')
const totalBillOutput  = document.querySelector('.total span')
const eachPersonBillOutput  = document.querySelector('.each-person-bill span')

const resetBtn = document.querySelector('.reset-btn')

let tipPercentage=0;     // tipPercentage variable hi sb k liye use hoga for custome tip ke liye bhi and tip box ke liye bhi
                                  // default value zero, for the case where we dont want to give any tip
generateBillBtn.addEventListener('click', ()=>{
  const billAmount = parseInt(billAmountInput.value)
  const customTip = parseInt(customTipInput.value)
  const numberOfPeople = parseInt(numberOfPeopleInput.value)

  const tipAmount = (tipPercentage/100)*billAmount;
  
  const totalBill = billAmount + tipAmount;

  const eachPersonBill = totalBill/numberOfPeople;

  tipAmountOutput.innerText= `₹${tipAmount}`
  eachPersonBillOutput.innerText= `₹${eachPersonBill}`
  totalBillOutput.innerText = `₹${totalBill}`;

  resetBtn.disabled=false
})

// It's better to add the event directly to the parent element instead of adding it separately to each 
// tip box. Then, we can check which tip box was clicked and select the tip accordingly.
// this property called event deligation
const tipsContainer = document.querySelector('.tip-container')


tipsContainer.addEventListener('click', (e)=>{

  if(tipsContainer.classList.contains('disabled')){    //means no bill amount is input thats why its disabled h
      return; 
  }

  if(e.target !== tipsContainer){  // jb e.trget is == to its parent hi h to kuch mt kro
    // to remove the previous selected tip
    console.log(tipsContainer.children);    //HTMLCollection(6) [div.tip, div.tip, div.tip, div.tip, div.tip, div.tip] 
    // for each loop nhi lga skte h collection pr , koi nhi to array m convert kr lete h
    [...tipsContainer.children].forEach((tip)=>tip.classList.remove('selected'));   // hme pta nhi h na konsa select hua tha phle islye sb pr remove lga diya
    // console.log(e.target)  
    // console.log(e.target.innerText)  
    // console.log(parseInt(e.target.innerText));
    e.target.classList.add('selected')          // jis tip pr click kr rhe h vha class add ho jaye selected vali---> jise hm border de paye ge
                                                // pr hme yh bhi insure krna h ki jb m dusre ko select kru to, phle pr selct kiya ht jaye and new pr a jaye select with newoutline
    tipPercentage = parseInt(e.target.innerText)

    customTipInput.value = ""   // 1st work:- jb hm tip box pr select kre to automatically custom khi value empty ho jani chahiye,,but why we are doing this because if custum but we then deicde no tip per box ki value hona chaiye, to custom ki value ko htane ke liye 
    }
})

// if we select any tip per box and at same time we decide to change the tip per and input the custom tip
// then we have to unselect the tip box
customTipInput.addEventListener('input',()=>{
  tipPercentage=parseInt(customTipInput.value);
  [...tipsContainer.children].forEach((tip)=>tip.classList.remove('selected'));  // 2nd work- when we try to put input even after we decide the tip box, to tip box selected unselect ho jana chahaiye 
})



resetBtn.addEventListener('click',()=>{
  numberOfPeopleInput.value = ''
  billAmountInput.value = ''
  customTipInput.value = '';                      //   <---- ; must for 157 line
  [...tipsContainer.children].forEach((tip)=>tip.classList.remove('selected'))   //selecte class bhi reove kr dena h
  tipPercentage=0;  

  tipAmountOutput.innerText= `₹${0}`
  eachPersonBillOutput.innerText= `₹${0}`
  totalBillOutput.innerText = `₹${0}`;

  resetBtn.disabled=true;
  
  tipsContainer.classList.add('disabled')
  generateBillBtn.disabled=true;
  customTipInput.disabled=true
  numberOfPeopleInput.disabled=true
})


const tipBox = document.querySelector('.tip');
billAmountInput.addEventListener('input', ()=>{
  if(billAmountInput.value){
    customTipInput.disabled=false
    numberOfPeopleInput.disabled=false
    tipsContainer.classList.remove('disabled')
  }
  else{
    customTipInput.disabled=true
    numberOfPeopleInput.disabled=true
    customTipInput.value=''
    numberOfPeopleInput.value=''
    tipsContainer.classList.add('disabled')
    generateBillBtn.disabled=true;
  }
})

numberOfPeopleInput.addEventListener('input',()=>{
  if(numberOfPeopleInput.value){
    generateBillBtn.disabled=false;
  }
  else{
    generateBillBtn.disabled=true;
  }
})