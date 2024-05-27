
const addGerritRowBtn = document.getElementById("add_gerrit_row_btn");
addGerritRowBtn.onclick = () => {
  addGerritRow();
};

function deleteGerritRow(button) {
  // 현재 버튼이 속한 행을 찾고 삭제
  var row = button.parentNode.parentNode;
  var nickName = row.cells[0].textContent;

  // 로컬 스토리지에서 데이터 삭제
  var storedData = loadGerritData();
  storedData = storedData.filter((data) => data.nickName !== nickName);
  localStorage.setItem("gerritData", JSON.stringify(storedData));

  row.parentNode.removeChild(row);
}

function addGerritRow() {
  // 입력 필드에서 값을 가져옴
  var nickName = document.getElementById("nickName").value;
  var singleIds = document.getElementById("singleIds").value;

  // 빈 값이 없는지 확인
  if (!nickName || !singleIds) {
    alert("모든 필드를 채워주세요.");
    return;
  }

  // 새로운 행 생성
  var tableBody = document.getElementById("table-body-gerrit");
  var newRow = tableBody.insertRow();

  var nickNameCell = newRow.insertCell(0);
  var singleIdsCell = newRow.insertCell(1);
  var actionCell = newRow.insertCell(2);

  nickNameCell.textContent = nickName;
  singleIdsCell.textContent = singleIds;

  actionCell.innerHTML = '<button class="delete-button">삭제</button>';
  newRow.querySelector(".delete-button").addEventListener("click", function () {
    deleteGerritRow(this);
  });

  // 로컬 스토리지에 데이터 저장
  var storedData = loadGerritData();
  storedData.push({
    nickName: nickName,
    singleIds: singleIds,
  });
  localStorage.setItem("gerritData", JSON.stringify(storedData));

  // 입력 필드 초기화
  document.getElementById("nickName").value = "";
  document.getElementById("singleIds").value = "";
}

function loadGerritTableData() {
  var storedData = loadGerritData();
  var tableBody = document.getElementById("table-body-gerrit");

  storedData.forEach((data) => {
    var newRow = tableBody.insertRow();

    var nickNameCell = newRow.insertCell(0);
    var singleIdsCell = newRow.insertCell(1);
    var actionCell = newRow.insertCell(2);

    nickNameCell.textContent = data.nickName;
    singleIdsCell.textContent = data.singleIds;
    actionCell.innerHTML = '<button class="delete-button">삭제</button>';
    newRow
      .querySelector(".delete-button")
      .addEventListener("click", function () {
        deleteGerritRow(this);
      });
  });
}

function loadGerritData(){
  return JSON.parse(localStorage.getItem("gerritData")) || [];
}

function storeGerritData(target) {
  localStorage.setItem("gerritData", JSON.stringify(target));
}

document.addEventListener("DOMContentLoaded", loadGerritTableData);
