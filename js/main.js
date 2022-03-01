
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
    $img.setAttribute('data-id', data.id);
    $img.setAttribute('src', xhr.response.data[i].fullPortrait);
    $imgContainer.appendChild($img);
    $row.appendChild($imgContainer);
    const $agentTextContainer = document.createElement('div');
    $agentTextContainer.setAttribute('class', 'agent-text-container hidden');
    $agentTextContainer.setAttribute('data-id', data.id);
    $agentTextContainer.setAttribute('data-visible', 'false');
    $imgContainer.appendChild($agentTextContainer);
    const $agentDescription = document.createElement('p');
    $agentDescription.setAttribute('class', 'open-sans');
    $agentDescription.textContent = xhr.response.data[i].description;
    $agentTextContainer.appendChild($agentDescription);
    const $images = document.querySelectorAll('.image');
    for (let j = 0; j < $images.length; j++) {
      $images[i].addEventListener('click', function (event) {
        const allTextContainer = document.querySelectorAll('.agent-text-container');
        const imagesId = parseInt($images[i].getAttribute('data-id'));
        for (let k = 0; k < allTextContainer.length; k++) {
          const visibility = allTextContainer[k].getAttribute('data-visible');
          const textContainerIds = parseInt(allTextContainer[k].getAttribute('data-id'));
          if (imagesId === textContainerIds) {
            allTextContainer[k].classList.remove('hidden');
          }
          if (visibility === 'false') {
            allTextContainer[k].setAttribute('data-visible', true);
          }
          allTextContainer[k].addEventListener('click', function (event) {
            if (imagesId === textContainerIds) {
              allTextContainer[k].classList.add('hidden');
            }
            if (visibility === 'true') {
              allTextContainer[k].setAttribute('data-visible', false);
            }
          });
        }
      });
    }
  }
});

xhr.send();
