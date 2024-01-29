import React from 'react';
import { BiEuro, BiLeftArrowAlt } from "react-icons/bi";
import { CiPizza } from "react-icons/ci";
import { FiEdit, FiXCircle } from "react-icons/fi";
import { RiTruckFill, RiFireFill } from "react-icons/ri";

const components = {
    CiPizza,
    RiTruckFill,
    RiFireFill,
    BiEuro,
    BiLeftArrowAlt,
    FiEdit,
    FiXCircle
};

const Icon = ({ type, size, className, action }) => {
    const SpecificIcon = components[type];
    return <SpecificIcon size={size} className={className} onClick={action} />;
}

export default Icon