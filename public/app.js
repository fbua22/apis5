var select = document.querySelectorAll('.currency'),
input_currency = document.getElementById('input_currency'),
output_currency = document.getElementById('output_currency');

const host = "/getCurrencies";
fetch(host)
  .then((data) => data.json())
  .then((data) => {
    const entries = Object.entries(data);
   // console.log(entries)
   
   for(i =0; i < entries.length; i++){
    select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`
    select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`
   }
  }); 

  function converter(){
    var input_currency_val = input_currency.value;
    if(select[0].value != select[1].value){
    
      //  alert("Bien")
      let host = '/converter/'+input_currency_val+'/'+select[0].value+'/'+select[1].value;
      fetch(host)
        .then((val) => val.json())
        .then((val) => {
          output_currency.value= Object.values(val.rates)[0]
        //  alert(`10 GBP = ${data.rates.USD} USD`)

      });

host = "/save";
const body = {
    value: input_currency.value,
    currency1: select[0].value,
    currency2: select[1].value,
};

const fetchOptions = {
    method: 'POST', 
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
};
  
fetch(host, fetchOptions) 
.then();
    }else{
      alert('Por favor elegí dos monedas distintas')
    }
      } 

