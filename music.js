const songName = window.document.getElementById('song-name');                              
const song = window.document.getElementById('audio');
const play = window.document.getElementById('play')
const bandName = window.document.getElementById('band-name');
const coverDisc = window.document.getElementById('cover')
const next = window.document.getElementById('next')
const previous = window.document.getElementById('previous')

const IWantItThatWay = {
    songName: 'I Want It That Way',
    artist: 'Backstreet boys',
    file:'Backs'
}

const ZumZumZum = {
    songName: 'zumzumzum',
    artist: 'Teto raps',
    file:'Teto'
}
const SoldaMeiaNoite = {
    songName: 'Sol da Meia Noite',
    artist: 'Rosa de Saron',
    file:'Rosa'
}

let isPlaying = false

const playlist = [IWantItThatWay,ZumZumZum,SoldaMeiaNoite]
let index = 0;

function playSong (){
   
        play.querySelector('.bi').classList.remove('bi-play-circle-fill')
        play.querySelector('.bi').classList.add('bi-pause-circle-fill')
         song.play();
         isPlaying = true;
    
}
function pauseSong (){
   
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill')
    play.querySelector('.bi').classList.add('bi-play-circle-fill')
     song.pause();
     isPlaying = false;
     

}
function PlaypauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }else{
        playSong();
        
    }

}

function initializeSong (){
    coverDisc.src = `src/imagens/${playlist[index].file}.jpg`;

    song.src = `src/Songs/${playlist[index].file}.mp3`;
    songName.innerHTML = `${playlist[index].songName}`
    bandName.innerHTML = playlist[index].artist;
}

function previousSong(){
    if(index === 0){
        index = playlist.length -1// quando chegar no -1 , ele vai jogar pro comprimento do array que nesse caso é o numero 2 
        
    }else{
        index--
       
    }
    initializeSong();
    playSong();
  
}
function nextSong(){
    if(index === playlist.length -1){
        index = 0
        // nesse caso ele so inverter a situacao 
        
    }else{
        index++
       
    }
    initializeSong();
    playSong();
  
}
initializeSong();
play.addEventListener('click',PlaypauseDecider);

previous.addEventListener('click',previousSong)

next.addEventListener('click',nextSong)