var updateRowCount = 0;
var rowCount = 1;
// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");

document.addEventListener('DOMContentLoaded', load);

var countryDetails = {

    "DETAILS_ARRAY": []

};
var editCountryId = "";

function load() {

    document.getElementById("tbodyRowDetails").innerHTML = "";
    var table = document.getElementById("tbodyRowDetails");
    var tr = table.insertRow(-1); // Table row
    var sessionCountryDetails = JSON.parse(sessionStorage.getItem("sessionDetails"));
    if (typeof sessionCountryDetails != "undefined" && sessionCountryDetails != null && sessionCountryDetails) {
        for (var i = 0; sessionCountryDetails.DETAILS_ARRAY.length > i; i++) {
            tr = table.insertRow(-1);
            tr.id = "countrytr_" + sessionCountryDetails.DETAILS_ARRAY[i].ID;
            for (var j in sessionCountryDetails.DETAILS_ARRAY[i]) {
                if (j != "ID") {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = sessionCountryDetails.DETAILS_ARRAY[i][j];
                }

                if (j == "DESCRIPTION") {
                    var tabCell = tr.insertCell(-1);
                    tabCell.className = "edit";
                    var editIconField = document.createElement("i");
                    editIconField.className = "fas fa-edit";
                    editIconField.setAttribute("onclick", "editRow(this)");
                    editIconField.id = "edit_" + sessionCountryDetails.DETAILS_ARRAY[i].ID;
                    tabCell.appendChild(editIconField);

                    var tabCell = tr.insertCell(-1);
                    tabCell.className = "delete";
                    var deleteIconField = document.createElement("i");
                    deleteIconField.className = "fas fa-times";
                    deleteIconField.setAttribute("onclick", "delete_row(this)");
                    deleteIconField.id = "delete_" + sessionCountryDetails.DETAILS_ARRAY[i].ID;
                    tabCell.appendChild(deleteIconField);

                }

            }
        }
    } else {

        for (var i = 0; countryDetails.DETAILS_ARRAY.length > i; i++) {
            tr = table.insertRow(-1);
            tr.id = "countrytr_" + countryDetails.DETAILS_ARRAY[i].ID;
            for (var j in countryDetails.DETAILS_ARRAY[i]) {
                if (j != "ID") {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = countryDetails.DETAILS_ARRAY[i][j];
                }
                if (j == "DESCRIPTION") {
                    var tabCell = tr.insertCell(-1);
                    tabCell.className = "edit";
                    var editIconField = document.createElement("i");
                    editIconField.className = "fas fa-edit";
                    editIconField.setAttribute("onclick", "editRow(this)");
                    editIconField.id = "edit_" + countryDetails.DETAILS_ARRAY[i].ID;
                    tabCell.appendChild(editIconField);

                    var tabCell = tr.insertCell(-1);
                    tabCell.className = "delete";
                    var deleteIconField = document.createElement("i");
                    deleteIconField.className = "fas fa-times";
                    deleteIconField.setAttribute("onclick", "delete_row(this)");
                    deleteIconField.id = "delete_" + countryDetails.DETAILS_ARRAY[i].ID;
                    tabCell.appendChild(deleteIconField);

                }


            }
        }
    }

    document.getElementById("countryName").value = "";
    document.getElementById("countryDescription").value = "";
    document.getElementById("tableList").style.display = "block";
    //modal.style.display = "none";

}

function addTasks() {
    /*    var table = document.getElementById("tasksTable");
        var row = table.insertRow(rowCount);
        row.id = 'tableRow_' + rowCount;
        var cell1 = row.insertCell(0);
        cell1.style.textAlign = "center";
        //cell1.style.color="white";
        cell1.id = 'name_' + rowCount;
        var cell2 = row.insertCell(1);
        cell2.style.textAlign = "center";
        //cell2.style.color="white";
        cell2.id = 'desc_' + rowCount;
        var cell3 = row.insertCell(2);
        cell3.style.textAlign = "center";
        //cell3.style.color="white";
        cell1.innerHTML = document.getElementById("countryName").value;
        cell2.innerHTML = document.getElementById("countryDescription").value;
        cell3.innerHTML = '<td><a class=edit id="edit_' + rowCount + '" onclick="editRow(' + rowCount + ')"><i class="fas fa-edit"></i></a></td>&nbsp;&nbsp;<td ><a id=delete_' + rowCount + ' class="delete" onclick="delete_row(' + rowCount + ')"><i class="fas fa-times"></i></a></td>';
        rowCount++;
        document.getElementById("countryName").value = "";
        document.getElementById("countryDescription").value = "";
        document.getElementById("tableList").style.display = "block";
        //modal.style.display = "none";
    	*/
    editCountryId = "";
    var country = document.getElementById("countryName").value;
    var description = document.getElementById("countryDescription").value;
    var data = {};
    data.ID = countryDetails.DETAILS_ARRAY.length + 1;
    data.COUNTRY = country;
    data.DESCRIPTION = description;
    countryDetails.DETAILS_ARRAY.push(data);
    sessionStorage.setItem("sessionDetails", JSON.stringify(countryDetails));
    load();
}

function updateTasks() {

 //   document.getElementById("name_" + updateRowCount).innerHTML = document.getElementById("countryName").value;
  //  document.getElementById("desc_" + updateRowCount).innerHTML = document.getElementById("countryDescription").value;
   // updateRowCount = 0;
   if(editCountryId != ""  && typeof editCountryId != "undefined" && editCountryId != null){
           for (var k = 0; countryDetails.DETAILS_ARRAY.length > k; k++) {
            if (editCountryId == countryDetails.DETAILS_ARRAY[k].ID) {
                countryDetails.DETAILS_ARRAY[k].COUNTRY =  document.getElementById("countryName").value;
                countryDetails.DETAILS_ARRAY[k].DESCRIPTION = document.getElementById("countryDescription").value;
            }
        }
   
   }
    document.getElementById("tableList").style.display = "block";
    document.getElementById("saveButton").style.display = "block";
    document.getElementById("updateButton").style.display = "none";
    document.getElementById("countryName").value = "";
    document.getElementById("countryDescription").value = "";
	sessionStorage.setItem("sessionDetails", JSON.stringify(countryDetails));
	load();
}

function delete_row(_deleteRowId) {
     editCountryId = "";
 
        var getDeleteTdId = _deleteRowId.id.split("_");
    var deleteTdId = parseInt(getDeleteTdId[1]);
    editCountryId = deleteTdId;
	    for (var k = 0; countryDetails.DETAILS_ARRAY.length > k; k++) {
        if (deleteTdId == countryDetails.DETAILS_ARRAY[k].ID) {
                  countryDetails.DETAILS_ARRAY.splice(k, 1);
        }
    }
	sessionStorage.setItem("sessionDetails", JSON.stringify(countryDetails));
    load();
}

function editRow(_countryDetails) {
        var getEditTdId = _countryDetails.id.split("_");
    var editTdId = parseInt(getEditTdId[1]);
    editCountryId = editTdId;
	    for (var k = 0; countryDetails.DETAILS_ARRAY.length > k; k++) {
        if (editTdId == countryDetails.DETAILS_ARRAY[k].ID) {
            document.getElementById("countryName").value = countryDetails.DETAILS_ARRAY[k].COUNTRY;
            document.getElementById("countryDescription").value = countryDetails.DETAILS_ARRAY[k].DESCRIPTION;
        }
    }
   // document.getElementById("countryName").value = document.getElementById("name_" + _rowCount).innerText;
  //  document.getElementById("countryDescription").value = document.getElementById("desc_" + _rowCount).innerText;
  //  updateRowCount = _rowCount;
    document.getElementById("tableList").style.display = "block";
    document.getElementById("saveButton").style.display = "none";
    document.getElementById("updateButton").style.display = "block";
    // modal.style.display = "block";
}

function countryName() {
    var name = document.getElementById("countryName").value;
    var description = document.getElementById("countryDescription").value;
    if (name === "" || description === "") {
        document.getElementById("names").innerHTML = "Please Enter The Country Name And Description";
        document.getElementById("names").style.color = "Red";
    } else {
        document.getElementById("names").innerHTML = "";
        addTasks();
    }
}