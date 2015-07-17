// This class serves as the foundation for javascript applications that
// build upon the html5 canvas. The canvas to use is specified in the 
// class constructor by canvasname parameter.

/*


 #####  Color Palette by Paletton.com
 #####  Palette URL: http://paletton.com/#uid=72Z0u0kllllaCvbfZqgqyghwabv


 *** Primary color:

 shade 0 = #28794C = rgb( 40,121, 76) = rgba( 40,121, 76,1)
 shade 1 = #76B190 = rgb(118,177,144) = rgba(118,177,144,1)
 shade 2 = #4B956B = rgb( 75,149,107) = rgba( 75,149,107,1)
 shade 3 = #105C31 = rgb( 16, 92, 49) = rgba( 16, 92, 49,1)
 shade 4 = #00411C = rgb(  0, 65, 28) = rgba(  0, 65, 28,1)

 *** Secondary color (1):

 shade 0 = #27556C = rgb( 39, 85,108) = rgba( 39, 85,108,1)
 shade 1 = #6C8D9D = rgb(108,141,157) = rgba(108,141,157,1)
 shade 2 = #467084 = rgb( 70,112,132) = rgba( 70,112,132,1)
 shade 3 = #113D52 = rgb( 17, 61, 82) = rgba( 17, 61, 82,1)
 shade 4 = #03283A = rgb(  3, 40, 58) = rgba(  3, 40, 58,1)

 *** Secondary color (2):

 shade 0 = #AA7539 = rgb(170,117, 57) = rgba(170,117, 57,1)
 shade 1 = #F8D2A6 = rgb(248,210,166) = rgba(248,210,166,1)
 shade 2 = #D1A169 = rgb(209,161,105) = rgba(209,161,105,1)
 shade 3 = #825016 = rgb(130, 80, 22) = rgba(130, 80, 22,1)
 shade 4 = #5C3100 = rgb( 92, 49,  0) = rgba( 92, 49,  0,1)

 *** Complement color:

 shade 0 = #AA5039 = rgb(170, 80, 57) = rgba(170, 80, 57,1)
 shade 1 = #F8B7A6 = rgb(248,183,166) = rgba(248,183,166,1)
 shade 2 = #D17F69 = rgb(209,127,105) = rgba(209,127,105,1)
 shade 3 = #822D16 = rgb(130, 45, 22) = rgba(130, 45, 22,1)
 shade 4 = #5C1300 = rgb( 92, 19,  0) = rgba( 92, 19,  0,1)


 #####  Generated by Paletton.com (c) 2002-2014

 */

function FullscreenCanvas(canvasname) {

    var bodyTag   = document.body;
    var divTag    = document.createElement("div");
    var canvasTag = document.createElement("canvas");

    divTag.style.position	 = 'absolute';
    divTag.style.left		 = 0;
    divTag.style.top		 = 0;
    divTag.style.margin		 = 0;
    divTag.style.padding=0;
    
    canvasTag.style.position = 'absolute';
    divTag.style.left		 = 0;
    divTag.style.top		 = 0;
    divTag.style.margin		 = 0;
    divTag.style.padding	 = 0;
    
    divTag.appendChild(canvasTag);
    bodyTag.appendChild(divTag);
    
    this.canvas				 = document.getElementsByTagName("canvas")[0];
    this.ctx				 = this.canvas.getContext("2d");
    this.blockSceneDrawing	 = 0;
    this.resizeTimeout       = 1500;
    this.canvas.width		 = window.innerWidth;
    this.canvas.height		 = window.innerHeight;
    this.bgcolor             = "#27556C";
    this.xOffset             = this.canvas.offsetLeft;
    this.yOffset             = this.canvas.offsetTop;

    // take care for event handlers
    this.canvas.addEventListener("click", this.clickHandler.bind(this));
    window.addEventListener("resize", this.resizeHandler.bind(this));

    this.drawScene();
}

FullscreenCanvas.prototype.drawScene = function() {
    if (this.blockSceneDrawing==0) {
		this.ctx.clearRect ( 0 , 0 , this.canvas.width , this.canvas.height );	
		// Draw background
		this.ctx.fillStyle = this.bgcolor;
		this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
}

FullscreenCanvas.prototype.sceneUnblocker = function() {
    this.blockSceneDrawing=0;
    this.drawScene();
}

FullscreenCanvas.prototype.clickHandler = function(event)  {

    var x = event.pageX - this.xOffset;
    var y = event.pageY - this.yOffset;
    
    this.drawScene();
}

FullscreenCanvas.prototype.resizeHandler = function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    if (this.blockSceneDrawing==0) {
		this.blockSceneDrawing=1;
		window.setTimeout(this.sceneUnblocker.bind(this), this.resizeTimeout);
    }
    this.drawScene();
}

var fscanvas = new FullscreenCanvas();
