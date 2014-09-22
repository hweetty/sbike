var MAX_GAMES = 10000;
var _games = {};
exports._games = _games;

var io = require('socket.io');

exports.init = function (server)
{
    io = io.listen(server);

    io.sockets.on('connection', function (socket)
    {
        socket.on ("getGameId", function (data)
        {
            var id = exports.genGameId(socket);
            socket.emit("receiveGameId", {gameId:id});
        });
        socket.on ("gameEnded", function (data)
        {
            var gameId = data.gameId;
            _games[gameId] = 0;
        });
    });
}

function Game ()
{
    this.players = [];
    this.gameId = -1;
    this.isPlaying;

    this.init = function(id)
    {
        console.log("created new game with id : " + id);
        this.gameId = id;
    };
    this.startGame = function ()
    {
        this.isPlaying = true;
        console("starting game :" + this.gameId);

        // Go through players
    };
    this.addPhone = function ()
    {
        if (this.players.length >= 4)
            return -1;
        this.players.push(this.players.length);

        if (this.players.length == 4)
            this.socket.emit("startGame", "");

        return this.players.length-1;
    };
    this.sendEvent = function (dict)
    {
        this.socket.emit ("receiveEvent", dict);
        console.log("sent event: ");
        console.log(dict);
    }
}

exports.genGameId = function (socket)
{ 
    var gen = function(){return Math.floor(Math.random()*MAX_GAMES);}
    var id = gen();console.log(id);
    while(_games[id])
        id = gen();

    var game = new Game();

    game.init(id);
    game.socket = socket;  
    _games[id] = game;
    return ""+id;
}
exports.isGamePlaying = function (id)
{
    return _games[id] && _games[id].isPlaying;
}
exports.startGame = function (id)
{
    var game = _games[id];  
    if (game)
        game.startGame();
}

// returns n>=0 if success, n==-1 for fail
exports.addPhoneToGame = function (game)
{
    console.log("all games");
    console.log(_games);
    var game = _games[game];
    if (!game) return -1;
    return game.addPhone();
}

exports.sendEventToGame = function (dict, game)
{
    var game = _games[game];
    if (game)
        game.sendEvent(dict);
}

