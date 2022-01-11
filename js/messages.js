const queryString = location.search.substring(1);
const parms = queryString.split("|");

let Uindice = parms[0]
let nameUser = parms[1]

let messages = []
// Those 'id' are identifyers at the table's HTML code.
// They allways will be the 'uid' values in the 'uid'
//  colummn at table Messages
let id;

const UPname = nameUser[0].toUpperCase() + nameUser.slice(1);
let Username = document.getElementById("userName");
let tagH3 = document.createElement("H1");
tagH3.innerText = nameUser;
Username.appendChild(tagH3);

show_msgs()

// Show all messages form an user
// Render the HTML code to create the table with messages
async function show_msgs () {
  await axios.get(`${url}/usermsgs/${Uindice}`)
    .then(function (response) {
      html = response.data  // HTML made by backend EJS
    })
    .catch(function (error) {
      console.log("Messages not found")
    })

    document.getElementById('messages').innerHTML = html

    // Assign click events to the HTML rows
    const delBtns = document.getElementsByClassName('remove');
    const editBtns = document.getElementsByClassName('edit');
    for (var i=0; i < delBtns.length; i++) {
     delBtns[i].addEventListener('click', remove);
     editBtns[i].addEventListener('click', edit);
    };
}

async function remove() {
  // get the content (number) to fill variable 'id' using 'id' at the HTML
  // this will be the same 'id' in the SQL table 'uid' colummn
  id = this.getAttribute('id');
  id = +id.slice(0,-1) //  remove the "D" from id

  console.log("-----------------------------");
  console.log(id)

  await axios.delete(`${url}/user/${Uindice}/message/${id}`)
    .then(function (response) {
    })
    .catch(function (error) {
      console.log("Delete message error")
    })

  show_msgs()
}

// start edition process
// get the content (number) to fill variable 'id' using 'id' at the HTML
// this will be the same 'id' in the SQL table 'uid' colummn
async function edit() {
  id = this.getAttribute('id');
  id = +id.slice(0,-1); //  remove the "E" from id

  await axios.get(`${url}/user/${Uindice}/message/${id}`)
    .then(function (response) {
      mess = response.data

      let Description = mess.description;
      let Details = mess.details;

      const Edit_Des = document.getElementById("edDes");
      const Edit_Det = document.getElementById("edDet");

      Edit_Des.value = Description;
      Edit_Det.value = Details;

      var EditModal = new bootstrap.Modal(document.getElementById('editModal'));
      EditModal.show();
  })
  .catch(function (error) {
    console.log("Messages not found")
  })
}

// Back from the editModal to store new content
async function saveEdit() {
  const Descri = document.getElementById("edDes").value;
  const Detail = document.getElementById("edDet").value;

  // To test if there is no content or are just spaces
  let test_Descri = Descri.replace(/\s/g, '');
  let test_Detail = Detail.replace(/\s/g, '');

  if (test_Detail =='' || test_Descri == '') {

    const Empty = new bootstrap.Modal(document.getElementById('empty_filed'));
    Empty.show();

  } else {
    await axios.put(`${url}/user/${Uindice}/message/${id}`, {
      description: Descri,
      details: Detail
    })
      .then(function (response) {
        messages = response.data
      })
      .catch(function (error) {
        console.log("edit message error")
      })
    //return messages
  }
  show_msgs();
}

// Store new messages
async function saveData() {
  const Descri = document.getElementById("desCrip");
  const Detail = document.getElementById("detAil");
  //Separation to be able to clean the fields for new content at the end
  let DescriNew = Descri.value;
  let DetailNew = Detail.value;
  // Remove spaces
  const test_Descri = DescriNew.replace(/\s/g, '');
  const test_Detail = DetailNew.replace(/\s/g, '');

  if (test_Detail =='' || test_Descri == '') {
    const Empty = new bootstrap.Modal(document.getElementById('empty_filed'));
    Empty.show();
    return
  } else {
    await axios.post(`${url}/addusermsg/${Uindice}`, {
      description: DescriNew,
      details: DetailNew
    })
      .then(function (response) {
        messages = response.data
      })
      .catch(function (error) {
        console.log("message or user not found")
      })
    }

  // To clear the inputs for new contet
  Descri.value = '';
  Detail.value = '';
  show_msgs();
}

function logout() {
  nameUser = "";
  sessionStorage.clear();
  id = null;
  location.href = "./index.html";
}
