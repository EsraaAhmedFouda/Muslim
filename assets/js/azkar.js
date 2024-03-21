async function azkarSabah() {
    const con1 = document.querySelector('.con_1')
    const res = await fetch(`https://ahegazy.github.io/muslimKit/json/azkar_sabah.json`)
    const data = await res.json()
    const con = data.content
    con.forEach(el => {
        con1.innerHTML += `<div class="div">
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
    
}azkarSabah() 

