// Function to display saved journal entries
function displaySavedEntries() {
  const entriesContainer = document.getElementById('entriesContainer');
  const savedEntries = getSavedEntriesFromLocalStorage();

  // Clear existing entries
  entriesContainer.innerHTML = '';

  // Display saved entries
  savedEntries.forEach((entry, index) => {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');
    entryDiv.innerHTML = `
      <p><strong>Prompt:</strong> ${entry.prompt}</p>
      <p><strong>My Entry:</strong> <span class="editable">${entry.entry}</span></p>
      <p><strong>Written on:</strong> ${entry.timestamp}</p>
      <button class="deleteEntryButton" data-index="${index}">Delete</button>
      <button class="editEntryButton" data-index="${index}">Edit</button>
      <button class="saveEditButton" data-index="${index}" style="display: none;">Save</button>
      <hr>
    `;
    entriesContainer.appendChild(entryDiv);
  });

  // Add event listener for delete buttons
  const deleteButtons = document.querySelectorAll('.deleteEntryButton');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const entryIndex = parseInt(button.getAttribute('data-index'));
      deleteEntry(entryIndex);
    });
  });

  // Add event listener for edit buttons
  const editButtons = document.querySelectorAll('.editEntryButton');
  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const entryIndex = parseInt(button.getAttribute('data-index'));
      editEntry(entryIndex);
    });
  });

  // Add event listener for save edit buttons
  const saveEditButtons = document.querySelectorAll('.saveEditButton');
  saveEditButtons.forEach(button => {
    button.addEventListener('click', function() {
      const entryIndex = parseInt(button.getAttribute('data-index'));
      saveEditedEntry(entryIndex);
    });
  });
}

function editEntry(index) {
  const entryDiv = document.querySelectorAll('.entry')[index];
  const editableArea = entryDiv.querySelector('.editable');
  editableArea.contentEditable = true; // Set contentEditable property to true
  editableArea.style.backgroundColor = '#EBE6F4'; 
  editableArea.style.border = '1px solid #cccccc';
  entryDiv.querySelector('.editEntryButton').style.display = 'none';
  entryDiv.querySelector('.saveEditButton').style.display = 'inline-block';
}

// Function to save edited entry
function saveEditedEntry(index) {
  const savedEntries = getSavedEntriesFromLocalStorage();
  const entryDiv = document.querySelectorAll('.entry')[index];
  const editableArea = entryDiv.querySelector('.editable');
  const editedEntry = editableArea.innerText;
  savedEntries[index].entry = editedEntry;
  localStorage.setItem('journalEntries', JSON.stringify(savedEntries));
  editableArea.contentEditable = false; // Set contentEditable property to false
  editableArea.style.backgroundColor = 'transparent';
  editableArea.style.border = 'none';
  entryDiv.querySelector('.editEntryButton').style.display = 'inline-block';
  entryDiv.querySelector('.saveEditButton').style.display = 'none';
}

// Function to delete an entry from localStorage
function deleteEntry(index) {
  const savedEntries = getSavedEntriesFromLocalStorage();
  savedEntries.splice(index, 1);
  localStorage.setItem('journalEntries', JSON.stringify(savedEntries));
  displaySavedEntries();
}

// Function to retrieve saved entries from localStorage
function getSavedEntriesFromLocalStorage() {
  return JSON.parse(localStorage.getItem('journalEntries')) || [];
}

// Call the function to display saved entries when the page loads
displaySavedEntries();
