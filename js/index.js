// Get username and password
function getInputValues() {

  //let userName = (document.getElementById("userName").value.toLowerCase());
   let userName = (document.getElementById("userName").value);
   let passWord = (document.getElementById("passWord").value);

   let test_Username = userName.replace(/\s/g, ''); // remove espaces

   if (test_Username=='' ) {
      var empty = new bootstrap.Modal(document.getElementById('empty_filed'));
      empty.show();
      return
   }
   testCredentials(userName, passWord)
}

// Test correct paring of username / password
async function testCredentials(uName, password) {

  const clockAnim = (document.getElementById("div-clock"))

  clockAnim.classList.remove("invisible");
  clockAnim.classList.add("visible");

  // Go to 'Admin'mode to access the users RUD
  if (uName == 'admin' && password == 'AdmiN') {
    const token = "667072b391f95350d140c6353216a64c";
    sessionStorage.setItem("token", token);
    location.href = `./users.html`
  }

  //If user/pass are OK BE returns userID
  await axios.get(`${url}/pass`, { params: { name: uName, password: password } } )
  .then(function (response) {

    clockAnim.classList.remove("visible");
    clockAnim.classList.add("invisible");

    // Token to prevem the direct access of messagens without login
    const token = md5(`${uName}${response.data}`);
    sessionStorage.setItem("token", token);

    // Call Messagens page with user 'uid' and 'name'
    location.href = `./messages.html?${response.data}|${uName}`;

  })
  .catch(function (error) {
    clockAnim.classList.remove("visible");
    clockAnim.classList.add("invisible");

    var credentials = new bootstrap.Modal(document.getElementById('credentials'));
    credentials.show();
  })
}


// Function to allow the submission form with ENTER key
(function getEnter() {
  var inPut = document.getElementById("passWord");

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
// userName because this somehow reset this input content !
// Even thoug the event listener is attached only to
// the passWord ID !!
// I was unable to fix this...
