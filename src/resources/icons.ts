import { IconType } from "react-icons";
import { AiOutlineApartment } from "react-icons/ai";
import { BiCross, BiPlus, BiSearch, BiSort, BiX } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";
import { CgArrowTopRight } from "react-icons/cg";
import { CiCircleCheck, CiStethoscope } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineSparkles, HiSparkles, HiX } from "react-icons/hi";

import {
  HiArrowLeft,
  HiArrowRight,
  HiArrowTopRightOnSquare,
  HiChevronDown,
  HiOutlineRocketLaunch,
  HiOutlineStar,
  HiStar,
} from "react-icons/hi2";
import { IoBagOutline, IoEarthOutline, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { MdDashboard, MdOutlineDashboard, MdOutlineEmail, MdOutlineHouse, MdOutlineLocationCity, MdOutlineLuggage, MdOutlineSchool, MdSort } from "react-icons/md";
import { PiNotepad } from "react-icons/pi";
import { RxArrowTopRight } from "react-icons/rx";
import { TbBrandFacebook, TbBrandGithub, TbBrandInstagram, TbBrandTwitter, TbMail, TbMailAi, TbX } from "react-icons/tb";
import { TfiArrowTopRight, TfiGoogle } from "react-icons/tfi";
import { TiUserOutline } from "react-icons/ti";


export const iconLibrary: Record<string, IconType> = {
  rocket: HiOutlineRocketLaunch,
  arrowRight: HiArrowRight,
  arrowLeft: HiArrowLeft,
  chevronDown: HiChevronDown,
  star:HiStar,
  starOutline:HiOutlineStar,
  arrowTopRight: RxArrowTopRight,
  userOutline: TiUserOutline,
  luggageOutline:MdOutlineLuggage,
  buildingOutline: AiOutlineApartment,
  circleCheckOutline: CiCircleCheck,
  facebook: TbBrandFacebook,
  instagram:  TbBrandInstagram,
  github: TbBrandGithub,
  twitter: TbBrandTwitter,
  mail: TbMail,
  sun: IoSunnyOutline,
  moon: IoMoonOutline,
  google:  BsGoogle,
  search: BiSearch,
  sort: MdSort,
  earth: IoEarthOutline,
  stethoscope:CiStethoscope,
  notepad: PiNotepad,
  cross: HiX,
  dashboard: MdOutlineDashboard,
  at: MdOutlineEmail,
  location: HiOutlineLocationMarker,
  phone: HiOutlinePhone,
  plus: BiPlus,
  school: MdOutlineSchool,
  sparklesOutline: HiOutlineSparkles


};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
