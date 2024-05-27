const settingsBtn = document.getElementById('settings');
settingsBtn.onclick = () => {
  chrome.runtime.openOptionsPage();
};

function fillSearchField(data) {
  if (data === null) return;
  var searchField = document.querySelector('input[name="query"]');
  alert(searchField);
  if (searchField) {
    searchField.value = "abcd";
  }
}

function loadStmsData() {
  var storedData = loadStmsStorageData();
  var tableBody = document.getElementById("table-body");

  storedData.forEach((data) => {
    var newRow = tableBody.insertRow();
    var packageCell = newRow.insertCell(0);
    packageCell.textContent = data.packageName;
    packageCell.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: (tabArgs) => {
            var searchField = document.querySelector('input[name="query"]');
            if (searchField) {
              searchField.value = tabArgs.packageName;
            }
          },
          args: [data],
        });
      });
    });
  });
}

function loadGerritData() {
  var storedData = loadGerritStorageData();
  var tableBody = document.getElementById("table-body-gerrit");

  storedData.forEach((data) => {
    var newRow = tableBody.insertRow();
    var nickNameCell = newRow.insertCell(0);
    nickNameCell.textContent = data.nickName;
    nickNameCell.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: (tabArgs) => {
            var searchField = document.querySelector('input[name="query"]');
            if (searchField) {
              searchField.value = tabArgs.singleIds;
            }
          },
          args: [data],
        });
      });
    });
  });
}

function loadTableData() {
  loadStmsData()
  loadGerritData()
}

function loadStmsStorageData(){
  return JSON.parse(localStorage.getItem("stmsData")) || [];
}

function loadGerritStorageData(){
  return JSON.parse(localStorage.getItem("gerritData")) || [];
}

document.addEventListener("DOMContentLoaded", loadTableData);
