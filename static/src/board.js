
var COLOURS = [
cc.c4f(1, 0, 0, 1),
cc.c4f(0, 1, 0, 1),
cc.c4f(1, 0, 1, 1),
cc.c4f(250/255, 225/255, 25/255, 1),
];

var _a = 1;
var COLOURS2 = [
cc.c4f(1, 0, 0, _a),
cc.c4f(0, 1, 0, _a),
cc.c4f(1, 0, 1, _a),
cc.c4f(250/255, 225/255, 25/255, _a),
];
_play = false;
_countDown = 4;

// COLOURS = [
// cc.c4f(234/255, 82/255, 155/255,1),
// cc.c4f(249/255, 151/255, 28/255,1),
// cc.c4f(0/255.0, 115/255.0, 208/255.0,1),
// cc.c4f(88/255, 6/255, 140/255,1)
// ];

var Board = cc.Layer.extend (
{
    cars:-1,
    board:-1,
    size:-1,
    toDraw:[],

    init:function (size) {
        _board = this;


        this.size = size;

        // Create board
        this.board = [];
        for (var y = 0; y < size.height; y++)
        {
            var arr = [];
            for (var x = 0; x < size.width; x++)
            {
                arr.push(-1);
            }

            this.board.push(arr);
        }

        this.x = 0;
        this.y = 0;

        this.cars = [];


        for (var i = 0; i < 4; i ++)
        {
            // var x = Math.floor(Math.random()*this.size.width);
            // var y = Math.floor(Math.random()*this.size.height);
            var car = new Car();
 var x = [200, 210, 220, 230];

var dir = [WEST,NORTH,SOUTH,EAST];

            car.init(i, dir[i], 180+x[i], 32+x[i], this, COLOURS[i]);
            //id, direction, posn_x, posn_y, board);
            this.cars.push (car);
        }

        var schedule = cc.Director.getInstance().getScheduler();
        schedule.scheduleCallbackForTarget(this,this.update,0.20);
        return true;
    },

    update:function (tick)
    {
        for (var i = 0; i < this.cars.length; i ++)
        {
           if(_play)
                this.cars[i].move();
        }

    },

    countDown:function()
    {
        _countDown = 4;
        var myVar=setInterval(function(){myTimer()},1000);
        function myTimer()
        {console.log("count: " + _countDown)
            _countDown--;
            if (_countDown < 0)
            {
                _play = true;
                clearInterval(myVar);
            }
        }
    },

    draw:function ()
    {
         var s = this.size;
///
         cc.drawingUtil.drawSolidRect(cc.p(0, 0),
          cc.p(this.size.width, this.size.height), cc.c4f(1,1,1, 0.8));

         cc.drawingUtil.drawSolidRect(cc.p(_config.size, _config.size),
          cc.p(this.size.width-_config.size, this.size.height-_config.size), cc.c4f(1,1,1, 1));
        // // cc.log(this.toDraw);
        // for (var i = 0; i < this.toDraw.length; i++)
        // {
        //     var p = this.toDraw[i];
        //     cc.drawingUtil.drawSolidRect(cc.p(p.x, p.y),
        //   cc.p(p.x+_config.size, p.y+_config.size), cc.c4f(0, 0, 0, 1));
        // }

        // Draw cars
        for (var i = 0; i < this.cars.length; i ++)
        {
            var car = this.cars[i];
            car.draw();
          //   cc.drawingUtil.drawSolidRect(cc.p(car.x, car.y),
          // cc.p(car.x+_config.size, car.y+_config.size), cc.c4f(0, 1, 0, 1));
        }


        // Draw initial screen
        var w = this.size.width;
        var h = this.size.height;
        if (_countDown>=0)
        {
         cc.drawingUtil.drawSolidRect(cc.p(0, 0),
          cc.p(w/2, h/2), COLOURS2[3]);
        }
        if (_countDown>=1)
        {
         cc.drawingUtil.drawSolidRect(cc.p(w/2, 0),
          cc.p(w, h/2), COLOURS2[2]);
        }
        if (_countDown>=2)
        {
         cc.drawingUtil.drawSolidRect(cc.p(w/2, h/2),
          cc.p(w, h), COLOURS2[1]);
        }
        if (_countDown>=3)
        {
         cc.drawingUtil.drawSolidRect(cc.p(0, h/2),
          cc.p(w/2, h), COLOURS2[0]);
        }
if (_countDown >= 0)

         cc.drawingUtil.drawSolidRect(cc.p(0, 0),
          cc.p(this.size.width, this.size.height), cc.c4f(1,1,1, 0.8));



    }

});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Board();
        var size = cc.Director.getInstance().getWinSize();
        layer.init(size);
        this.addChild(layer);
    }
});

