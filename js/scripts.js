  var parsedDoc;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture', true);

  xhr.send();

  xhr.onreadystatechange = function() {
    if (this.readyState != 4) {
      return;
    }
    parsedDoc = JSON.parse(xhr.responseText);
    console.log(parsedDoc);  
    drawPeople(sortAbc(parsedDoc.results));
    if (this.status != 200) {
      // обработать ошибку
      alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
      return;
    }
  };

  function drawPeople(results) {
    for (var i = 0; i < results.length; i++) {
      console.log( results[i] );
      var newDiv = document.createElement("div");
      newDiv.dataset.itemIndex = i;
      newDiv.innerHTML = '<img src="' + results[i].picture.medium + '"/>'+ results[i].name.title + ". " + results[i].name.first + " " +  results[i].name.last;
      document.getElementById("personList").appendChild(newDiv);
      
    }
  }

  function sortAbc(result) {
    return result.sort(function(a, b) {
      if (a.name.first + a.name.last > b.name.first + b.name.last)
        return 1;
      if (a.name.first + a.name.last < b.name.first + b.name.last)
        return -1;
      return 0;
    });
  }

  function sortReverse(result) {
    return result.sort(function(a, b) {
      if (a.name.first + a.name.last > b.name.first + b.name.last)
        return -1;
      if (a.name.first + a.name.last < b.name.first + b.name.last)
        return 1;
      return 0;
    });
  }

  function sortWithDirection(ar) {
    document.getElementById("personList").innerHTML = '';
    if (ar.target.value == 'abc') {
      drawPeople(sortAbc(parsedDoc.results));
    } else {
      drawPeople(sortReverse(parsedDoc.results));
    }
  }

  function listItemClicked(ev) {
      var itemIndex = ev.target.dataset.itemIndex;
      if (!(parsedDoc.results[itemIndex])) { //проверки на пустое значение
        itemIndex = ev.target.parentElement.dataset.itemIndex;
      }
      if (parsedDoc.results[itemIndex]) {
          document.getElementById('popupFullText').innerHTML =  '<img src="' + parsedDoc.results[itemIndex].picture.large + '"/> <br>' + parsedDoc.results[itemIndex].location.street + " <br>" + parsedDoc.results[itemIndex].location.city + "<br> " + parsedDoc.results[itemIndex].location.state + "<br> " + parsedDoc.results[itemIndex].phone + " <br>" + parsedDoc.results[itemIndex].email;
          document.getElementById('shadowOfPopup').style.display = 'block';
      }  
  }

  function closePopup() {
      document.getElementById('shadowOfPopup').style.display = 'none';
  }