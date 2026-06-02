// 1. Daftar nama file MP3 asli yang ada di folder kamu
const playlist = [
    "musik1.mp3",
    "musik2.mp3",
    "musik3.mp3"
];

let currentTrackIndex = 0;
let isPlaying = false;

// 2. Ambil elemen HTML (termasuk tag audio yang baru dibuat)
const audioPlayer = document.getElementById('audio-player');
const songTitle = document.getElementById('song-title');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const visualizer = document.querySelector('.visualizer');

// 3. Fungsi untuk mengganti lagu saat tombol Next/Prev diklik
function changeTrack() {
    // Ganti sumber file audio sesuai index playlist
    audioPlayer.src = playlist[currentTrackIndex];
    
    // Update teks judul di layar
    songTitle.innerText = playlist[currentTrackIndex];
    
    // Jika sebelumnya sedang memutar, langsung putar lagu yang baru
    if (isPlaying) {
        audioPlayer.play();
    }
}

// 4. Logika Tombol Play / Pause Beneran
playBtn.addEventListener('click', function() {
    if (!isPlaying) {
        audioPlayer.play(); // Memutar musik asli
        isPlaying = true;
        playBtn.innerText = "⏸ PAUSE";
        playBtn.style.backgroundColor = "#ff007f";
        playBtn.style.color = "#fff";
        animateVisualizer();
    } else {
        audioPlayer.pause(); // Menjeda musik asli
        isPlaying = false;
        playBtn.innerText = "▶ PLAY";
        playBtn.style.backgroundColor = "#c0c0c0";
        playBtn.style.color = "#000";
        visualizer.innerText = "[ █ ▄ █ ▄ ▄ █ ▄ █ ]";
    }
});

// Tombol Next
nextBtn.addEventListener('click', function() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    changeTrack();
});

// Tombol Prev
prevBtn.addEventListener('click', function() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    changeTrack();
});

// Fungsi animasi visualizer tulisan (tetap dipertahankan biar estetik Y2K)
function animateVisualizer() {
    if (!isPlaying) return;
    
    const chars = ["█", "▄", " ", "■", "█"];
    let randomVisual = "[ ";
    for (let i = 0; i < 10; i++) {
        randomVisual += chars[Math.floor(Math.random() * chars.length)] + " ";
    }
    randomVisual += "]";
    
    visualizer.innerText = randomVisual;
    setTimeout(animateVisualizer, 150);
}

// Fitur Close Window 'X' (tetap sama seperti kemarin)
const closeButtons = document.querySelectorAll('.box-buttons span:last-child');
closeButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const targetBox = e.target.closest('.y2k-box');
        targetBox.style.display = 'none';
        alert("Sistem: Window berhasil ditutup! Refresh halaman untuk mengembalikan.");
    });
});