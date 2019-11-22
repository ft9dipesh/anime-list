$uploadForm = document.getElementById('upload-form');
$changeAvatarButton = document.getElementById('change-avatar-button');

$changeAvatarButton.addEventListener('click', () => {
  $uploadForm.removeAttribute('hidden');
  $changeAvatarButton.setAttribute('hidden', 'hidden');
});
