import { FC, ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return <div className="container mx-auto px-2">{children}</div>;
};

export default Wrapper;
