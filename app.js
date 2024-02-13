function removeItem(item) {
  item.parentNode.removeChild(item);
  saveChecklist();
}

function loadChecklist() {
  var savedItems = localStorage.getItem('checklistItems');
  if (savedItems) {
      document.getElementById('checkList').innerHTML = savedItems;
      
      var items = document.querySelectorAll('#checkList li');
      items.forEach(function(item) {
          item.addEventListener('click', function() {
              this.classList.toggle('checked');
              saveChecklist(); 
          });
          item.addEventListener('contextmenu', function(e) {
              e.preventDefault();
              removeItem(item);
          });
      });
  }
}

function saveChecklist() {
  var items = document.getElementById('checkList').innerHTML;
  localStorage.setItem('checklistItems', items);
}

function addItem() {
  var input = document.getElementById("newItem").value;
  if (input === '') {
      alert("Please enter an item!");
  } else {
      var ul = document.getElementById("checkList");
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(input));
      
      li.style.fontSize = "20px";
      li.style.fontFamily = "'Papyrus', Fantasy";
      li.style.fontWeight = "bold";
      li.style.textShadow = "0 0 10px #FF0000, 0 0 10px #0000FF";
      
      li.onclick = function() {
          this.classList.toggle('checked');
          saveChecklist();
      };
      li.addEventListener('contextmenu', function(e) {
          e.preventDefault();
          removeItem(li);
      });
      ul.appendChild(li);
      document.getElementById("newItem").value = "";
      saveChecklist();
  }
}

window.onload = function() {
  loadChecklist();
};