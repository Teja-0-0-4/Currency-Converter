const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-09-01/v1/currencies/";
const dropdowns = document.querySelectorAll(".dropdown Select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode ==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption)
     }
     select.addEventListener("change",(evt)=>{
       updateFlag(evt.target);
     });
}

const updateFlag =(element)=>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src= newSrc;
};


const updateExchangeRate=async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ==="" || amtVal <1){
        amtVal = 1;
        amount.value="1";
    }
    const fromCurrency = fromCurr.value.toLowerCase();
    const toCurrency = toCurr.value.toLowerCase();

   
    const url = `${base_url}${fromCurrency}.json`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        
        let rate = data[fromCurrency][toCurrency];
        let finalAmount = amtVal * rate;
         msg.innerText = `${amtVal} ${fromCurr.value.toUpperCase()} = ${finalAmount} ${toCurr.value.toUpperCase()}`

        console.log("Exchange rate:", rate);
        console.log("Converted amount:", finalAmount);
        console.log("Response data:", data);
    } catch (error) {
        console.error("Error fetching the exchange rate:", error);
    }
}

document.addEventListener("load",()=>{
    updateExchangeRate();
});

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});
