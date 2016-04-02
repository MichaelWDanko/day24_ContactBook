/*jslint browser: true*/
window.addEventListener("load", function () {
    var _ = require('underscore');
    var data = require('./data');
    var template = _.template(document.getElementById('template').textContent);
    var Firebase = require('firebase');

    function loadContacts() {
        /*This is the Firebase request for data*/
        var fbPull = new Firebase('https://tiycontactapp.firebaseio.com/contacts/');
        fbPull.once('value', function (hedgehog) {
            var fbContacts = hedgehog.val();
            console.log('The return of fbContact is: ');
            console.log(fbContacts);
            console.log(fbContacts.length);
            console.log(fbContacts[0]);
            console.log(fbContacts[1]);
            console.log(fbContacts[2]);


            for (var i = 1; i < fbContacts.length; i++) {
                var contactData = template({
                    id: fbContacts[i].id,
                    name: fbContacts[i].name,
                    phone: fbContacts[i].phone,
                    email: fbContacts[i].email,
                    relation: fbContacts[i].relation,
                    invited: fbContacts[i].invited,
                });
                var contact = document.createElement('div');
                contact.classList.add('contacts');
                //Set the ID for this element.
                contact.setAttribute('id', 'contact-' + fbContacts[i].id);
                contact.innerHTML = contactData;
                var parent = document.getElementById('contact-display');
                parent.appendChild(contact);
            } /*End of for loop. Include this when commenting out the for Loop*/
            $('.contacts').draggable({
                helper: 'clone',
                opacity: 0.50,
                scroll: false,
                revert: true,
            });
        });

    } /*End of the loadContacts function*/

    function clearContacts() {
        var myNode = document.getElementById("contact-display");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    } /*End of the clearContacts function*/

    function filterContacts(data, relation) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].relation === relation) {
                var hit = document.getElementById('contact-' + data[i].id);
                hit.classList.remove('hidden');
            } else {
                var miss = document.getElementById('contact-' + data[i].id);
                miss.classList.add('hidden');
            }
        }
    } /*End of the filterContacts function*/

    // Make radio buttons do something.
    var teammate = document.getElementById('teammate');
    teammate.addEventListener('click', function () {
        filterContacts(data, "Teammate");
        /*INSERT A STRING FOR THE FIRST RELATION*/
    });
    var classmate = document.getElementById('classmate');
    classmate.addEventListener('click', function () {
        filterContacts(data, "Classmate");
        /*INSERT A STRING FOR THE SECOND RELATION*/
    });
    // Gives the functionality to the All button.
    var all = document.getElementById('all');
    all.addEventListener('click', function () {
        for (var i = 0; i < data.length; i++) {
            var hit = document.getElementById('contact-' + data[i].id);
            hit.classList.remove('hidden');
        }
    });
    /*Anything above this is to establish functions.*/

    loadContacts(); /*Initial load of each contact*/
    $('#invited').droppable({
        drop: function (event, ui) {
            //Function to run after being dropped
            console.log('Dropped into Invited!');
            var id = parseInt(ui.draggable.attr('id').substr(8));
            console.log('The ContactId number is: ' + id);
            var droppedId = document.getElementById(id);
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    console.log('Before: ' + data[i].invited);
                    data[i].invited = "yes";
                    console.log('After: ' + data[i].invited);
                    clearContacts();
                    loadContacts();
                }
            }
        },
        /*End of the function being run when dropped.*/
        tolerance: 'pointer',
        hoverclass: "trip-fields-hover",
    });
    $('#not-invited').droppable({
        drop: function (event, ui) {
            //Function to run after being dropped
            console.log('Dropped into Not Invited!');
            var id = parseInt(ui.draggable.attr('id').substr(8));
            console.log('The ContactId number is: ' + id);
            var droppedId = document.getElementById(id);
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    console.log('Before: ' + data[i].invited);
                    data[i].invited = "no";
                    console.log('After: ' + data[i].invited);
                    clearContacts();
                    loadContacts();
                }
            }
        },
        /*End of the function being run when dropped.*/
        tolerance: 'pointer',
        hoverclass: "trip-fields-hover",
    });
    $('#add-teammate').droppable({
        drop: function (event, ui) {
            console.log('Dropped into "Status: Teammate"');
            var id = parseInt(ui.draggable.attr('id').substr(8));
            console.log('The ContactID number is: ' + id);
            var droppedId = document.getElementById(id);
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    console.log('Before: ' + data[i].relation);
                    data[i].relation = "Teammate";
                    console.log('After: ' + data[i].relation);
                    clearContacts();
                    loadContacts();
                }
            }
        }
    });
    $('#add-classmate').droppable({
        drop: function (event, ui) {
            console.log('Dropped into "Status: Teammate"');
            var id = parseInt(ui.draggable.attr('id').substr(8));
            console.log('The ContactID number is: ' + id);
            var droppedId = document.getElementById(id);
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    console.log('Before: ' + data[i].relation);
                    data[i].relation = "Classmate";
                    console.log('After: ' + data[i].relation);
                    clearContacts();
                    loadContacts();
                }
            }
        }
    });


    var searchBox = document.getElementById('search-field');
    searchBox.addEventListener('keyup', function () {
        var searchTerm = searchBox.value;
        console.log(searchTerm);
        var testPattern = new RegExp(searchTerm);

        for (var i = 0; i < data.length; i++) {
            var el = document.getElementById('contact-' + data[i].id);
            console.log(el);
            if (testPattern.test(data[i].name)) {
                /*True*/
                el.classList.remove('hidden');
                console.log("Passed: " + data[i].name);
            } else {
                /*False*/
                el.classList.add('hidden');
                console.log("Failed: " + data[i].name);
            }
        }

        /*Search through my array and match the regular expression*/
    });
});
