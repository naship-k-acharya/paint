const canvas = document.querySelector("canvas");
toolbtn=document.querySelectorAll(".tool");
const ctx = canvas.getContext("2d");
let prevmouseX,prevmouseY,snapshot;
let isDrawing = false;
selectedtool = 'brush';

// Set canvas size based on the drawing area size
window.addEventListener("load", () => {
    canvas.width = canvas.parentElement.offsetWidth; // Use parent's width
    canvas.height = canvas.parentElement.offsetHeight; // Use parent's height
});
const drawrect=(e)=>{
    ctx.strokeRect(e.offsetX, e.offsetY, prevmouseX - e.offsetX, prevmouseY - e.offsetY);
}

const drawcircle=(e)=>{
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((prevmouseX-e.offsetX),2)+Math.pow((prevmouseY-e.offsetY),2))
    ctx.arc(prevmouseX,prevmouseY,radius,60,0, 2* Math.PI);
    ctx.stroke();
}

const drawline=(e)=>{
    ctx.beginPath();
    ctx.moveTo( prevmouseX,prevmouseY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
}
const drawtriangle=(e)=>{
    ctx.beginPath();
    ctx.moveTo( prevmouseX,prevmouseY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.lineTo(prevmouseX*2-e.offsetX,e.offsetY);
    ctx.closePath();
    ctx.stroke();
}

const startDrawing = (e) => {
    isDrawing = true;
    prevmouseX=e.offsetX;
    prevmouseY=e.offsetY;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    
    snapshot=ctx.getImageData(0,0, canvas.width, canvas.height);
};

const draw = (e) => {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);
    if(selectedtool==="brush"){
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}
    else if(selectedtool==="rectangle"){
        drawrect(e);
    }
    else if(selectedtool==="circle"){
        drawcircle(e);
    }
    else if(selectedtool==="line"){
    
        drawline(e);
    }
    else if(selectedtool==="triangle"){
    
        drawtriangle(e);
    }

};

const stopDrawing = () => {
    isDrawing = false;
    ctx.closePath();
};
toolbtn.forEach(btn => {
btn.addEventListener("click",()=>{
    document.querySelector(".options").classList.remove("active");
    btn.classList.add("active");
    selectedtool=btn.id;

    console.log(selectedtool)
})
    
});

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
