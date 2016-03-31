/*jslint browser: true*/
window.addEventListener("load", function () {
    var _ = require('underscore');
    var data = require('./data');
    var template = _.template(document.getElementById('template').textContent);

    function loadContacts() {
        for (var i = 0; i < data.length; i++) {
            var contactData = template({
                id: data[i].id,
                name: data[i].name,
                phone: data[i].phone,
                email: data[i].email,
                relation: data[i].relation,
                invited: data[i].invited,
            });
            var contact = document.createElement('div');
            contact.classList.add('contacts');
            //Set the ID for this element.
            contact.setAttribute('id', 'contact-' + data[i].id);
            contact.innerHTML = contactData;
            var parent = document.getElementById('contact-display');
            parent.appendChild(contact);
        } /*End of the for-loop*/

        // Makes each contact draggable.
        // It's nested in the loadContacts function
        // to reapply the dragability to the contacts every time 
        // they're recreated.

        $('.contacts').draggable({
            helper: 'clone',
            opacity: 0.50,
            scroll: false,
            revert: true,
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
    var family = document.getElementById('family');
    family.addEventListener('click', function () {
        filterContacts(data, "family");
    });
    var friend = document.getElementById('friend');
    friend.addEventListener('click', function () {
        filterContacts(data, "friend");
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
    
    var searchBox = document.getElementById('search-box');
    searchBox.addEventListener('keyup', function () {
        console.log('');
    });
});
