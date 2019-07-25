(function show_splashScreen() {
    //Number of sections in circle
    let num_of_elmnts=9;

    //Center of the circle
    let center={};

    /*Temporary value for moving position of the
     circle in intervals.*/
    let temp_num = 0;

    //The time in ms for the end of drawing circle
    let time_evaluating = 3500;

    //The time when all are to finish
    let t;

    //start colour for circle
    let c_start = '#ff0000';
    //end colour for circle
    let c_end = '#00ff00';
    //start colour in RGB and difference between colours
    let c_R = {
        start: 0,
        dif: 0
    };
    let c_G = {
        start: 0,
        dif: 0
    };
    let c_B = {
        start: 0,
        dif: 0
    };

    let c_cur;

    //Function to change colour of the circle
    function change_colour() {
        if (t == undefined) {

            c_R.start = parseInt(c_start.slice(1, 3), 16);
            c_R.dif = parseInt(c_end.slice(1, 3), 16) - c_R.start;
            c_G.start = parseInt(c_start.slice(3, 5), 16);
            c_G.dif = (parseInt(c_end.slice(3, 5), 16)) - c_G.start;
            c_B.start = parseInt(c_start.slice(5, 7), 16);
            c_B.dif = parseInt(c_end.slice(5, 7), 16) - c_B.start;

            let d = new Date();
            let n = d.getTime();
            t = n + time_evaluating;
            d = null;
            n = null;
        }
        let d = new Date().getTime();
        d = 1 - (t - d) / time_evaluating;

        //assigning colour
        c_cur = "#" +
            ("00" + Math.floor((c_R.dif) * d + c_R.start).toString(16)).slice(-2) + //red
            ("00" + Math.floor((c_G.dif) * d + c_G.start).toString(16)).slice(-2) + //green
            ("00" + Math.floor((c_B.dif) * d + c_B.start).toString(16)).slice(-2); //blue

        return c_cur;
    }

    //Function for drawing running circle 
    function draw_circles(ctx, num_of_elmnts) {

        //the width of fulfilled space in circle
        let arc_width = (Math.PI * 2) / num_of_elmnts;
        // the width of empty space's part of circle
        let rest_Width = (Math.PI * 2) / num_of_elmnts / num_of_elmnts / 5;
        temp_num++;
        for (let i = 0; i < num_of_elmnts; i++) {
            ctx.beginPath();
            ctx.globalAlpha = i / 5;
            ctx.fillStyle = change_colour();
            ctx.moveTo(center.X, center.Y);
            ctx.arc(
                center.X,
                center.Y,
                center.X / 2, //50
                (i + temp_num / 4) * arc_width + rest_Width,
                (i + temp_num / 4 + 1) * arc_width - rest_Width);
            ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.moveTo(center.X, center.Y);
        ctx.arc(center.X,
            center.Y,
            center.X / 3, //40
            0,
            2 * Math.PI);
        ctx.fill();

    }

    /*function for manipulating {<div></div>} and
    {<canvas></canvas> in it} at starting the page*/
    function start() {
        let startDiv = document.querySelector('.start_circle'); 

        let canvas = document.getElementById('canvasID');
        let context = canvas.getContext('2d');
        
        //some mechanism for drawing time to time
        var repeating = setInterval(() => {
            canvas.width = Math.min(startDiv.offsetWidth, startDiv.offsetHeight);
            canvas.height = Math.min(startDiv.offsetWidth, startDiv.offsetHeight);
            center.X = (canvas.width) / 2;
            center.Y = (canvas.height) / 2;
            context.clearRect(0, 0, canvas.width, canvas.height);
            draw_circles(context, num_of_elmnts);
        }, 60);

        //some mechanism for eliminating all
        setTimeout(() => {
            clearInterval(repeating);
            startDiv.style.display = 'none';
            let grid = document.querySelector('.grid');
            grid.classList.value="grid";
            console.log(grid.classList);
        }, time_evaluating);

    }
    start();
})();