let count = 0;
const rows = [];
let edit_count = false;
// load when program starts.
function onload() {
  document
    .getElementById("Add_Save_button")
    .addEventListener("click", () => generateRow());
}

function generateRow() {
  if (document.getElementById("input_name").value == "") {
    alert("Enter Name.");
  } else if (document.getElementById("input_city").value == "") {
    alert("Enter City.");
  } else if (document.getElementById("input_fees").value == "") {
    alert("Enter Fees.");
  } else if (!edit_count) {
    count++;
    const name = document.getElementById("input_name").value.trim();
    const city = document.getElementById("input_city").value.trim();
    const fees = document.getElementById("input_fees").value.trim();
    const table = document.getElementById("main_table");
    rows.push({
      count: count,
      name: name,
      city: city,
      fees: fees,
    });
    const row = `
        <tr>
            <td style="border: 0.5px solid black;">${count}</td>
            <td style="border: 0.5px solid black;">${name}</td>
            <td style="border: 0.5px solid black;">${city}</td>
            <td style="border: 0.5px solid black;">${fees}</td>
            <td style="border: 0.5px solid black;">
                <input type="button" class="edit" value="Edit" onclick="editRow(${count})"/>
                <input type="button" id="delete_${
                  table.rows.length - 1
                }" onclick="deleteRow(this)" value="Delete" />
            </td>
        </tr>
    `;
    table.innerHTML += row;
    document.getElementById("input_name").value = "";
    document.getElementById("input_city").value = "";
    document.getElementById("input_fees").value = "";

    totalFees();
    totalStudents();
    nameStartsWithR();
    cityNameOf4thStudent();
    feesOf3And5Student();
    feeBtwn();
    fee2();
    func8();
    func9();
    minMaxFees();
  }
}

function updateRow(i) {
  if (edit_count) {
    rows[i].name = document.getElementById("input_name").value.trim();
    rows[i].city = document.getElementById("input_city").value.trim();
    rows[i].fees = document.getElementById("input_fees").value.trim();
    console.log("after edit: ", rows);
  }
  edit_count = false;
  display();
}
function editRow(e) {
  edit_count = true;
  let i = parseInt(e) - 1;

  document.getElementById("input_name").value = rows[i].name;
  document.getElementById("input_city").value = rows[i].city;
  document.getElementById("input_fees").value = rows[i].fees;
  document
    .getElementById("Add_Save_button")
    .addEventListener("click", () => updateRow(i));
}

function deleteRow(e) {
  console.log("before: ", rows);

  let edit = e.parentElement.parentElement;
  count--;
  e.closest("tr").remove();
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].name == edit.cells[1].innerHTML) {
      rows.splice(i, 1);
    }
  }
  for (let i = 0; i < rows.length; i++) {
    rows[i].count = i + 1;
  }
  console.log("after: ", rows);
  display();
  document.getElementById("input_name").value = "";
  document.getElementById("input_city").value = "";
  document.getElementById("input_fees").value = "";
}

// displays the function.
function display() {
  const table = document.getElementById("main_table");
  table.innerHTML = "";
  for (let i = 0; i < rows.length; i++) {
    table.innerHTML += `
        <tr>
            <td style="border: 0.5px solid black;">${rows[i].count}</td>
            <td style="border: 0.5px solid black;">${rows[i].name}</td>
            <td style="border: 0.5px solid black;">${rows[i].city}</td>
            <td style="border: 0.5px solid black;">${rows[i].fees}</td>
            <td style="border: 0.5px solid black;">
                <input type="button" class="edit" value="Edit" onclick="editRow(${count})"/>
                <input type="button" id="delete_${
                  table.rows.length - 1
                }" onclick="deleteRow(this)" value="Delete" />
            </td>
        </tr>
    `;
  }
  document.getElementById("input_name").value = "";
  document.getElementById("input_city").value = "";
  document.getElementById("input_fees").value = "";
  totalFees();
  totalStudents();
  nameStartsWithR();
  cityNameOf4thStudent();
  feesOf3And5Student();
  feeBtwn();
  fee2();
  func8();
  func9();
  minMaxFees();
}

function totalFees() {
  let totalFees = rows.reduce((sum, val) => sum + parseFloat(val.fees), 0);
  document.getElementById("totalFee").innerHTML = totalFees;
}

function totalStudents() {
  document.getElementById("totalStudent").innerHTML = count;
}

function nameStartsWithR() {
  let arr = rows.filter((val) => val.name.startsWith("R"));
  document.getElementById("R").innerHTML = arr.length;
}

function cityNameOf4thStudent() {
  if (rows.length > 3) {
    document.getElementById("cityName4").innerHTML = rows[3].name;
  }
}

function feesOf3And5Student() {
  if (rows.length > 4) {
    document.getElementById("fee1").innerHTML =
      parseInt(rows[2].fees) + parseInt(rows[4].fees);
  } else if (rows.length < 5 && rows[2]) {
    document.getElementById("fee1").innerHTML = parseInt(rows[2].fees);
  }
}

function feeBtwn() {
  let arr = rows.filter(
    (val) => parseInt(val.fees) > 2000 && parseInt(val.fees) < 3900
  );
  document.getElementById("feebtwn").innerHTML = arr.length;
}

function fee2() {
  let arr = rows.filter((val) => parseInt(val.fees) < 1000);
  document.getElementById("fee2").innerHTML = arr.length;
}

function func8() {
  let arr = rows.filter(
    (val) => val.name.startsWith("S") && val.city.startsWith("Ch")
  );
  document.getElementById("SCh").innerHTML = arr.length;
}

function func9() {
  let arr = rows.filter(
    (val) => val.name.startsWith("J") || val.city.startsWith("H")
  );
  document.getElementById("JH").innerHTML = arr.length;
}

function minMaxFees() {
  let lowest = 0;
  let highest = 0;
  let arr = [];
  for (let i = 0; i < rows.length; i++) {
    arr.push(parseInt(rows[i].fees));
  }
  arr = arr.sort();
  if (arr.length == 1) {
    lowest = arr[0];
  }
  lowest = arr[0];
  highest = arr[arr.length - 1];
  document.getElementById(
    "minMax"
  ).innerHTML = `Min fees = ${lowest} and Max fees = ${highest}`;
}
