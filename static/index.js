const songList = [
    {
        name: "Namo Namo",
        singer: "Shankar Mahadevan",
        cover: "static/covers/cover1.jpeg",
        file: "static/songs/song.mp3"
    },
    {
        name: "Raanjha",
        singer: "Sadho Band",
        cover: "static/covers/cover2.jpeg",
        file: "static/songs/song2.mp3"
    },
    {
        name: "Pardesi Pardesi",
        singer: "Sadho Band",
        cover: "static/covers/cover3.png",
        file: "static/songs/song3.mp3"
    }
    ];

var songIndex = 0;
var songPlaying = false
var song = new Audio('songs/song.mp3');
var playTimeDiv = document.querySelector('.timestamps');
var playBtn = document.getElementById('play');
var startTime = document.querySelector('.start');
var endTime = document.querySelector('.end');
var slider = document.getElementById('slider');
// let muteBtn = document.getElementById('mute');
var forBtn = document.getElementById('forward');
var backBtn = document.getElementById('backward');
var songName = document.querySelector('.name');
var singer = document.querySelector('.artist');
var coverImg = document.querySelector('.coverImg');
var titleDiv = document.querySelector('.title');


window.onload = loadSong(songIndex);
// song.ontimeupdate = updatePlayerTime();
song.addEventListener('timeupdate', updatePlayerTime);
slider.addEventListener('change', sliderUpdate);
forBtn.addEventListener('click', playNext);
backBtn.addEventListener('click', playPrev);
playBtn.addEventListener('click', playSong);



function loadSong(songIndex){
    console.log("Inside loadSong")
    song.src = songList[songIndex].file;
    songName.innerText = songList[songIndex].name;
    singer.innerText = songList[songIndex].singer;
    coverImg.src = songList[songIndex].cover;
    song.load();
    slider.value = "0";
    song.addEventListener('loadeddata', ()=>{
        playTimeDiv.style.opacity = "1";
        updatePlayerTime();
    });
    

}

function playNext(){
    song.ended = true;
    if (songIndex < (songList.length-1)) {
        songIndex += 1;
    }
    else{
        songIndex = 0;
    }
    playTimeDiv.style.opacity = "0";
    loadSong(songIndex);
    if (songPlaying) {
        song.play();
    }
}

function playPrev(){
    song.ended = true;
    if (songIndex > 0) {
        songIndex -= 1;
    }
    else{
        songIndex = (songList.length - 1);
    }
    loadSong(songIndex);
    if (songPlaying) {
        song.play();
    }
    
}

function playSong(){
    console.log("Inside playSong");
    if (songPlaying) {
        song.pause();
        songPlaying = false;
        playBtn.innerHTML = '<i class="far fa-play"></i>';
    }
    else{
        song.play();
        songPlaying = true;
        playBtn.innerHTML = '<i class="far fa-pause"></i>';
    }
}

function updatePlayerTime() {
    console.log("Inside updayePlayerTime");
    // console.log(song);
    let curmins = Math.floor(song.currentTime / 60);
    console.log(song.currentTime/60);
    let cursecs = Math.floor(song.currentTime - (curmins * 60));
    console.log(song.currentTime - (curmins * 60));
    let durmins = Math.floor(song.duration / 60);
    let dursecs = Math.floor(song.duration - durmins * 60);
    
    if (curmins < 10) {
        curmins = '0' + curmins;
    }
    if (cursecs < 10) {
        cursecs = '0' + cursecs;
    }
    if (durmins < 10) {
        durmins = '0' + durmins;
    }
    if (dursecs < 10) {
        dursecs = '0' + dursecs;
    }

    
    startTime.innerText = curmins + ":" + cursecs;
    // console.log(startTime.innerText);
    endTime.innerText = durmins + ':' + dursecs;
    // console.log(endTime.innerText);
    slider.value = `${(song.currentTime/song.duration) * 100}`;
    if (song.currentTime == song.duration) {
        playNext();
    }
}

function sliderUpdate() {
    let sliderPos = song.duration * (slider.value / 100);
    let curmins = Math.floor(sliderPos / 60);
    let cursecs = Math.floor(sliderPos - curmins * 60);
    
    if (curmins < 10) {
        curmins = '0' + curmins;
    }
    if (cursecs < 10) {
        cursecs = '0' + cursecs;
    }
    startTime.innerText = curmins + ":" + cursecs;
    song.currentTime = sliderPos;

}

let spectrum = document.querySelector('.spectrum');
let colors = ["#ff0095", "royalblue"];
for(let i = 0; i < 25; i++){
    var bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = "0%";
    let barColor = colors[i % 2];
    bar.style.background = `${barColor}`;
    // console.log(i)
    spectrum.append(bar);
}



function updateBarValue(){
    let bars = document.querySelectorAll('.bar');
    bars.forEach((elem)=>{
        let height = parseInt(Math.random() * 100);
        // alert(height);
        
        elem.style.height = `${height}%`
        // elem.style.background = "white";
    });
}

function resetBarValue(){
    let bars = document.querySelectorAll('.bar');
    bars.forEach((elem)=>{
        elem.style.height = "0%";
    });
}


setInterval(()=>{
    if(songPlaying){
        updateBarValue();
    }else{
        resetBarValue();
    }
}, 500);




// muteBtn.addEventListener('click', ()=>{
//     if (song.muted) {
//         song.muted = false;
//         muteBtn.style.color = "white";
//     }
//     else{
//         song.muted = true;
//         muteBtn.style.color = "royalblue";
//     }
// });

// song.addEventListener('ended', alert())

//<i class="fal fa-volume-up"></i>
//<i class="fal fa-volume-mute"></i>