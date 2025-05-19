import * as React from "react";
import Headers from "../Headers/Headers";


const Layout: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
    <div className="">

      <Headers />
      {children}
    </div>
    </>
  );
};

export default Layout;
