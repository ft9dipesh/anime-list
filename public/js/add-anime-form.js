const $episodeNumberInput = document.getElementById('episode-number');
const $statusInput = document.getElementById('status');
const $completedOption = document.getElementById('complete');

const animeStatus = document.getElementById('anime-status').value;
const totalEpisodes = document.getElementById('total-episodes').value;

if (animeStatus !== 'finished') {
  $completedOption.setAttribute('disabled', 'disabled');
}

$statusInput.addEventListener('change', () => {
  if ($statusInput.value === 'Completed') {
    $episodeNumberInput.value = totalEpisodes;
    $episodeNumberInput.setAttribute('readonly', 'readonly');
  } else if ($statusInput.value === 'Plan To Watch') {
    $episodeNumberInput.value = 0;
    $episodeNumberInput.setAttribute('readonly', 'readonly');
  } else {
    $episodeNumberInput.removeAttribute('readonly');
  }
});
