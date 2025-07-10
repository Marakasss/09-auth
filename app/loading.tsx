import { CircleLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loading = () => {
  return (
    <div className={css.loader}>
      <CircleLoader color="blue" />
    </div>
  );
};
export default Loading;
