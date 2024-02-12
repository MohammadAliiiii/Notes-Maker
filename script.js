let tileIdCounter = 1;

function addTile() {
  const tilesContainer = document.getElementById('tiles-container');

  const tile = document.createElement('div');
  tile.className = 'tile';
  tile.id = 'tile-' + tileIdCounter;

  const heading = document.createElement('input');
  heading.setAttribute('type', 'text');
  heading.setAttribute('placeholder', 'Enter note heading');
  heading.value = 'Note ' + tileIdCounter;

  const textarea = document.createElement('textarea');
  textarea.setAttribute('rows', '5');
  textarea.setAttribute('cols', '30');
  textarea.value = 'Type your text here';
  textarea.style.resize = 'both'; // Make textarea resizable

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.className = 'save-button';
  saveButton.addEventListener('click', function() {
    saveText(tile.id, heading.value, textarea.value);
  });

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.className = 'remove-button';
  removeButton.addEventListener('click', function() {
    removeTile(tile.id);
  });

  textarea.addEventListener('input', function() {
    saveButton.disabled = false;
  });

  tile.appendChild(heading);
  tile.appendChild(textarea);
  tile.appendChild(saveButton);
  tile.appendChild(removeButton);
  tilesContainer.appendChild(tile);

  tileIdCounter++;
}

function saveText(tileId, headingText, text) {
  localStorage.setItem(tileId + '-heading', headingText);
  localStorage.setItem(tileId + '-text', text);
}

function removeTile(tileId) {
  const tile = document.getElementById(tileId);
  if (tile) {
    tile.remove();
    localStorage.removeItem(tileId + '-heading');
    localStorage.removeItem(tileId + '-text');
  }
}

function loadText() {
  for (let i = 1; i < localStorage.length + 1; i++) {
    const headingText = localStorage.getItem('tile-' + i + '-heading');
    const text = localStorage.getItem('tile-' + i + '-text');
    if (text !== null) {
      addTile();
      const tile = document.getElementById('tile-' + (tileIdCounter - 1));
      const textarea = tile.querySelector('textarea');
      const heading = tile.querySelector('input');
      textarea.value = text;
      heading.value = headingText || 'Note ' + (tileIdCounter - 1);
    }
  }
}

loadText();
