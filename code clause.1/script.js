const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const seekBar = document.getElementById('seek-bar');
const volumeBar = document.getElementById('volume-bar');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const playlist = document.getElementById('playlist').getElementsByTagName('li');

let currentSongIndex = 0;

function playSong(index) {
    const song = playlist[index];
    audio.src = song.getAttribute('data-src');
    audio.load();
    audio.play();
    songTitle.textContent = song.textContent;
    artistName.textContent = 'Artist Name'; // Replace with actual artist name
    playPauseButton.classList.remove('play');
    playPauseButton.classList.add('pause');
    setCurrentSong(index);
}

function setCurrentSong(index) {
    for (let i = 0; i < playlist.length; i++) {
        if (i === index) {
            playlist[i].classList.add('active');
        } else {
            playlist[i].classList.remove('active');
        }
    }
}

playPauseButton.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
        playPauseButton.classList.remove('play');
        playPauseButton.classList.add('pause');
    } else {
        audio.pause();
        playPauseButton.classList.remove('pause');
        playPauseButton.classList.add('play');
    }
});

audio.addEventListener('timeupdate', function () {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
});

seekBar.addEventListener('input', function () {
    const seekTime = (audio.duration / 100) * seekBar.value;
    audio.currentTime = seekTime;
});

volumeBar.addEventListener('input', function () {
    audio.volume = volumeBar.value;
});

for (let i = 0; i < playlist.length; i++) {
    playlist[i].addEventListener('click', function () {
        playSong(i);
    });
}

playSong(currentSongIndex);
