const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const itemLists = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;


// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArray = [];

// Drag Functionality
let draggedItem;


// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool', 'not Getting stuff done'];
  }
}


// Set localStorage Arrays
function updateSavedColumns() {
  listArray = [backlogListArray,progressListArray,completeListArray,onHoldListArray];
  const arrayNames = ['backlog','progress','complete','onHold'];
  arrayNames.forEach((Names,index) => {
    localStorage.setItem(`${Names}Items`,JSON.stringify(listArray[index]))
  });

  // this code below is like the code upper, but the upper is less repetitive
  //localStorage.setItem('backlogItems', JSON.stringify(backlogListArray));
  //localStorage.setItem('progressItems', JSON.stringify(progressListArray));
  //localStorage.setItem('completeItems', JSON.stringify(completeListArray));
  //localStorage.setItem('onHoldItems', JSON.stringify(onHoldListArray));
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  //console.log('columnEl:', columnEl);
  //console.log('column:', column);
  //console.log('item:', item);
  //console.log('index:', index);
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute('ondragstart', 'drag(event)');

  //Append
  columnEl.appendChild(listEl);

}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if(!updatedOnLoad) {
    getSavedColumns();
  }
  // Backlog Column
  backlogList.textContent = '';
  backlogListArray.forEach((backlogItems, index) => {
    createItemEl(backlogList,0,backlogItems,index);

  });
  // Progress Column
  progressList.textContent = '';
  progressListArray.forEach((progressItems, index) => {
    createItemEl(progressList,0,progressItems,index);
  });

  // Complete Column
  completeList.textContent = '';
  completeListArray.forEach((completeItems, index) => {
    createItemEl(completeList,0,completeItems,index);

  });

  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray.forEach((onHoldItems, index) => {
    createItemEl(onHoldList,0,onHoldItems,index);

  });

  // Run getSavedColumns only once, Update Local Storage
}

//When item start dragging
function drag(e) {
  draggedItem = e.target;
  console.log('this is', draggedItem );

}

//on load
updateDOM();


