
var zoomCont = 50;
var zoomState = 1;

function iterativeZoom(){



    // for each graph, reset zoom parameters

    // device number of click mouse roller

    // order of graphs:

        //tarjan over services
            //initTarjanSim();

        //services
            //initServicesSim();

        //instances
            //initNormalSim();

    initTarjanSim();

}


function updateZoomCont(zoomInc){
    // 50-60 tarjan over Services
    // 60-70 services
    // 70-80 instances

    console.log("---------UpdateZoomCont:"+zoomCont);
    if((zoomCont) >= 50 && (zoomCont) < 60){
     if((zoomCont + zoomInc) >= 60){
         // change to Services
         zoomCont+=zoomInc;
         return initServicesSim();
     }
    }


    if((zoomCont) >= 60 && (zoomCont) < 70){
        if(((zoomCont + zoomInc)) >= 70){
            //change to instances
            zoomCont+=zoomInc;
            return initInstancesSim();

        }
        if(((zoomCont + zoomInc)) < 60){
            //change to Tarjan Over Services
            zoomCont+=zoomInc;
            return  initTarjanServiceSim()();

        }
    }

    if((zoomCont) >= 70 && (zoomCont) < 80){
        if(((zoomCont + zoomInc)) < 70){
            //change to Services
            zoomCont+=zoomInc;
            return initServicesSim();
        }
    }
    zoomCont+=zoomInc;
}

// remove listener
// div.removeEventListener('click', listener, false);
