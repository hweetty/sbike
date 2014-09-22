// var socket = io.connect('http://localhost:1337');
var socket = io.connect('http://107.170.31.76:1337');

socket.emit("getGameId", "");

socket.on("receiveGameId", function (data)
{
    // var label = document.getElementById("gameIdLabel");
    // label.innerHTML = ""+data.gameId;
    console.log("update"+data);
    console.log(data);
    _gameId = ""+data.gameId;
    document.title = "SBIKE.ca " + _gameId;
});

socket.on("receiveEvent", function (data)
{
    console.log("received event:");
    console.log(data);
    var type = data.type;
    var phoneId = data.phoneId;
    _board.cars[phoneId].setDirection(type);
});


socket.on("startGame", function (data)
{
    console.log("start game");
    _board.countDown();
});

