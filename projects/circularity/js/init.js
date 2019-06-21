var init = function(window) {
    'use strict';
    var
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,

        app = window.opspark.makeApp(),
        canvas = app.canvas,
        view = app.view,
        fps = draw.fps('#000');


    window.opspark.makeGame = function() {

        window.opspark.game = {};
        var game = window.opspark.game;

        ////////////////////////////////////////////////////////////////
        // ALL CODE GOES BELOW HERE                                   //
        ////////////////////////////////////////////////////////////////

        // TODO 1 : Declare and initialize our variables //
        var circle; // variable to hold a single circle when creating circles / iterating
        var circles = [];


        // TODO 2 : Create a function that draws a circle  //
        function drawCircle() {
            circle = draw.randomCircleInArea(canvas, true, true, '#999', 2);
            physikz.addRandomVelocity(circle, canvas);
            view.addChild(circle);
            circles.push(circle);
        }

        // TODO 3 : Call the drawCircle function 5 times //
        drawCircle()
        drawCircle()
        drawCircle()
        drawCircle()
        drawCircle()


        // TODO 7 : Create a Loop to call drawCircle 100 times
        for (var counter = 0; counter < 100; counter++) {
            drawCircle()

        }


        view.addChild(fps);
        app.addUpdateable(fps);

        game.checkCirclePosition = function(circle) {
            // TODO 5 : YOUR CODE STARTS HERE //////////////////////

            if (circle.x > canvas.width + circle.radius) {
                // your code to place circle exactly off the stage at the left-side //
                circle.x = 0 - circle.radius;

            }
            else if (circle.x < 0 - circle.radius) {
                // your code to place circle exactly off the stage at the right-side //
                circle.x = canvas.width + circle.radius;
            }

            if (circle.y < 0 - circle.radius) {
                // code to place circle exactly off the stage at the bottom //
                circle.y = canvas.height + circle.radius;

            }
            else if (circle.y > canvas.height + circle.radius) {
                // your code to place circle exactly off the stage at the top //
                circle.y = 0 - circle.radius;
            }
            // YOUR TODO 5 CODE ENDS HERE //////////////////////////
        }

        function update() {
            // TODO 4 : Update the circle's position //
            physikz.updatePosition(circles[0]);
            physikz.updatePosition(circles[1]);
            physikz.updatePosition(circles[2]);
            physikz.updatePosition(circles[3]);
            physikz.updatePosition(circles[4]);


            // TODO 5 : Call game.checkCirclePosition on your circles.
            
            // TODO 8 : Iterate over the array
            for (var i = 0; i < circles.length; i++) {
                physikz.updatePosition(circles[i]);
                game.checkCirclePosition(circles[i]);
            }

        }

        ////////////////////////////////////////////////////////////////////
        // NO CODE BELOW HERE                                             //
        ////////////////////////////////////////////////////////////////////

        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;

        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}