import { useSelected, useFocused } from "slate-react";
import Icon from "../../common/Icon";
import useResize from "../../utils/customHooks/useResize";
// import  Image as NextImage  from "next/image";

import styles from "../../../../../styles/SlateEditor/button_Slate.module.scss";
import styles2 from "../../../../../styles/SlateEditor/Embed_Slate.module.scss";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Image = ({ attributes, element, children }) => {
  const { url, alt } = element;
  const selected = useSelected();
  const focused = useFocused();
  const [size, onMouseDown] = useResize({ format: "image" });

  return (
    <div
      {...attributes}
      className={styles2.embed}
      style={{
        display: "flex",
        boxShadow: selected && focused && "0 0 3px 3px lightgray"
      }}
      {...element.attr}
    >
      <div
        contentEditable={false}
        // style={{ width: `${size.width}px`, height: `${size.height}px` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={alt}
          src={url}
          style={{
            objectFit: "contain",
            width: `${size.width}px`,
            height: `${size.height}px`
          }}
        />
        {selected && (
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={props => (
              <Tooltip id="button-tooltip" {...props}>
                Resize Image
              </Tooltip>
            )}
          >
            <button
              className={styles.button}
              onMouseDown={onMouseDown}
              style={{
                width: "15px",
                height: "15px",
                opacity: 1,
                background: "transparent"
              }}
            >
              <Icon icon="resize" />
            </button>
          </OverlayTrigger>
        )}
      </div>
      {children}
    </div>
  );
};
export default Image;
