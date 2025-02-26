import React, { useState } from "react";

interface TableOfContentProps {
  options: string[];
}

const TableOfContent: React.FC<TableOfContentProps> = ({ options }) => {
  const [selected, setSelected] = useState<string>(options[0]); // Por padrão, selecione a primeira opção

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      {options.map((option, index) => (
        <div
          key={index}
          className={`cursor-pointer py-2 text-[16px] leading-[24px] font-medium font-['Plus Jakarta Sans'] tracking-[0.02em] ${
            selected === option
              ? "text-[#000929] font-bold border-l-2 border-[#7065F0] pl-4"
              : "text-[#394150] font-medium pl-6"
          }`}
          onClick={() => handleSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default TableOfContent;
