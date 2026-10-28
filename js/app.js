
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const errorMsg = document.getElementById('error-msg');
  const list = document.getElementById('todo-list');
  const counter = document.getElementById('counter');
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

  let currentFilter = 'all';


  function showError() {
    errorMsg.classList.remove('hidden');
    errorMsg.hidden = false;
    errorMsg.style.display = '';
  }
  function hideError() {
    errorMsg.classList.add('hidden');
  }

  function updateCounter() {
    const left = list.querySelectorAll('li:not(.completed)').length;
    counter.textContent = left + ' item(s) left';
  }

  function applyFilter() {
    list.querySelectorAll('li').forEach(function (li) {
      const done = li.classList.contains('completed');
      let show = true;
      if (currentFilter === 'active') show = !done;
      if (currentFilter === 'done') show = done;
      li.classList.toggle('hidden', !show);
      li.style.display = show ? '' : 'none';
    });
  }


  function refresh() {
    applyFilter();
    updateCounter();
  }

  function addItem() {
    const text = input.value.trim();

    
    if (text === '') {
      showError();
      return;
    }
    hideError();

    const li = document.createElement('li');

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text; 

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'delete-btn';
    del.textContent = '×';
    del.setAttribute('aria-label', 'Delete');

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li); 

    input.value = '';
    input.focus();
    refresh();
  }

 
  list.addEventListener('click', function (event) {
    const target = event.target;
    const li = target.closest('li');
    if (!li || !list.contains(li)) return;

    if (target.closest('.delete-btn')) {
      li.remove(); 
    } else {
      li.classList.toggle('completed'); 
    }
    refresh();
  });


  form.addEventListener('submit', function (e) {
    e.preventDefault(); 
    addItem();
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      addItem();
    }
  });


  filterAll.addEventListener('click', function () {
    currentFilter = 'all';
    refresh();
  });
  filterActive.addEventListener('click', function () {
    currentFilter = 'active';
    refresh();
  });
  filterDone.addEventListener('click', function () {
    currentFilter = 'done';
    refresh();
  });


  hideError();
  refresh();
});

// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here