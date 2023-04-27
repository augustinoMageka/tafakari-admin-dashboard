import Link from "next/link";
import { useModalContext } from "@/context/modalContext";
import {
  DashboardIcon,
  CategoriesIcon,
  // MedicineIcon,
  SalesIcon,
  SettingsIcon,
  StockIcon,
  SuppliersIcon,
  // UsersIcon,
  UpIcon,
  DownIcon,
  ProfileIcon,
} from "@/components/svgIcons";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathName = usePathname();
  const [navItems, setNavItems] = useState([
    {
      link: "dashboard",
      active: true,
      icon: DashboardIcon,
    },
    {
      link: "categories",
      active: false,
      icon: CategoriesIcon,
    },
    // {
    //   link: "medicine",
    //   active: false,
    //   sublinks: ["create", "listing", "expired"],
    //   activeSublink: "",
    //   icon: MedicineIcon,
    // },
    {
      link: "stock",
      active: false,
      sublinks: ["create", "listing", "outOfStock", "expired"],
      activeSublink: "",
      icon: StockIcon,
    },
    {
      link: "suppliers",
      active: false,
      sublinks: ["create", "listing"],
      activeSublink: "",
      icon: SuppliersIcon,
    },
    {
      link: "sales",
      active: false,
      icon: SalesIcon,
    },
    // {
    //   link: "users",
    //   active: false,
    //   sublinks: ["create"],
    // activeSublink: "",
    //   icon: UsersIcon,
    // },
    {
      link: "settings",
      active: false,
      icon: SettingsIcon,
    },
    {
      link: "profile",
      active: false,
      icon: ProfileIcon,
    },
  ]);
  useEffect(() => {
    const link = pathName.split("/")[1];
    const sublink = pathName.split("/")[2] || "listing";
    const newNavItems = navItems.map((item) => {
      if (item.link == link) {
        return { ...item, active: true, activeSublink: sublink };
      } else return { ...item, active: false };
    });
    setNavItems(newNavItems);
  }, [pathName]);
  const modalState = useModalContext();
  return (
    <>
      <div
        id="docs-sidebar"
        className={`hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 ${
          modalState && "z-[60]"
        }  w-52 bg-white border-r border-gray-200 pt-5 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="px-6">
          <Link
            className="flex-none text-xl font-semibold text-teal-800 dark:text-white"
            href="/"
            aria-label="Brand"
          >
            pharmacorner
          </Link>
        </div>
        <nav
          className="hs-accordion-group px-3 pt-5 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-3">
            {navItems.map((nav) => {
              return nav.sublinks ? (
                <li key={nav.link} className="hs-accordion" id={nav.link}>
                  <button
                    className={`w-full ${
                      nav.active
                        ? "bg-teal-400 text-white font-semibold"
                        : "text-slate-600 hover:bg-gray-200"
                    } hs-accordion-toggle transition-all duration-300 flex items-center gap-x-3.5 py-2 px-2.5 text-md rounded-md`}
                  >
                    <nav.icon />
                    {nav.link}
                    <UpIcon active={nav.active} />
                    <DownIcon active={nav.active} />
                  </button>

                  <div
                    id={nav.link}
                    className={`${
                      !nav.active && "hidden"
                    } hs-accordion-content w-full overflow-hidden transition-[height] duration-300`}
                  >
                    <ul className="pt-1 pl-2">
                      {nav.sublinks.map((link) => (
                        <li key={link}>
                          <Link
                            className={`flex items-center gap-x-3.5 py-1.5 mb-1 px-2.5 text-md rounded-md ${
                              nav.active && nav.activeSublink == link
                                ? "bg-teal-400 text-gray-50 font-semibold"
                                : "hover:bg-gray-200 text-slate-700"
                            }`}
                            href={`/${nav.link}${
                              link == "listing" ? "" : "/" + link
                            }`}
                          >
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={nav.link}>
                  <Link
                    className={`${
                      nav.active
                        ? "bg-teal-400 text-white font-semibold"
                        : "text-slate-600 hover:bg-gray-200"
                    } flex items-center gap-x-3.5 py-2 px-2.5 text-md rounded-md `}
                    href={"/" + nav.link}
                  >
                    <nav.icon />
                    {nav.link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
