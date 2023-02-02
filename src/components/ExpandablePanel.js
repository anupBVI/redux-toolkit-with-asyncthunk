import React, { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";

const ExpandablePanel = ({ header, children }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="m-2 rounded border">
      <div className="flex p-2 justify-between items-center  ">
        <div className="flex flex-row justify-between items-center">
          {header}
        </div>
        <div onClick={handleClick} className="cursor-pointer">
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
};

export default ExpandablePanel;
