import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface LinkCustomProps {
  className?: string;
  children: ReactElement | string;
}

interface LinkCustomPropsWithTo extends LinkCustomProps {
  to: string;
  handleClick?: never;
}

interface LinkCustomPropsWithOnClick extends LinkCustomProps {
  handleClick?: () => void;
  to?: never;
}

function LinkCustom(
  props: LinkCustomPropsWithTo | LinkCustomPropsWithOnClick
): ReactElement {
  const { children, className, to, handleClick } = props;
  const navigate = useNavigate();

  const onClick = () => {
    if (to) {
      navigate(to);
    }
    if (handleClick) {
      handleClick();
    }
  };

  return (
    <button onClick={onClick} className={className ? className : "text-white"}>
      {children}
    </button>
  );
}

export default LinkCustom;
