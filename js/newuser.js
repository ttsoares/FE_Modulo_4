function NewUser() {
  let Username = (document.getElementById("userName").value.toLowerCase());
  let Password1 = (document.getElementById("passWord_1").value);
  let Password2 = (document.getElementById("passWord_2").value);


  let test_Username = Username.replace(/\s/g, ''); // remove spaces

  //The MD5 hash bellow is the result of an empty string for password
  if (test_Username=='') {
    // Empty user fields are not allowed
    const Empty = new bootstrap.Modal(document.getElementById('empty_field'));
    Empty.show();
    return false;
  };

  if ( Password1 !== Password2) {
    // Passwords do not match
    let passModal = new bootstrap.Modal(document.getElementById('passModal'));
    passModal.show()
    return false;
  };

  criaUser(Username, Password1)
}

async function criaUser(Uname, Pass) {
  const ClockAnim = (document.getElementById("div-clock"))

  try {
    ClockAnim.classList.remove("invisible");
    ClockAnim.classList.add("visible");

    await axios.post(`${url}/user`, {name: Uname, pass: Pass});
    ClockAnim.classList.remove("visible");
    ClockAnim.classList.add("invisible");

    const Success = new bootstrap.Modal(document.getElementById('success'));
    Success.show();
    return
  } catch (error) {
    ClockAnim.classList.remove("visible");
    ClockAnim.classList.add("invisible");

    const Failure = new bootstrap.Modal(document.getElementById('user_exists'));
    Failure.show();
    return
  }
}


function logout() {
  nameUser = "";
  sessionStorage.clear();
  id = null;
  location.href = "./index.html";
}

// Function to allow the submission form with ENTER key
(function getEnter() {

  var inPut = document.getElementById("passWord_2");
  inPut.addEventListener("keydown", function(event) {
    const keyName = event.key;

  if (keyName === 'Enter') {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("myBtn").click();
    }
  });
})();
// With this solution one can not press ENTER at the
// user userName or passWord_1 because
// this somehow reset all inputs !
// Even thoug the event listener is attached only to
// the passWord_2 ID !!
// I was unable to fix this...
