const audio = document.querySelector('.audio');
const audioImage = document.querySelector('.audio-image img');
const audioTitle = document.querySelector('.audio-title p');
const container = document.querySelector('.container');
const chevronIcon = document.querySelector('.controls-left');
const hiddenMenu = document.querySelector('.hidden-menu');
const playBtn = document.querySelector('.play');
const prevAudioBtn = document.querySelector('.prev-audio');
const nextAudioBtn = document.querySelector('.next-audio');
const progressBar = document.querySelector('.progress-bar');
const progressDiv = document.querySelector('.progress-div');
const table = document.querySelector('ul');

const audioLibrary = ['Declan DP - Altitude', 'Lesion X - New Horizons', 'Metro Vice - Silence', 'Roa - Underwater', 'Never Gonna Give You Up'];

let active = false;
let audioIndex = 0;

const loadAudio = (audioSrc) => {
    audioTitle.textContent = audioSrc;
    audioImage.src = `images/${audioSrc}.png`;
    audio.src = `music/${audioSrc}.mp3`;
}

loadAudio(audioLibrary[audioIndex]);

const loadAudioToTable = () => {
    for (let i = 0; i < audioLibrary.length; i++) {
        const li = document.createElement('li');
        const paragraph = document.createElement('p');
        paragraph.textContent = audioLibrary[i];
        li.appendChild(paragraph);
        table.appendChild(li);
    }
}

loadAudioToTable();

const playSong = () => {
    container.classList.add('playing');
    audioImage.style.width = '60%';
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}
const pauseSong = () => {
    container.classList.remove('playing');
    audioImage.style.width = '50%';
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

const nextAudio = () => {
    audioIndex++;
    if (audioIndex > audioLibrary.length - 1) {
        audioIndex = 0;
    }
    loadAudio(audioLibrary[audioIndex]);
    playSong();
}

const prevAudio = () => {
    audioIndex--;
    if (audioIndex < 0) {
        audioIndex = audioLibrary.length - 1;
    }
    loadAudio(audioLibrary[audioIndex]);
    playSong();
}

const changeAudio = (e) => {
    if ((e.target.tagName).toLowerCase() == "p") {
        const index = audioLibrary.indexOf(e.target.textContent);
        audioIndex = index;
    }
    loadAudio(audioLibrary[audioIndex]);
    closeHiddenMenu();
    playSong();
}

const update = (e) => {
    const {
        duration,
        currentTime
    } = e.srcElement;
    const progressInPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressInPercent}%`;
}

const setUpdate = (e) => {
    const width = progressDiv.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

const openHiddenMenu = () => {
    hiddenMenu.style.display = 'block';
    chevronIcon.querySelector('i.fas').setAttribute('onclick', 'closeHiddenMenu();');
    chevronIcon.querySelector('i.fas').classList.remove('fa-chevron-down');
    chevronIcon.querySelector('i.fas').classList.add('fa-chevron-up');

}
const closeHiddenMenu = () => {
    hiddenMenu.style.display = 'none';
    chevronIcon.querySelector('i.fas').setAttribute('onclick', 'openHiddenMenu();');
    chevronIcon.querySelector('i.fas').classList.remove('fa-chevron-up');
    chevronIcon.querySelector('i.fas').classList.add('fa-chevron-down');
}

const changeTheme = () => {
    const theme = document.querySelector('.styles');
    if (theme.classList.contains('dark')) {
        theme.setAttribute('href', 'style-light.css');
        theme.classList.remove('dark');
        theme.classList.add('light');
    } else {
        theme.setAttribute('href', 'style-dark.css');
        theme.classList.remove('light');
        theme.classList.add('dark');
    }
}

playBtn.addEventListener('click', () => {
    const active = container.classList.contains('playing');
    if (active) {
        pauseSong();
    } else {
        playSong();
    }
});

audioImage.addEventListener('click', () => {
    const active = container.classList.contains('playing');
    if (active) {
        pauseSong();
    } else {
        playSong();
    }
});

hiddenMenu.addEventListener('click', changeAudio);
prevAudioBtn.addEventListener('click', prevAudio);
nextAudioBtn.addEventListener('click', nextAudio);
audio.addEventListener('ended', nextAudio);
audio.addEventListener('timeupdate', update);
progressDiv.addEventListener('click', setUpdate);
