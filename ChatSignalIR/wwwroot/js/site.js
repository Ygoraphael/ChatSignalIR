// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();
$("#send").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
    var li = $("<li></li>").text(user + ": " + msg);
    li.addClass("list-group-item");
    $("#messagesList").append(li);
});

connection.start().then(function () {
    $("#send").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

$("#send").on("click", function (event) {
    var user = $("#usuario").val();
    var message = $("#mensagem").val();
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
