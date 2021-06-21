import style from "./input.module.css";

const InputResult = (props) => {
  return (
    <input
      type="text"
      name={props.key}
      value={props.result}
      readOnly={true}
      key={props.keyElement}
      className={style.notAllowed}
    />
  );
};

export default InputResult;
