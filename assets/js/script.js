const apiUrl = 'https://mp3quran.net/api/v3'
const lang = 'ar'


async function getReciters() {
    const chooseReader = document.querySelector('#chooseReader')
    const res = await fetch(`${apiUrl}/reciters?language=${lang}`)
    const data = await res.json();
    chooseReader.innerHTML = `<option value="">اختر القارئ</option>`
    data.reciters.forEach(reciter => {
        chooseReader.innerHTML += `<option value=${reciter.id}>${reciter.name}</option>`
    });
    chooseReader.addEventListener('change', (e) => getMoshaf(e.target.value))

}
getReciters();
async function getMoshaf(reciter) {
    const chooseRewaia = document.querySelector('#chooseRewaia')
    const res = await fetch(`${apiUrl}/reciters?language=${lang}&reciter=${reciter}`)//4
    const data = await res.json();
    const moshafs = data.reciters[0].moshaf;
    chooseRewaia.innerHTML = `<option value="" data-server="" data-surahList ="">اختر المصحف</option>`;

    moshafs.forEach(moshaf => chooseRewaia.innerHTML += `<option value=${moshaf.id} data-server=${moshaf.server} data-surahList =${moshaf.surah_list}>${moshaf.name}</option>`);
    chooseRewaia.addEventListener('change', (e) => {
        const chooseMoshaf = chooseRewaia.options[chooseRewaia.selectedIndex]
        const server = chooseMoshaf.dataset.server;
        const list = chooseMoshaf.dataset.surahlist;
        getSurah(server, list)
    })
}
async function getSurah(server, list) {
    const chooseSura = document.querySelector('#chooseSura')
    const res = await fetch(`https://mp3quran.net/api/v3/suwar`)
    const data = await res.json();
    const surahNames = data.suwar;
    list = list.split(',')
    chooseSura.innerHTML = `<option value="">اختر السورة</option>`
    list.forEach(surah => {
       const padStart = surah.padStart(3,'0')
        surahNames.forEach(surahName => {
            if (surahName.id == surah) {
                chooseSura.innerHTML += `<option id=${surahName.id} value=${server}${padStart}.mp3>${surahName.name}</option>`
            }
        })
    })
    chooseSura.addEventListener('change', (e) => {
        const select = chooseSura.options[chooseSura.selectedIndex]
       playSura(select.value)
       write(+(select.id))
    })
 
}

function playSura(mp3){
    const audio = document.querySelector('#audio')
    audio.src = mp3
    audio.play()
}
function playLive(channel){
    if(Hls.isSupported()) {
        var video = document.getElementById('vedio');
        var hls = new Hls();
        hls.loadSource(`${channel}`);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
          video.play();
      });
     }
}
async function getTafseer() {
    const tafseer = document.querySelector('.con')
    const res = await fetch(`https://mp3quran.net/api/v3/tafsir`)
    const data = await res.json();
    tafseerNames = data.tafasir.soar
    tafseerNames.forEach(t => {
        tafseer.innerHTML += `<div class="c" style="text-align:center; background-color: rgba(160, 81, 45, 0.797); ;"><a style=" color:white;" href=${t.url}>${t.name}</a></div>` 
       
    })
   
}getTafseer()
async function write(x) {
const wr = document.querySelector('.write')
const res = await fetch('https://api.alquran.cloud/v1/quran/ar.asad')
const data = await res.json();
const content = data.data.surahs[--x].ayahs;
wr.innerHTML =`<div style="font-size:30px; text-align:center;text-decoration: underline; margin:20px">${data.data.surahs[x].name}</div>`
content.forEach(c=>{
    wr.innerHTML+=`<span style="color: #2196f3;font-size:23px;">${c.text} ۞ </span>`
})
}
