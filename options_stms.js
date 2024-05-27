const addRowBtn = document.getElementById('add_stms_row_btn');
addRowBtn.onclick = () => {
  console.log('add row clicked');
  addRow();
};

function deleteRow(button) {
  // 현재 버튼이 속한 행을 찾고 삭제
  var row = button.parentNode.parentNode;
  var packageName = row.cells[0].textContent;

  // 로컬 스토리지에서 데이터 삭제
  var storedData = JSON.parse(localStorage.getItem('tableData')) || [];
  storedData = storedData.filter(data => data.packageName !== packageName);
  localStorage.setItem('tableData', JSON.stringify(storedData));

  row.parentNode.removeChild(row);
}

function addRow() {
  // 입력 필드에서 값을 가져옴
  var packageName = document.getElementById('packageName').value;
  var resourcePath = document.getElementById('resourcePath').value;
  var stringsFileName = document.getElementById('stringsFileName').value;

  // 빈 값이 없는지 확인
  if (!packageName || !resourcePath || !stringsFileName) {
      alert('모든 필드를 채워주세요.');
      return;
  }

  // 새로운 행 생성
  var tableBody = document.getElementById('table-body-stms');
  var newRow = tableBody.insertRow();

  var packageCell = newRow.insertCell(0);
  var resourceCell = newRow.insertCell(1);
  var stringsCell = newRow.insertCell(2);
  var actionCell = newRow.insertCell(3);

  packageCell.textContent = packageName;
  resourceCell.textContent = resourcePath;
  stringsCell.textContent = stringsFileName;
  actionCell.innerHTML = '<button class="delete-button">삭제</button>';
  newRow.querySelector('.delete-button').addEventListener('click', function() {
    deleteRow(this);
  });

  // 로컬 스토리지에 데이터 저장
  var storedData = JSON.parse(localStorage.getItem('tableData')) || [];
  storedData.push({ packageName: packageName, resourcePath: resourcePath, stringsFileName: stringsFileName });
  localStorage.setItem('tableData', JSON.stringify(storedData));

  // 입력 필드 초기화
  document.getElementById('packageName').value = '';
  document.getElementById('resourcePath').value = '';
  document.getElementById('stringsFileName').value = '';
}

function loadTableData() {
  var storedData = JSON.parse(localStorage.getItem('tableData')) || [];
  var tableBody = document.getElementById('table-body-stms');

  storedData.forEach(data => {
      var newRow = tableBody.insertRow();

      var packageCell = newRow.insertCell(0);
      var resourceCell = newRow.insertCell(1);
      var stringsCell = newRow.insertCell(2);
      var actionCell = newRow.insertCell(3);

      packageCell.textContent = data.packageName;
      resourceCell.textContent = data.resourcePath;
      stringsCell.textContent = data.stringsFileName;
    actionCell.innerHTML = '<button class="delete-button">삭제</button>';
    newRow.querySelector('.delete-button').addEventListener('click', function() {
      deleteRow(this);
    });
  });
}

document.addEventListener('DOMContentLoaded', loadTableData);