const [ owner, repository ] = location.href
  .replace(/^(.+):\/\/github\.com\/([^\/]+)\/([^\/]+)\/?(.*)?$/, '$2 $3')
  .split(' ');

fetch(`https://api.github.com/repos/${owner}/${repository}/contents/.angular-cli.json`)
  .then(response => {
    if (response.status !== 200) {
      return;
    }

    const actions = document.querySelector('.pagehead-actions');
    if (!actions) {
      return;
    }

    const newElement = document.createElement('li');
    const newButton = document.createElement('a');
    const newIcon = document.createElement('img');
    const newText = document.createTextNode('StackBlitz');

    newIcon.src = chrome.extension.getURL('lightning.svg');
    newIcon.style.height = '15px';
    newIcon.style.width = '15px';
    newIcon.style.cssFloat = 'left';
    newIcon.style.marginTop = '2px';

    newButton.classList.add('btn', 'btn-sm');
    newButton.href = `https://stackblitz.com/github/${owner}/${repository}`;
    newButton.target = '_blank';

    newButton.appendChild(newIcon);
    newButton.appendChild(newText);

    newElement.appendChild(newButton);
    actions.appendChild(newElement);
  })
  .catch(console.error);