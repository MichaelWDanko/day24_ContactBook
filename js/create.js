var Firebase = require('firebase');

function contactCreated(invited, name, phone, email, relation) {
  this.id = Math.round(Math.random() * 10000);
  this.invited=invited;
  this.name = name;
  this.phone = phone;
  this.email = email;
  this.relation=relation;

  return this;
}

window.addEventListener('load', function() {
  var submitButton = document.getElementById('button2');
  button2.addEventListener('click', function() {
    console.log('clicked');
    var invitedSubmit=" ";
    var nameSubmit = document.getElementById('name').value;
    var phoneSubmit = document.getElementById('phone').value;
    var emailSubmit = document.getElementById('email').value;
    var relationSubmit =" ";

    var newContact = new contactCreated(invitedSubmit, nameSubmit, phoneSubmit, emailSubmit, relationSubmit);
    console.log(newContact);

    var fireBuring = new Firebase('https://tiycontactapp.firebaseio.com/contacts/' + newContact.id);
    fireBuring.set(newContact, function() {
      console.log('Contact has been submitted');
    });
  });

  var pull = new Firebase('https://tiycontactapp.firebaseio.com/contacts/');
  pull.once('value', function(countIt) {
    console.log(countIt.val());
  });
});
