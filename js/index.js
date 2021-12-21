function getInputValues() {

   let Username = (document.getElementById("userName").value.toLowerCase());
   let Password = (document.getElementById("passWord").value);

   let test_Username = Username.replace(/\s/g, ''); // remove espaces

   if (test_Username=='' ) {
      var Empty = new bootstrap.Modal(document.getElementById('empty_filed'));
      Empty.show();
      return
   }
   testCredentials(Username, Password)
}

async function testCredentials(Uname, Pass) {

  const ClockAnim = (document.getElementById("div-clock"))

  ClockAnim.classList.remove("invisible");
  ClockAnim.classList.add("visible");

  await axios.put(`${url}/pass`, {name: Uname, pass: Pass})
  .then(function (response) {

    ClockAnim.classList.remove("visible");
    ClockAnim.classList.add("invisible");

    indice_user = response.data
    //sessionStorage.setItem("indice", indice_user);
    //sessionStorage.setItem("name", Uname);

    location.href = `./messages.html?${indice_user}|${Uname}`;

  })
  .catch(function (error) {
    ClockAnim.classList.remove("visible");
    ClockAnim.classList.add("invisible");

    var Credentials = new bootstrap.Modal(document.getElementById('credentials'));
    Credentials.show();
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
