const BASE_URL = "http://api.exchangeratesapi.io/v1/latest?access_key=7f484bbef0b19735ed98c0b31dc7ac2e&format=1";

const droupdowns = document.querySelectorAll("select");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const btn = document.querySelector("button");

for( let select of droupdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value= currCode;

        if(select.name === "From" && currCode === "USD"){
            newOption.selected = true;
        }
        else if(select.name === "To" && currCode === "INR"){
            newOption.selected = true;
        }
        select.append(newOption);  
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const upDateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;

    if(amtValue ==="" || amtValue < 1){
        amtValue =1;
    }

    const URL = `${BASE_URL}&symbols=${fromcurr.value},${tocurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[tocurr.value];

    let finalamount = amtValue * rate;

    console.log(finalamount);

    msg.innerText = `${amtValue} ${fromcurr.value}   =   ${finalamount} ${tocurr.value}`;

}

const updateFlag =(element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    upDateExchangeRate();
  });

  window.addEventListener("load",()=>{
    upDateExchangeRate();
  });
