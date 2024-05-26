function fillSearchField(data) {
  if (data === null) return
  
  var searchField = document.querySelector('input[id="query"]');
  alert(searchField)
  if (searchField) {
    searchField.value = 'abcd';
  }
}

function loadTableData() {
  var storedData = JSON.parse(localStorage.getItem('tableData')) || [];
  var tableBody = document.getElementById('table-body');

  storedData.forEach(data => {
    var newRow = tableBody.insertRow();

    var packageCell = newRow.insertCell(0);
    var actionCell = newRow.insertCell(1);

    packageCell.textContent = data.packageName;
    actionCell.innerHTML = '<button class="insert-button">채우기</button>';
    newRow.querySelector('.insert-button').addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: fillSearchField(data)
        });
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', loadTableData);