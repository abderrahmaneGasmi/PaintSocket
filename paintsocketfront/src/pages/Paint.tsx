import React, { useEffect, useState } from "react";
import "../styles/pages/paint.css";
export default function Paint() {
  const [selectedColor, setSelectedColor] = useState("#F57170");
  const [selectedShape, setSelectedShape] = useState("♥");
  return (
    <div className="paintpage">
      <div className="paintTitle">Paint Socket</div>
      <div className="paintshapes">
        <PaintShape
          shape="♥"
          selectedShape={selectedShape}
          setSelectedShape={setSelectedShape}
        />
        <PaintShape
          shape="▲"
          selectedShape={selectedShape}
          setSelectedShape={setSelectedShape}
        />
        <PaintShape
          shape="◆"
          selectedShape={selectedShape}
          setSelectedShape={setSelectedShape}
        />

        <PaintShape
          shape="◼"
          selectedShape={selectedShape}
          setSelectedShape={setSelectedShape}
        />
      </div>
      <PaintCanva selectedColor={selectedColor} selectedShape={selectedShape} />
      <div className="paintcolors">
        <PaintColor
          color="#F57170"
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <PaintColor
          color="#3490DE"
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <PaintColor
          color="#15B7B9"
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <PaintColor
          color="#A1CCD1"
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <PaintColor
          color="#E25E3E"
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <PaintColor
          color="#F2C94C"
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </div>
    </div>
  );
}
function PaintColor({
  color,
  selectedColor,
  setSelectedColor,
}: {
  color: string;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div
      className="paintcolor"
      style={{
        backgroundColor: color,
        border: color === selectedColor ? "2px solid black" : "none",
      }}
      onClick={() => setSelectedColor(color)}
    ></div>
  );
}

function PaintCanva({
  selectedColor,
  selectedShape,
}: {
  selectedColor: string;
  selectedShape: string;
}) {
  const canva = React.useRef<HTMLDivElement | null>(null);

  const paintevent = (e: MouseEvent) => {
    console.log(e.clientX, e.clientY, selectedColor);
    const x = e.clientX;
    const y = e.clientY;

    const canvaTop = canva.current?.offsetTop || 0;
    const canvaLeft = canva.current?.offsetLeft || 0;
    const x1 = x - canvaLeft;
    const y1 = y - canvaTop;

    const color = selectedColor;
    const elem = document.createElement("div");
    elem.classList.add("point");
    elem.style.color = color;
    elem.appendChild(document.createTextNode(selectedShape));
    elem.style.left = `${x1}px`;
    elem.style.top = `${y1}px`;
    const canvahtml = canva.current as unknown as HTMLElement;
    canvahtml.appendChild(elem);
  };
  useEffect(() => {
    if (canva.current) {
      canva.current.addEventListener("mousedown", () => {
        // setCanvaclicked(true);
        canva.current?.addEventListener("mousemove", paintevent);
      });
      canva.current.addEventListener("mouseup", () => {
        // setCanvaclicked(false);

        canva.current?.removeEventListener("mousemove", paintevent);
      });
      window.addEventListener("mouseup", () => {
        // setCanvaclicked(false);

        canva.current?.removeEventListener("mousemove", paintevent);
      });
    }
  }, [selectedColor, selectedShape]);
  return <div className="paintcanva" ref={canva}></div>;
}
function PaintShape({
  shape,
  selectedShape,
  setSelectedShape,
}: {
  shape: string;
  selectedShape: string;
  setSelectedShape: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div
      className="paintshape"
      onClick={() => setSelectedShape(shape)}
      style={{
        border: shape === selectedShape ? "2px solid black" : "none",
      }}
    >
      {shape}
    </div>
  );
}
