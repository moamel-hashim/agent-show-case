
const $ul = document.querySelector('ul');
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://valorant-api.com/v1/agents?isPlayableCharacter=true');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  console.log('the status of xhr', xhr.status);
  console.log('the response of xhr', xhr.response);
  const $li = document.createElement('li');
  $ul.appendChild($li);
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row justify-space-around');
  $li.appendChild($row);
  for (let i = 0; i < xhr.response.data.length; i++) {
    const $imgContainer = document.createElement('div');
    $imgContainer.setAttribute('class', 'img-container img-container-style');
    $imgContainer.setAttribute('data-id', data.id);
    if (xhr.response.data[i].background !== null) {
      $imgContainer.style.backgroundImage = `url(${xhr.response.data[i].background})`;
    }
    data.id++;
    const $img = document.createElement('img');
    $img.setAttribute('class', 'image');
    $img.setAttribute('src', xhr.response.data[i].fullPortrait);
    $imgContainer.appendChild($img);
    $row.appendChild($imgContainer);
    const $agentTextContainer = document.createElement('div');
    $agentTextContainer.setAttribute('class', 'agent-text-container hidden');
    $imgContainer.appendChild($agentTextContainer);
    const $agentDescription = document.createElement('p');
    $agentDescription.setAttribute('class', 'open-sans');
    $agentDescription.textContent = xhr.response.data[i].description;
    $agentTextContainer.appendChild($agentDescription);
  }
});

xhr.send();

// $agentTextContainer.addEventListener('click', handleTextContainer);
// function handleTextContainer(event) {
//   if (event.target) {
//     $agentTextContainer.classList.remove('hidden');
//   }

$ul.addEventListener('click', handleTextContainer);
function handleTextContainer(event) {
  const allTextContainer = document.querySelectorAll('.agent-text-container');
  for (let i = 0; i < allTextContainer.length; i++) {
    if (event.target) {
      allTextContainer[i].classList.remove('hidden');
    }
  }
}
