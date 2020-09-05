const $playButton = document.getElementById('play');
const $step1Skip = document.getElementById('step1button')
const $step2Next = document.getElementById('step2')
const $step1Gone = document.getElementById('step1')

$playButton.onclick = () => {
    location.href = "game.html";
}

$step1Skip.onclick = () => {
    $step1Gone.style.display = "none"
    $step2Next.style.display = "flex"
}