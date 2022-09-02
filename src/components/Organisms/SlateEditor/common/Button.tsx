import styles from "../../../../styles/SlateEditor/button_Slate.module.scss";

const Button = props => {
  const { children, format, active, ...rest } = props;
  return (
    <button
      className={`${active ? styles.btnActive : ""} ${styles.button}`}
      title={format}
      {...rest}
      style={{ width: "30px", height: "20px", margin: "0 2px" }}
    >
      {children}
    </button>
  );
};

export default Button;
