import style from "./input.module.css";

const InputResult = (props) => {
  return (
    <input
      type="text"
      name="hash"
      value={props.result}
      readOnly={true}
      key="hash"
      className={style.notAllowed}
    />
  );
};

export default InputResult;
