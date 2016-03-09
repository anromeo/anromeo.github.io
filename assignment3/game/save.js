
// window.onload = function () {

//     var socket = io.connect("http://76.28.150.193:8888");

//     var saveButton = document.getElementById("save");

//     var loadButton = document.getElementById("load");

//     socket.on("connect", function () {
//         console.log("Socket connected.")
//     });

//     saveButton.
//     socket.emit("send",  { studentname: "Tony Zullo", statename: "trythis" });
//     // socket.on("ping", function (ping) {
//     //     console.log(ping);
//     //     socket.emit("pong");
//     // });

//     // socket.on('sync', function (data) {
//     //     console.log(data.length +" messages synced.");
//     //     messages = data;
//     //     var html = '';
//     //     for (var i = 0; i < messages.length; i++) {
//     //         html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
//     //         html += messages[i].message + '<br />';
//     //     }
//     //     content.innerHTML = html;
//     //     content.scrollTop = content.scrollHeight;
//     // });

//     // socket.on('message', function (data) {
//     //     if (data.message) {
//     //         messages.push(data);
//     //         var html = '';
//     //         for (var i = 0; i < messages.length; i++) {
//     //             html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
//     //             html += messages[i].message + '<br />';
//     //         }
//     //         content.innerHTML = html;
//     //         content.scrollTop = content.scrollHeight;
//     //     } else {
//     //         console.log("There is a problem:", data);
//     //     }
//     // });

//     // field.onkeydown = function (e) {
//     //     if (e.keyCode == 13) {
//     //         var text = field.value;
//     //         var name = username.value;
//     //         socket.emit('send', { message: text, username: name });
//     //         field.value = "";
//     //     }
//     // };

//     // socket.on("connect", function () {
//     //     console.log("Socket connected.")
//     // });
//     socket.on("disconnect", function () {
//         console.log("Socket disconnected.")
//     });

// };