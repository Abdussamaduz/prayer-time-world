let davlatSelectElement = document.querySelector(".davlatlar")
let bomdodTimeElement = document.querySelector(".bomdod-time")
let peshinTimeElement = document.querySelector(".peshin-time")
let asrTimeElement = document.querySelector(".asr-time")
let shomTimeElement = document.querySelector(".maghrib-time")
let xuftonTimeElement = document.querySelector(".isha-time")


async function getDavlatlar(){
    let responce = await fetch(`https://restcountries.eu/rest/v2/all`)
    responce = await responce.json()

    responce.reverse().forEach(davlat => {
        let newOptionElement = document.createElement("option")
        newOptionElement.setAttribute('value', `${davlat.name}/${davlat.capital}`)
        newOptionElement.textContent = `${davlat.name}/${davlat.capital}`
        davlatSelectElement.appendChild(newOptionElement)
        // console.log(davlat);
        // console.log(davlat.name);
    });
}

getDavlatlar()


davlatSelectElement.addEventListener('change', event =>
{
    // console.log(event.target.value);
    let value = davlatSelectElement.value.split("/")
    console.log(value);
    
    let country = value[0]
    let city = value[1]
    fetchNamozVaqtlari(country, city)
})


async function fetchNamozVaqtlari (country, city)
{
    let responce = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=8&school=1`)
    responce = await responce.json()

    // console.log(responce);

    for(let vaqt in responce.data.timings)
    bomdodTimeElement.textContent = responce.data.timings.Fajr;
    peshinTimeElement.textContent = responce.data.timings.Dhuhr;
    asrTimeElement.textContent = responce.data.timings.Asr;
    shomTimeElement.textContent = responce.data.timings.Maghrib;
    xuftonTimeElement.textContent = responce.data.timings.Isha;

    // console.log(vaqt, responce.data.timings[vaqt]);
}