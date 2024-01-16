import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface LinkCustomProps {
  to: string;
  children: ReactElement | string;
}

function LinkCustom(props: LinkCustomProps): ReactElement {
  const { to, children } = props;
  const navigate = useNavigate();

  const onClick = () => {
    navigate(to);
  };
  return (
    <button onClick={onClick} className="text-white">
      {children}
    </button>
  );
}

export default LinkCustom;
