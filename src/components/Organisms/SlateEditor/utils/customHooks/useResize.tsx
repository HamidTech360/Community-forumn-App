import { useState } from "react";

const useResize = ({ format }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [size, setSize] = useState<any>(
    format === "video"
      ? { width: 300, height: 220 }
      : { width: 200, height: 200 }
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
  const onMouseMove = e => {
    setSize(currentSize => ({
      width: currentSize.width + e.movementX,
      height: currentSize.height + e.movementY
    }));
  };

  return [size, onMouseDown, resizing];
};

export default useResize;
