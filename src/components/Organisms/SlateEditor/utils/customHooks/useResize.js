import { useState } from "react";

const useResize = ({ format }) => {
  const [size, setSize] = useState(
    format === "video"
      ? { width: 300, height: 220 }
      : { width: 150, height: 150 }
  );

  const [resizing, setResizing] = useState(false);
  const onMouseDown = () => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    setResizing(true);
  };
  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    setResizing(false);
  };
  const onMouseMove = (e) => {
    setSize((currentSize) => ({
      width: currentSize.width + e.movementX,
      height: currentSize.height + e.movementY,
    }));
  };

  return [size, onMouseDown, resizing];
};

export default useResize;
