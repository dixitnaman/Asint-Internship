let id = "no";

function getCrudData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data = JSON.parse(localStorage.getItem("crud")) || [];
      resolve(data);
    }, 150);
  });
}

function setCrudData(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem("crud", JSON.stringify(data));
      resolve();
    }, 150);
  });
}

async function manageData() {
  document.getElementById("msg").innerHTML = "";
  let task = document.getElementById("task").value.trim();

  if (task === "") {
    document.getElementById("msg").innerHTML = "Please enter a task";
    return;
  }

  let arr = await getCrudData();

  if (id === "no") {
    arr.push(task);
    document.getElementById("msg").innerHTML = "Data added";
  } else {
    arr[id] = task;
    document.getElementById("msg").innerHTML = "Data updated";
    id = "no";
  }

  await setCrudData(arr);
  document.getElementById("task").value = "";
  await selectData();
}

async function selectData() {
  let arr = await getCrudData();
  let html = "";
  arr.forEach((task, index) => {
    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${task}</td>
        <td>
          <a href="javascript:void(0)" onclick="editData(${index})">Edit</a>
          <a href="javascript:void(0)" onclick="deleteData(${index})">Delete</a>
        </td>
      </tr>`;
  });
  document.getElementById("root").innerHTML = html;
}

async function editData(index) {
  let arr = await getCrudData();
  document.getElementById("task").value = arr[index];
  id = index;
}

async function deleteData(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    let arr = await getCrudData();
    arr.splice(index, 1);
    await setCrudData(arr);
    await selectData();
  }
}

selectData();
