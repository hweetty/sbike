
_config = {
    size:10
};

NORTH = 2;
EAST  = 1;
SOUTH = -2;
WEST  = -1;

_num_collided = 0;

var Car = cc.Layer.extend (
{
	id: -1,
	dir:-1,
	x:-1,
	y:-1,
	alive:true,
	board:-1,
    trails:-1,
    colour:-1,
    trailColour:-1,

    init:function (id, direction, posn_x, posn_y, board, colour) {
        _car = this;
        this._super();
        this.id = id;
        this.dir = direction;
        this.x = posn_x;
        this.y = posn_y;
        this.board = board;
        this.trails = [];

        this.colour = colour;
        this.trailColour = cc.c4f(colour.r, colour.g, colour.b, 0.35);

        return true;
    },
    
    setDirection:function(str_dir) {
        if (this.alive){
            if (str_dir =="left" && Math.abs(this.dir) != 1){
                this.dir = -1;
                }
            else if (str_dir == "right" && Math.abs(this.dir)!= 1){
                this.dir = 1;
                }
            else if (str_dir == "up" && Math.abs(this.dir)!= 2){
                this.dir = 2;
                }
            else if (str_dir == "down" && Math.abs(this.dir) != 2) {
                this.dir = -2;
                }
            }
            // this.move();
    },
    
    move:function()
    {
        if (!this.alive)
            return;
        
        this.trails.push (cc.p(this.x, this.y));

        if (this.dir==-1){
            this.x-=_config.size;
        }
        else if (this.dir==-2){
            this.y-=_config.size;
        }
        else if (this.dir==2){
            this.y+=_config.size;
        }
        else if (this.dir==1){
            this.x+=_config.size;
        }

        var b = this.board.board;
        if (this.x <= 1 || this.x >= b[0].length-2 ||
            this.y <= 1 || this.y >= b.length-2)
        {
            this.killed();
        }
        else if (b[this.y][this.x] >= 0)
            this.killed();
        else
            b[this.y][this.x] = this.id;
    },
    killed:function() {
        if (this.alive)
            cc.log("Player " + this.id + " is dead.");
        this.alive = false;
        this.dir = 0;
        _num_collided ++;

        if (_num_collided == 4)
        {

            var i = this.id;

            if (i == 0)
                alert("GG - Red Wins!");
            else if (i == 1)
                alert("GG - Green Wins!");
            else if (i == 2)
                alert("GG - Purple Wins!");
            else if (i == 3)
                alert("GG - Yellow Wins!");
        }
    },

    draw:function ()
    {
        for (var i = 0; i < this.trails.length; i ++)
        {
            var p = this.trails[i];
            cc.drawingUtil.drawSolidRect(cc.p(p.x, p.y),
                cc.p(p.x+_config.size, p.y+_config.size), this.trailColour);
        }

            cc.drawingUtil.drawSolidRect(cc.p(this.x, this.y),
                cc.p(this.x+_config.size, this.y+_config.size), this.colour);
    }
});



function left() {
    console.log("left");
    _car.setDirection("left");
}
function up() {
    console.log("up");
    _car.setDirection("up");
}
function right() {
    console.log("right");
    _car.setDirection("right");
}
function down() {
    console.log("down");
    _car.setDirection("down");
}

// var mycar = new Car();
// mycar.init();
