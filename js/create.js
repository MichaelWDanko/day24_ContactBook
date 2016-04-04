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

// Form Validation

  var nameSearchBox = document.getElementById('name');
  nameSearchBox.addEventListener('keyup', function(){
    var searchIt = nameSearchBox.value;
    var searchName = new RegExp('^([a-zA-Z]{2,})+[-]?[a-zA-Z]*[ ]*[a-zA-Z]*$');
      if(searchName.test(nameSearchBox.value)){
        console.log(searchName.test(searchIt));
        return true;
      }
  });

  var phoneSearchBox = document.getElementById('phone');
    phoneSearchBox.addEventListener('keyup', function(){
      var searchNum = phoneSearchBox.value;
      var phoneSearch = new RegExp('^([0-9]{10})+$');
      if (phoneSearch.test(phoneSearchBox)){
        console.log(searchNum.test(searchNum.value));
        return true;
      }else {
        return false;
      }
  });

  var emailSearchBox = document.getElementById('email');
    emailSearchBox.addEventListener('keyup', function(){
      var searchEmail = emailSearchBox.value;
      var re = '^([0-9a-zA-Z]([\-\_\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([\-\_\.]*[A-Za-z0-9]+)*)\.([a-zA-Z]{2,9})$';
      if (re.test(searchEmail)){
        return true;
      }else{
        return false;
      }
});
});
