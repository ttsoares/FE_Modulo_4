function getInputValues() {

   let userName = (document.getElementById("userName").value.toLowerCase());
   let passWord = (document.getElementById("passWord").value);

   let test_Username = userName.replace(/\s/g, ''); // remove espaces

   if (test_Username=='' ) {
      var empty = new bootstrap.Modal(document.getElementById('empty_filed'));
      empty.show();
      return
   }
   testCredentials(userName, passWord)
}

async function testCredentials(uName, password) {

  const clockAnim = (document.getElementById("div-clock"))

  clockAnim.classList.remove("invisible");
  clockAnim.classList.add("visible");

  if (uName == 'admin' && password == 'AdmiN') {
    location.href = `./users.html`
  }

  await axios.get(`${url}/pass`, { params: { name: uName, password: password } } )
  .then(function (response) {

    clockAnim.classList.remove("visible");
    clockAnim.classList.add("invisible");

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
