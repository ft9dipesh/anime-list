const $updateForm = document.getElementById('update-form');

const $titleInput = document.getElementById('anime-title');
const $statusInput = document.getElementById('status');
const $animeIdInputUpdate = document.getElementById('anime-kitsuId-update');
const $animeIdInputDelete = document.getElementById('anime-kitsuId-delete');
const $episodeNumberInput = document.getElementById('episode-number');
const $statusSendInput = document.getElementById('status-send');

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

$statusSendInput.value = $statusInput.value;

let totalEpisodes = '';
$episodeNumberInput.addEventListener('change', () => {
  if ($episodeNumberInput.value == totalEpisodes) {
    $statusSendInput.value = $statusInput.value = 'Completed';
    $statusInput.setAttribute('disabled', 'disabled');
  } else {
    $statusInput.removeAttribute('disabled');
  }
});

Array.from(document.getElementsByClassName('edit-button')).forEach(button => {
  button.addEventListener('click', event => {
    $animeIdInputUpdate.value = event.currentTarget.parentElement.id;

    // Get td from tr element
    const tableRowData = Array.from(
      event.currentTarget.parentElement.parentElement.children
    );

    // Get "total anime watched / total anime"
    const watchedData = Array.from(tableRowData[2].childNodes)[2].textContent;
    // Get "total anime watched"
    const watched = watchedData.substr(0, watchedData.indexOf('/'));
    totalEpisodes = watchedData.substr(watchedData.indexOf(' ')).trim();

    $episodeNumberInput.setAttribute('max', totalEpisodes);
    document.getElementById(
      'small-total-episodes'
    ).textContent = `Max Episodes: ${
      totalEpisodes == '' ? '-' : totalEpisodes
    }`;
    // console.log(watched);
    // console.log(total);

    // Set watched input to above data
    $episodeNumberInput.value = watched;

    // Set Title Input to Title
    $titleInput.value = tableRowData[1].innerText;

    $statusSendInput.value = $statusInput.value =
      tableRowData[1].dataset.status;

    Array.from(document.getElementById('rating-select').children).forEach(
      option => {
        if (option.value === tableRowData[3].innerText) {
          option.setAttribute('selected', 'selected');
        }
      }
    );
    // console.log(watched);
  });
});

Array.from(document.getElementsByClassName('remove-button')).forEach(button => {
  button.addEventListener('click', event => {
    console.log(event.currentTarget.parentElement.id);
    $animeIdInputDelete.value = event.currentTarget.parentElement.id;
  });
});
