
const $ul = document.querySelector('ul');
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://valorant-api.com/v1/agents?isPlayableCharacter=true');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  console.log('the status of xhr', xhr.status);
  console.log('the response of xhr', xhr.response.data);
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
    $imgContainer.setAttribute('data-id', data.id);
    $imgContainer.setAttribute('data-character-name', xhr.response.data[i].displayName);
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
    const $span = document.createElement('span');
    $imgContainer.appendChild($span);
    const $star = document.createElement('i');
    $star.setAttribute('class', 'far fa-star star');
    $star.setAttribute('data-character-name', xhr.response.data[i].displayName);
    $span.appendChild($star);
    let foundAMatch = false;
    const $imageContainers = document.querySelectorAll('.img-container');
    const $characterName = $imageContainers[i].getAttribute('data-character-name');
    for (let i = 0; i < data.favorite.length; i++) {
      if (data.favorite[i].displayName === $characterName) {
        foundAMatch = true;
        $star.setAttribute('class', 'fas fa-star star');
      }
    }
    if (!foundAMatch) {
      for (let j = 0; j < data.character.length; j++) {
        if ($characterName === data.character[j].displayName) {
          $star.setAttribute('class', 'far fa-star star');
        }
      }
    }
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
  if (!event.target.matches('button')) {
    return;
  }
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

$ul.addEventListener('click', handleStar);
function handleStar(event) {
  if (!event.target.matches('i')) {
    return;
  }
  if (event.target.className === 'far fa-star star') {
    const $starCharacterName = (event.target.getAttribute('data-character-name'));
    event.target.className = 'fas fa-star star';
    const $characterName = event.target.closest('.img-container').getAttribute('data-character-name');
    let foundAMatch = false;
    if ($starCharacterName === $characterName) {
      for (let i = 0; i < data.favorite.length; i++) {
        if (data.favorite[i].displayName === $starCharacterName) {
          foundAMatch = true;
        }
      }
      if (!foundAMatch) {
        for (let j = 0; j < data.character.length; j++) {
          if ($starCharacterName === data.character[j].displayName) {
            data.favorite.push(data.character[j]);
          }
        }
      }
    }
  } else if (event.target.className === 'fas fa-star star') {
    event.target.className = 'far fa-star star';
    const $starCharacterName = event.target.getAttribute('data-character-name');
    const $characterName = event.target.closest('.img-container').getAttribute('data-character-name');
    if ($starCharacterName === $characterName) {
      for (let k = 0; k < data.favorite.length; k++) {
        if ($characterName === data.favorite[k].displayName) {
          data.favorite.splice(k, 1);
        }
      }
    }
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
  renderFavorite(data.character);
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

const $home = document.querySelector('.home');
$home.addEventListener('click', handleHomePage);
function handleHomePage(event) {
  event.preventDefault();
  data.id = 0;
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

const $favorite = document.querySelector('.favorite');
$favorite.addEventListener('click', handleFavoriteTab);
function handleFavoriteTab(event) {
  event.preventDefault();
  let foundAMatch = false;
  const $imageContainers = document.querySelectorAll('.img-container');
  for (let i = 0; i < data.favorite.length; i++) {
    const $characterName = $imageContainers[i].getAttribute('data-character-name');
    console.log(data.favorite[i].displayName === $characterName);
    if (data.favorite[i].displayName === $characterName) {
      foundAMatch = true;
    }
  }
  if (!foundAMatch) {
    console.log('hi');
    renderFavorite();
  }
  data.id = 0;
  switchView('favorite');
}
// let foundAMatch = false;
//     const $imageContainers = document.querySelectorAll('.img-container');
//     const $characterName = $imageContainers[i].getAttribute('data-character-name');
//     for (let i = 0; i < data.favorite.length; i++) {
//       if (data.favorite[i].displayName === $characterName) {
//         foundAMatch = true;
//         $star.setAttribute('class', 'fas fa-star star');
//       }
//     }
//     if (!foundAMatch) {
//       for (let j = 0; j < data.character.length; j++) {
//         if ($characterName === data.character[j].displayName) {
//           $star.setAttribute('class', 'far fa-star star');
//         }
//       }
//     }
const $secondUl = document.querySelector('.second-ul');
function renderFavorite(agent) {
  const $li = document.createElement('li');
  $secondUl.appendChild($li);
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row justify-space-around');
  $li.appendChild($row);
  for (let i = 0; i < data.favorite.length; i++) {
    const $imageContainer = document.createElement('div');
    $imageContainer.setAttribute('class', 'img-container img-container-style');
    $imageContainer.setAttribute('data-id', data.id);
    $imageContainer.setAttribute('data-character-name', data.favorite[i].displayName);
    if (data.favorite[i].background !== null) {
      $imageContainer.style.backgroundImage = `url(${data.favorite[i].background})`;
    }
    const $img = document.createElement('img');
    $img.setAttribute('class', 'images');
    $img.setAttribute('data-id', data.id);
    $img.setAttribute('src', data.favorite[i].fullPortrait);
    $imageContainer.appendChild($img);
    $row.appendChild($imageContainer);
    const $agentTextContainer = document.createElement('div');
    $agentTextContainer.setAttribute('class', 'agent-text-container hidden');
    $agentTextContainer.setAttribute('data-id', data.id);
    $imageContainer.appendChild($agentTextContainer);
    const $agentDescription = document.createElement('p');
    $agentDescription.setAttribute('class', 'open-sans');
    $imageContainer.appendChild($agentDescription);
    const $span = document.createElement('span');
    $imageContainer.appendChild($span);
    const $star = document.createElement('i');
    $star.setAttribute('class', 'fas fa-star star');
    $star.setAttribute('data-character-name', data.favorite.displayName);
    $span.appendChild($star);
    data.id++;
    $agentDescription.textContent = data.favorite[i].description;
    $agentTextContainer.appendChild($agentDescription);
    const $images = document.querySelectorAll('.images');
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
    $imageContainer.appendChild($buttonContainer);
    const $button = document.createElement('button');
    $button.setAttribute('class', 'button');
    $button.setAttribute('data-view', data.favorite[i].displayName);
    $button.textContent = 'View Abilities';
    $buttonContainer.appendChild($button);
  }
}

$secondUl.addEventListener('click', handleFavoriteButton);
function handleFavoriteButton(event) {
  if (!event.target.matches('button')) {
    return;
  }
  if (event.target.matches('button')) {
    const $agent = document.querySelector('#favorite-agent');
    console.log($agent);
    const $viewValue = event.target.getAttribute('data-view');
    data.view = $viewValue;
    for (let i = 0; i < data.character.length; i++) {
      if (data.character[i].displayName === data.view) {
        $agent.setAttribute('data-view', data.character[i].displayName);
        console.log(data.character[i].displayName);
        data.currentAgent = $agent.getAttribute('data-view', data.character[i].displayName);
        console.log(data.character[i]);
        renderAgentAbilities(data.character[i]);
      }
    }
    switchView(data.view);
  }
}
