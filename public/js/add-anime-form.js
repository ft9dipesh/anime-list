const $episodeNumberInput = document.getElementById('episode-number');
const $statusInput = document.getElementById('status');
const $completedOption = document.getElementById('complete');
const $statusSendInput = document.getElementById('status-send');

const animeStatus = document.getElementById('anime-status').value;
const totalEpisodes = document.getElementById('total-episodes').value;

$statusSendInput.value = $statusInput.value;

if (animeStatus !== 'finished') {
  $completedOption.setAttribute('disabled', 'disabled');
}

$statusInput.addEventListener('change', () => {
  $statusSendInput.value = $statusInput.value;
  if ($statusInput.value === 'Completed') {
    $episodeNumberInput.value = totalEpisodes;
    $episodeNumberInput.setAttribute('readonly', 'readonly');
  } else if ($statusInput.value === 'Plan To Watch') {
    $episodeNumberInput.value = 0;
    $episodeNumberInput.setAttribute('readonly', 'readonly');
  } else if (
    $episodeNumberInput.value == totalEpisodes ||
    $episodeNumberInput.value == 0
  ) {
    $episodeNumberInput.value = 1;
    $episodeNumberInput.removeAttribute('readonly');
  }
});

$episodeNumberInput.addEventListener('change', () => {
  if ($episodeNumberInput.value == totalEpisodes) {
    $statusSendInput.value = $statusInput.value = 'Completed';
    $statusInput.setAttribute('disabled', 'disabled');
  } else {
    $statusInput.removeAttribute('disabled');
  }
});
