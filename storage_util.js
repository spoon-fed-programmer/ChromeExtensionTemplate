
function loadGerritData(){
  return JSON.parse(localStorage.getItem("gerritData")) || [];
}

function storeGerritData(target) {
  localStorage.setItem("gerritData", JSON.stringify(target));
}