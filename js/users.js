// Those 'id' are identifyers at the table's HTML code.
// They allways will be the 'uid' values in the 'uid'
//  colummn at table Messages
let id;

let Username = document.getElementById("userName");
let tagH3 = document.createElement("H1");
tagH3.innerText = "Admin";
Username.appendChild(tagH3);

show_users()

async function show_users () {
  await axios.get(`${url}/users`)
    .then(function (response) {
      html = response.data  // HTML made by backend EJS
    })
    .catch(function (error) {
      console.log("users not found")
    })

    document.getElementById('allusers').innerHTML = html

    // Assign click events to the HTML rows
    const delBtns = document.getElementsByClassName('remove');
    const editBtns = document.getElementsByClassName('edit');
    for (var i=0; i < delBtns.length; i++) {
     delBtns[i].addEventListener('click', remove);
     editBtns[i].addEventListener('click', edit);
    };
}

async function remove() {
  id = this.getAttribute('id');
  id = +id.slice(0,-1) //  remove the "D" from id

  await axios.delete(`${url}/user/${id}`)
    .then(function (response) {
    })
    .catch(function (error) {
      console.log("Erro ao apagar usuário")
    })
  show_users()
}

// Start the edit process by getting user data
async function edit() {
  id = this.getAttribute('id');
  id = +id.slice(0,-1); //  remove the "E" from id

  await axios.get(`${url}/eduser/${id}`)
    .then(function (response) {
      user = response.data
      let Name = user.name;
      let Password = user.password;
      let Edit_Nam = document.getElementById("edNam");
      let Edit_Pas = document.getElementById("edPas");
      Edit_Nam.value = Name;
      Edit_Pas.value = Password;
      let EditModal = new bootstrap.Modal(document.getElementById('editModal'));
      EditModal.show();
  })
  .catch(function (error) {
    console.log("Usuário NÃO encontrado")
  })
}

// Back from the editModal to store new content
async function saveEdit() {
  const Uname = document.getElementById("edNam").value;
  const Passw = document.getElementById("edPas").value;

  // To test if there is no content or are just spaces
  let test_Descri = Uname.replace(/\s/g, '');
  let test_Detail = Passw.replace(/\s/g, '');

  if (test_Detail =='' || test_Descri == '') {

    const Empty = new bootstrap.Modal(document.getElementById('empty_filed'));
    Empty.show();

  } else {
    await axios.put(`${url}/user/${id}`, {
      name: Uname,
      password: Passw
    })
      .then(function (response) {
        backUser = response.data
        console.log(backUser)
      })
      .catch(function (error) {
        console.log("Erro ao editar usuário")
      })
  }
  // To clear the inputs for new contet
  Uname.value = '';
  Passw.value = '';

  show_users();
}

function logout() {
  nameUser = "";
  sessionStorage.clear();
  id = null;
  location.href = "./index.html";
}
