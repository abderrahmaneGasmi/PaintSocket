import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/pages/paint.css";
import { useSocket } from "../hooks/useSocket";

export default function Paint() {
  const [selectedColor, setSelectedColor] = useState("#F57170");
  const [selectedShape, setSelectedShape] = useState("♥");
  const [lastchanges, setLastchanges] = useState([] as number[][]);
  const { emit }: any = useSocket();

  const removelastchange = () => {
    if (lastchanges.length === 0) return;

    const lastchange = lastchanges[lastchanges.length - 1];
    console.log(lastchanges);
    if (lastchange) {
      const canvachildren = document.querySelector(".paintcanva")?.children;
      if (!canvachildren) return;
      //   lastchange.forEach((val) => {

      //   });
      for (let i = lastchange.length - 1; i >= 0; i--) {
        const element = lastchange[i];
        const elem = canvachildren[element] as HTMLElement;
        elem.remove();
      }
      //   console.log(lastchange);
    }
    setLastchanges((lastchanges) => {
      lastchanges.pop();
      return lastchanges;
    });
  };
  // create animated gradient background with framer motion
  return (
    <motion.div
      className="paintpage"
      animate={{
        background: [
          "linear-gradient(90deg, #F57170 0%, #3490DE 100%)",
          "linear-gradient(90deg, #3490DE 0%, #15B7B9 100%)",
          "linear-gradient(90deg, #15B7B9 0%, #A1CCD1 100%)",
          "linear-gradient(90deg, #A1CCD1 0%, #E25E3E 100%)",
          "linear-gradient(90deg, #E25E3E 0%, #F2C94C 100%)",
          "linear-gradient(90deg, #F2C94C 0%, #F57170 100%)",
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <div className="paintpage__container">
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
          <PaintShape
            shape="○"
            selectedShape={selectedShape}
            setSelectedShape={setSelectedShape}
          />
          <PaintShape
            shape="●"
            selectedShape={selectedShape}
            setSelectedShape={setSelectedShape}
          />
          <PaintShape
            shape="♧"
            selectedShape={selectedShape}
            setSelectedShape={setSelectedShape}
          />
          <PaintShape
            shape="🔥"
            selectedShape={selectedShape}
            setSelectedShape={setSelectedShape}
          />
          <PaintShape
            shape="◍"
            selectedShape={selectedShape}
            setSelectedShape={setSelectedShape}
          />
          <PaintShape
            shape="➤"
            selectedShape={selectedShape}
            setSelectedShape={setSelectedShape}
          />
          <PaintShape
            shape="✻"
            selectedShape={selectedShape}
            setSelectedShape={setSelectedShape}
          />
          <PaintShape
            shape="♜"
            selectedShape={selectedShape}
            setSelectedShape={setSelectedShape}
          />
        </div>
        <div className="erasercontainer" onClick={removelastchange}>
          <Svg
            path="M16.998 4.18l-3.154-2.425c-0.872-0.671-2.135-0.506-2.807 0.365l-8.4 10.897c-0.671 0.871-0.507 2.132 0.365 2.803l3.153 2.425c0.872 0.671 2.135 0.506 2.807-0.365l8.401-10.897c0.671-0.871 0.507-2.132-0.365-2.803zM8.548 16.467l-0.537 0.681c-0.152 0.197-0.385 0.31-0.639 0.31-0.124 0-0.309-0.029-0.485-0.164l-3.153-2.425c-0.168-0.129-0.275-0.317-0.303-0.53s0.028-0.422 0.157-0.589l0.537-0.681c0.152-0.197 0.385-0.311 0.64-0.311 0.124 0 0.309 0.029 0.485 0.164l3.154 2.425c0.168 0.129 0.275 0.317 0.303 0.53 0.026 0.213-0.030 0.422-0.159 0.59z"
            classname="eraser"
            viewbox="0 0 20 20"
          />
        </div>
        <PaintCanva
          selectedColor={selectedColor}
          selectedShape={selectedShape}
          lastchanges={lastchanges}
          setLastchanges={setLastchanges}
        />
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
    </motion.div>
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
  setLastchanges,
  lastchanges,
}: {
  selectedColor: string;
  selectedShape: string;
  lastchanges: number[][];
  setLastchanges: React.Dispatch<React.SetStateAction<number[][]>>;
}) {
  const canva = React.useRef<HTMLDivElement | null>(null);
  const painteventRef = React.useRef<(e: MouseEvent) => void>();
  const { emit, newpainted }: any = useSocket();

  useEffect(() => {
    if (!newpainted.color) return;
    const canvahtml = canva.current as unknown as HTMLElement;

    if (newpainted.type === "painted") {
      const color = newpainted.color;
      const elem = document.createElement("div");
      elem.classList.add("point");
      elem.style.color = color;
      elem.appendChild(document.createTextNode(newpainted.shape));
      elem.style.left = `${newpainted.position.x1}px`;
      elem.style.top = `${newpainted.position.y1}px`;
      elem.id = `x1: ${newpainted.position.x1} , y1: ${newpainted.position.y1}`;
      canvahtml.appendChild(elem);
    } else {
      let lastElem = canvahtml.children[
        canvahtml.children.length - 1
      ] as HTMLElement;
      if (
        lastElem.id ===
        `x1: ${newpainted.position.x1} , y1: ${newpainted.position.y1}`
      ) {
        lastElem.style.color = newpainted.color;
        lastElem.innerHTML = newpainted.shape;
        return;
      }
      console.log("no");
      lastElem = canvahtml.children[
        canvahtml.children.length - 2
      ] as HTMLElement;
      if (
        lastElem.id ===
        `x1: ${newpainted.position.x1} , y1: ${newpainted.position.y1}`
      ) {
        lastElem.style.color = selectedColor;
        lastElem.innerHTML = selectedShape;
        return;
      }
    }
  }, [newpainted]);

  const paintevent = (e: MouseEvent) => {
    const canvahtml = canva.current as unknown as HTMLElement;

    const x = e.clientX;
    const y = e.clientY;

    const canvaTop = canva.current?.offsetTop || 0;
    const canvaLeft = canva.current?.offsetLeft || 0;
    const x1 = x - canvaLeft;
    const y1 = y - canvaTop;

    const cord = `x1: ${x1} , y1: ${y1}`;

    if (canvahtml.children.length > 0) {
      const lastElem = canvahtml.children[
        canvahtml.children.length - 1
      ] as HTMLElement;
      if (lastElem.id === cord) {
        lastElem.style.color = selectedColor;
        lastElem.innerHTML = selectedShape;
        emit("replace", {
          color: selectedColor,
          shape: selectedShape,
          position: { x1, y1 },
          type: "replaced",
        });
        return;
      }
    }

    const color = selectedColor;
    const elem = document.createElement("div");
    elem.classList.add("point");
    elem.style.color = color;
    elem.appendChild(document.createTextNode(selectedShape));
    elem.style.left = `${x1}px`;
    elem.style.top = `${y1}px`;
    elem.id = cord;
    emit("paint", {
      color,
      shape: selectedShape,
      position: { x1, y1 },
      type: "painted",
    });

    canvahtml.appendChild(elem);
    setLastchanges((lastchanges) => {
      lastchanges[lastchanges.length - 1].push(canvahtml.children.length - 1);
      return lastchanges;
    });
  };
  useEffect(() => {
    const canvaelem = canva.current as HTMLElement;

    // Remove the previous event listener, if it exists
    if (painteventRef.current) {
      canvaelem.removeEventListener("mousemove", painteventRef.current);
    }

    // Add the new event listener
    painteventRef.current = paintevent;
    canvaelem.addEventListener("mousedown", () => {
      setLastchanges((lastchanges) => {
        lastchanges.push([]);
        return lastchanges;
      });
      canvaelem.addEventListener("mousemove", paintevent);
    });

    canvaelem.addEventListener("mouseup", () => {
      canvaelem.removeEventListener("mousemove", paintevent);
      if (lastchanges.length === 0) return;
      if (lastchanges[lastchanges.length - 1].length === 0) {
        setLastchanges((lastchanges) => {
          lastchanges.pop();
          return lastchanges;
        });
      }
    });

    window.addEventListener("mouseup", () => {
      canvaelem.removeEventListener("mousemove", paintevent);
      if (lastchanges.length === 0) return;

      if (lastchanges[lastchanges.length - 1].length === 0) {
        console.log("first");
        setLastchanges((lastchanges) => {
          lastchanges.pop();
          return lastchanges;
        });
      }
    });

    return () => {
      // Remove the event listener when the component unmounts

      if (painteventRef.current) {
        canvaelem.removeEventListener("mousemove", painteventRef.current);
      }
      if (lastchanges.length === 0) return;

      if (lastchanges[lastchanges.length - 1].length === 0) {
        console.log("first");
        setLastchanges((lastchanges) => {
          lastchanges.pop();
          return lastchanges;
        });
      }
    };
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

function Svg({
  path,
  classname,
  viewbox,
}: {
  path: string;
  viewbox: string;
  classname: string;
}) {
  return (
    <svg viewBox={viewbox} className={classname}>
      <path d={path} />
    </svg>
  );
}
