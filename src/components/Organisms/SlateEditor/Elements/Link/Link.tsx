import NextLink from "next/link";
import { useFocused, useSelected, useSlateStatic } from "slate-react";

import { removeLink } from "../../utils/link.js";
import { TbUnlink } from "react-icons/tb";

import styles from "../../../../../styles/SlateEditor/Link_Slate.module.scss";
import { Button as BsBtn, OverlayTrigger, Popover } from "react-bootstrap";

const Link = ({ attributes, element, children }) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div
      className={styles.link}
      style={{
        display: "inline-flex",
        boxShadow: selected && focused && "0 0 3px 3px lightgray"
      }}
    >
      <OverlayTrigger
        trigger="click"
        placement="top"
        overlay={
          <Popover id="popover-positioned-top" style={{ width: "100%" }}>
            <Popover.Header>{element.children[0].text}</Popover.Header>
            <Popover.Body>
              <>
                <NextLink href={element.href} passHref>
                  <a href={element.href} target="_blank" rel="noreferrer">
                    {element.href}
                  </a>
                </NextLink>

                <div className="row mt-3 justify-content-end">
                  <div className="col-5">
                    <BsBtn
                      size="sm"
                      variant="outline-danger"
                      onClick={() => removeLink(editor)}
                    >
                      Unlink <TbUnlink size={18} />
                    </BsBtn>
                  </div>
                </div>
              </>
            </Popover.Body>
          </Popover>
        }
      >
        <span>
          <a
            href={element.href}
            {...attributes}
            {...element.attr}
            target={element.target}
            style={{ cursor: "pointer" }}
          >
            {children}
          </a>
        </span>
      </OverlayTrigger>
    </div>
  );
};

export default Link;
