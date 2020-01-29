function timeLineScrollButtons(){

    let button = document.getElementById('slide');
    button.onclick = function () {
        let container = document.getElementById('line');
        sideScroll(container,'right',25,100,10);
    };


    let back = document.getElementById('slideBack');
    back.onclick = function () {
        let container = document.getElementById('line');
        sideScroll(container,'left',25,100,10);
    };

}

function sideScroll(element,direction,speed,distance,step){
    scrollAmount = 0;
    let slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
}
