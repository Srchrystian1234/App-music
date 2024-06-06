const songName = window.document.getElementById('song-name');                              
const song = window.document.getElementById('audio');
const play = window.document.getElementById('play')
const bandName = window.document.getElementById('band-name');
const coverDisc = window.document.getElementById('cover')

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



play.addEventListener('click',PlaypauseDecider);