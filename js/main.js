
const $ul = document.querySelector('ul');
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://valorant-api.com/v1/agents?isPlayableCharacter=true');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  // console.log('the status of xhr', xhr.status);
  // console.log('the response of xhr', xhr.response);
  data.character = xhr.response.data;
  renderAgents(xhr.response);
});

xhr.send();

function renderAgents(agents) {
  const $li = document.createElement('li');
  $ul.appendChild($li);
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row justify-space-around');
  $li.appendChild($row);
  for (let i = 0; i < xhr.response.data.length; i++) {
    const $imgContainer = document.createElement('div');
    $imgContainer.setAttribute('class', 'img-container img-container-style');
    if (xhr.response.data[i].background !== null) {
      $imgContainer.style.backgroundImage = `url(${xhr.response.data[i].background})`;
    }
    const $img = document.createElement('img');
    $img.setAttribute('class', 'image');
    $img.setAttribute('data-id', data.id);
    $img.setAttribute('src', xhr.response.data[i].fullPortrait);
    $imgContainer.appendChild($img);
    $row.appendChild($imgContainer);
    const $agentTextContainer = document.createElement('div');
    $agentTextContainer.setAttribute('class', 'agent-text-container hidden');
    $agentTextContainer.setAttribute('data-id', data.id);
    $imgContainer.appendChild($agentTextContainer);
    const $agentDescription = document.createElement('p');
    $agentDescription.setAttribute('class', 'open-sans');
    data.id++;
    $agentDescription.textContent = xhr.response.data[i].description;
    $agentTextContainer.appendChild($agentDescription);
    const $images = document.querySelectorAll('.image');
    for (let j = 0; j < $images.length; j++) {
      $images[j].addEventListener('click', function (event) {
        const allTextContainer = document.querySelectorAll('.agent-text-container');
        const imagesId = parseInt($images[j].getAttribute('data-id'));
        for (let k = 0; k < allTextContainer.length; k++) {
          const textContainerIds = parseInt(allTextContainer[k].getAttribute('data-id'));
          if (imagesId === textContainerIds) {
            allTextContainer[k].classList.remove('hidden');
          }
          allTextContainer[k].addEventListener('click', function (event) {
            if (imagesId === textContainerIds) {
              allTextContainer[k].classList.add('hidden');
            }
          });
        }
      });
    }
    const $buttonContainer = document.createElement('div');
    $buttonContainer.setAttribute('class', 'button-container');
    $imgContainer.appendChild($buttonContainer);
    const $button = document.createElement('button');
    $button.setAttribute('class', 'button');
    $button.setAttribute('data-view', xhr.response.data[i].displayName);
    $button.textContent = 'View Abilities';
    $buttonContainer.appendChild($button);
  }
}

$ul.addEventListener('click', handleButton);
function handleButton(event) {
  if (event.target.matches('button')) {
    const $agent = document.querySelector('.agent');
    const $viewValue = event.target.getAttribute('data-view');
    data.view = $viewValue;
    for (let i = 0; i < data.character.length; i++) {
      if (data.character[i].displayName === data.view) {
        $agent.setAttribute('data-view', data.character[i].displayName);
        data.currentAgent = $agent.getAttribute('data-view');
        renderAgentAbilities(data.character[i]);
      }
    }
    switchView(data.view);
  }
}

window.addEventListener('DOMContentLoaded', handleDomContent);
function handleDomContent(event) {
  const $agent = document.querySelector('.agent');
  for (let i = 0; i < data.character.length; i++) {
    if (data.character[i].displayName === data.currentAgent) {
      $agent.setAttribute('data-view', data.currentAgent);
      renderAgentAbilities(data.character[i]);
    }
  }
  switchView(data.view);
}
const $view = document.querySelectorAll('[data-view]');
function switchView(viewName) {
  data.view = viewName;
  for (let i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === viewName) {
      $view[i].className = 'view';
    } else {
      $view[i].className = 'agent hidden';
    }
  }
}

const $a = document.querySelector('a');
$a.addEventListener('click', handleHomePage);
function handleHomePage(event) {
  event.preventDefault();
  switchView('home-page');
}

const $container = document.querySelector('.select-me');
function renderAgentAbilities(abilities) {
  const $dataView = document.querySelectorAll('[data-view]');
  for (let i = 0; i < $dataView.length; i++) {
    if (abilities.displayName !== $dataView[i].getAttribute('data-view')) {
      $container.innerHTML = '';
    }
  }
  const $h2 = document.createElement('h2');
  $h2.textContent = abilities.displayName;
  $h2.setAttribute('class', 'text-align-center proza-libre color-white');
  $container.appendChild($h2);
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row align-items-center');
  $container.appendChild($row);
  for (const keys in data.gifLookUp) {
    if (keys === abilities.displayName) {
      for (let i = 0; i < data.gifLookUp[keys].length; i++) {
        const $gifContainer = document.createElement('div');
        $gifContainer.setAttribute('class', 'gif-container');
        $row.appendChild($gifContainer);
        const $video = document.createElement('video');
        $video.setAttribute('controls', 'true');
        $video.setAttribute('preload', 'true');
        $gifContainer.appendChild($video);
        const $src = document.createElement('source');
        $src.setAttribute('src', data.gifLookUp[keys][i]);
        $src.setAttribute('type', 'video/mp4');
        $video.appendChild($src);
        const $columnHalf = document.createElement('div');
        $columnHalf.setAttribute('class', 'column-half');
        $row.appendChild($columnHalf);
        const $h3 = document.createElement('h3');
        $h3.setAttribute('class', 'ability-name color-white proza-libre');
        $h3.textContent = abilities.abilities[i].displayName;
        $columnHalf.appendChild($h3);
        const $p = document.createElement('p');
        $p.setAttribute('class', 'ability-description open-sans');
        $p.textContent = abilities.abilities[i].description;
        $columnHalf.appendChild($p);
      }
    }
  }
}
