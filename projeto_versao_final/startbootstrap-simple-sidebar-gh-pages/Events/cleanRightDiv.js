function cleanRightDiv(){
  let rightDiv = document.getElementById("right-div");
  while (rightDiv.firstChild) {
    rightDiv.removeChild(rightDiv.firstChild);
  }
}
