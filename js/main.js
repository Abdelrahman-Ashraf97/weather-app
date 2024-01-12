
/* ========================== global variables =========================== */
let searchInput = document.getElementById("searchInput");
let findBtn = document.getElementById("findBtn");
let subscribeBtn=document.getElementById("subscribeBtn");
let subscibeInput=document.getElementById("subscibeInput");
 let jsonData={};
 const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let d = new Date();
 let subscribeList=[];
console.log();


 /* ========================== search input =========================== */
 searchInput.addEventListener("input",function () {
  if(this.value.length>=3){
    findBtn.classList.replace("bg-danger","bg-success")
     getdata(this.value)

  }
  else{
    findBtn.classList.add("bg-danger")
  }
   
    
 })

 /* ========================== get data from api =========================== */
 async function getdata(searchCity) {
    let  alldata= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2249da3dddb546879c073045240201&q=${searchCity}&days=3`);
    jsonData= await alldata.json();
    display(jsonData);
}

/* ==========================display data in html=========================== */
function display(data) {
    document.querySelector(' header .row').innerHTML=`
    <div class="col-md-4">
    <div class="head-top d-flex justify-content-between align-items-center ">
      <span class="day-name">${days[d.getDate()%days.length]}</span>
      <span class="day-date">${d.getDate()+" "+d.toLocaleString('default', { month: 'long' })}</span>
    </div>
    <div class="data ">
      <span class="city">${data.location.name}</span>
      <div class="temp">
        <span class="t-deg">${data.current.temp_c}<sup>o</sup>C</span>
      <img src='https:${data.current.condition.icon}' alt="" class="day-time">
      </div>
      <span class="custom">${data.current.condition.text}</span>
      <div class="weather-state d-flex justify-content-between align-items-center">
        <div>
          <img src="./images/icon-umberella@2x.png" alt="rain condition" >
          <span>${data.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
        </div>
        <div>
          <img src="./images/icon-wind@2x.png" alt="rain condition">
          <span>${data.current.wind_kph}km/h</span>
        </div>
        <div>
          <img src="./images/icon-compass@2x.png" alt="rain condition">
          <span>East</span>
        </div>

      </div>
      
    </div>
  </div>
  </div>
  <div class="col-md-4 ">
    <div class="head-top d-flex justify-content-center align-items-center ">
      <span>${days[((d.getDate()+1)% days.length)]}</span>
    </div>
    <div class="data text-center ">
      <img class="next-dayes-state" src="https:${data.forecast.forecastday[1].day.condition.icon}" alt="">
      <p class="max-deg-temp">${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C </p>
      <p class="min-deg-temp">${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
      <span class="custom">${data.forecast.forecastday[1].day.condition.text}</span>

    </div>
  
  </div>
  <div class="col-md-4 ">
    <div class="head-top d-flex justify-content-center align-items-center ">
      <span>${days[((d.getDate()+2 )% days.length)]}</span>
    </div>
    <div class="data text-center ">
      <img class="next-dayes-state" src="https:${data.forecast.forecastday[2].day.condition.icon}" alt="">
      <p class="max-deg-temp">${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C </p>
      <p class="min-deg-temp">${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
      <span class="custom">${data.forecast.forecastday[2].day.condition.text}</span>

    </div>
  </div>
    `
}

document.querySelector("footer form").addEventListener("submit",function(e){
e.preventDefault();
})
/* ========================== email validation for subscribe=========================== */
subscibeInput.addEventListener("input",function(e){
  emailVaLidation(this.value)
})
  
function emailVaLidation (email) {
  let emailRegex =/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if(emailRegex.test(email)){
   subscribeBtn.classList.add("bg-success")
   subscribeBtn.classList.remove("bg-danger")

  }
  else{

    subscribeBtn.classList.add("bg-danger")
    subscribeBtn.classList.remove("bg-success")
  }
  return(emailRegex.test(email))

}




  (async function(){
    await  getdata("cairo")
   
   })()


   
subscribeBtn.addEventListener("click",function() {

  if(emailVaLidation (subscibeInput.value)){
    subscribeList.push(subscibeInput.value);
    localStorage.getItem("subscibeList",JSON.stringify(subscribeList))
    subscibeInput.value="";
    document.getElementById("cong").classList.remove("d-none") 
  }})





 







