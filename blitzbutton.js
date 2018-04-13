const [ owner, repository ] = location.href
  .replace(/^(.+):\/\/github\.com\/([^\/]+)\/([^\/]+)\/?(.*)?$/, '$2 $3')
  .split(' ');

fetch(`https://api.github.com/repos/${owner}/${repository}/contents/.angular-cli.json`)
  .then(response => {
    if (response.status !== 200) {
      console.info('This is not an Angular CLI repository');
      return;
    }

    const actions = document.querySelector('.pagehead-actions');
    const newElement = document.createElement('li');
    const newButton = document.createElement('a');
    const newIcon = document.createElement('img');
    const newSpan = document.createElement('span');

    newSpan.textContent = 'StackBlitz';
    newIcon.src = browser.extension.getURL('lightning.svg');
    newIcon.style.width = '1.3em';

    newButton.classList.add('btn', 'btn-sm');
    newButton.href = `https://stackblitz.com/github/${owner}/${repository}`;
    newButton.target = '_blank';
    newButton.style.display = 'flex';
    newButton.style.alignContent = 'center';

    newButton.appendChild(newIcon);
    newButton.appendChild(newSpan);

    newElement.appendChild(newButton);
    actions.appendChild(newElement);
  })
  .catch(err => {});