const songName = window.document.getElementById('song-name');                              
const song = window.document.getElementById('audio');

const play = window.document.getElementById('play')

songName.innerText = 'I Want It That Way';



function playSong (){
   song.play(); 
}

play.addEventListener('click',playSong);