function colorPicker(percentage){
    /*
    red =  "#F50000";
    red 1 = "#F55500";
    orange = "#F5BD00";
    yellow ="#EEF500";
    green2 =  "#89F500";
    green1 = "#4EF500";
    green =  "#0FF500";

    */
    //console.log(typeof  percentage);
    //console.log(percentage);

   // percentage: from 0 to infinite
    if(percentage> 0 && percentage < 0.5){
        //return green =  "#0FF500";
        return  "rgb(0, 230, 0)";
    }
    if(percentage >= 0.5 && percentage < 0.8){
        //return green1 = "#4EF500";
        return "rgb(0,178,0)";
    }
    if(percentage >= 0.8 && percentage < 1){
        //return green2 =  "#
        return "rgb(137, 245, 0)";
    }
    if(percentage >= 1 && percentage < 1.3){
        //return yellow ="#EEF500";
        return "rgb(230, 230, 0)";
    }
    if(percentage >= 1.3 && percentage < 1.5){
        //return orange = "#F5BD00";
        return "rgb(245, 184, 0)";
    }
    if(percentage >= 1.5 && percentage < 1.8){
        //return red1 = "#F55500";
        return "rgb(245, 85, 0)";
    }
    if(percentage >= 1.8){
        //return red =  "#F50000";
        return "rgb(245, 0, 0)";
    }
    return "rgb(102, 153, 255)";

}

function colorPicker3Intervals(percentage){
    /*
    red =  "#F50000";
    red 1 = "#F55500";
    orange = "#F5BD00";
    yellow ="#EEF500";
    green2 =  "#89F500";
    green1 = "#4EF500";
    green =  "#0FF500";

    */
    //console.log(typeof  percentage);
    //console.log(percentage);

    // percentage: from 0 to infinite
    if(percentage> 0 && percentage < 1.2){
        //return green =  "#0FF500";
        return  "rgb(0, 179, 0)";
    }

    if(percentage >= 1.2 && percentage < 1.6){
        //return yellow ="#EEF500";
        return "rgb(230, 230, 0)";
    }

    if(percentage >= 1.6){
        //return red =  "#F50000";
        return "rgb(230, 46, 0)";
    }
    return "rgb(102, 153, 255)";

}


function raiusPicker(percentage,raiusPicker) {
    if(percentage > 1.7){
        percentage = 1.7;
    }
    if(percentage < 0.5){
        percentage = 0.5;
    }
    let raiusCalc =  raiusPicker * percentage;
    return raiusCalc;
}