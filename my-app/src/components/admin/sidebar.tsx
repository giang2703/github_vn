"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faUserTie, faBriefcase, faTags, faUser, faWarehouse, faFileInvoice } from "@fortawesome/free-solid-svg-icons";

const items = [
  {
    label: "Trang chủ",
    key: "home",
    href: "/admin",
    icon: faHome,
  },
  {
    label: "Quản lý nhân viên",
    key: "employees",
    href: "/admin/users",
    icon: faUsers,
  },
  {
    label: "Quản lý bán hàng",
    key: "sales",
    href: "/admin/sales",
    icon: faUserTie,
  },
  {
    label: "Quản lý kinh doanh",
    key: "business",
    href: "#",
    icon: faBriefcase,
  },
  {
    label: "Quản lý danh mục sản phẩm",
    key: "categories",
    href: "/admin/categoriesParent",
    icon: faTags,
  },
  {
    label: "Quản lý nhà cung cấp",
    key: "suppliers",
    href: "/admin/suppliers",
    icon: faUser,
  },
  {
    label: "Quản lý nhập kho hàng",
    key: "inventory",
    href: "/admin/inventory",
    icon: faWarehouse,
  },
  {
    label: "Danh sách hoá đơn",
    key: "invoices",
    href: "/admin/invoices",
    icon: faFileInvoice,
  },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname);

  const handleClick = (href: string) => {
    setCurrent(href);
  };

  return (
    <div className="bg-white shadow-lg h-screen p-6 w-[20%] shadow-md font-sans text-sm leading-5">
      <h2 className="text-3xl font-sans font-bold text-blue-600 mb-6">YoungTech</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.key}
            className={`flex items-center text-gray-700 cursor-pointer p-2 rounded-md transition-all duration-200 ${
              current === item.href ? 'bg-gray-300' : 'hover:bg-gray-300'
            }`}
            onClick={() => handleClick(item.href)}
          >
            <FontAwesomeIcon icon={item.icon} className="mr-2" />
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
