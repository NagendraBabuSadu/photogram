import * as React from "react";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <div className="flex ">
      <footer className="bg-secondary text-white text-center py-2 position-fixed bottom-0 w-100">
        <p className="text-white m-0 text-center">© 2025 Mozoto PVT. LTD</p>
      </footer>
    </div>
  );
};

export default Footer;
