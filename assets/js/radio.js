async function getRadio(){
    const content = document.querySelector('.container')
    const res = await fetch('https://mp3quran.net/api/v3/radios')
    const data = await res.json()
   data.radios.forEach(el => {
    content.innerHTML +=`<a href=${el.url} 
    class="btn b" 
    style="margin:20px ;width:130px; height:100px;
    background-color: sienna; color:white;"
     >${el.name}</a>`
   });
} getRadio()