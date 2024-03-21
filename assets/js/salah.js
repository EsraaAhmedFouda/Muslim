async function azkarSalah() {
    const salah = document.querySelector('.salah')
    const res = await fetch(`https://ahegazy.github.io/muslimKit/json/PostPrayer_azkar.json`)
    const data = await res.json()
    const con = data.content
    con.forEach(el => {
        salah.innerHTML += `<div class="div">
        <div class="sub_1 ">${el.zekr}</div>
       <div style="padding:20px 0"><button class="bt" id=${el.repeat}>${el.repeat}</button></div>
        <div class="sub_3">${el.bless}</div>
        </div>` 
    })
    const da = document.querySelectorAll(".bt")
    da.forEach(el => { 
        let counter = el.id; 
        el.addEventListener('click', (e) => {
         
            if(counter != 0)
          {
            counter = counter -1;
            el.innerHTML = counter;}
        });
    })
    
}azkarSalah() 