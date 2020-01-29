
function drawOutBox(svg3)
{

  let svg = document.getElementsByTagName("svg");
  let svg2 = svg[0];
  let rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect2.setAttribute("fill", "#00ffbf");
      rect2.setAttribute('x', String(0));
      rect2.setAttribute('y', String(0));
      /*rect2.setAttribute('rx', "25px");
    rect2.setAttribute('ry', "25px");*/
      rect2.setAttribute('height', String(viewBoxFixSize));
      rect2.setAttribute('width', String(viewBoxFixSize));
      rect2.setAttribute('id',"outbox")
      svg2.appendChild(rect2);
  //console.log("---svg:"+svg[0].width);
//  var draw = SVG('mytimeline').size(viewBoxFixSize, viewBoxFixSize)

  //var rect = draw.rect(viewBoxFixSize, viewBoxFixSize).fill('#f06').move(0, 0);
}
