import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DownIcon, UpIcon } from "./svgIcons";

export default function Sidebar() {
  const pathName = usePathname();
  const [navItems, setNavItems] = useState([
    {
      link: "dashboard",
      label: "Dashboard",
      active: true,
    },
    {
      link: "sala",
      label: "Sala",
      active: false,
      sublinks: [
        { label: "Kawaida", link: "kawaida" },
        { label: "Kila siku", link: "kila-siku" },
        { label: "Familia", link: "familia" },
        { label: "Sakramenti", link: "sakramenti" },
        { label: "Baraka", link: "baraka" },
        { label: "Rozari itakatifu", link: "rozari-itakatifu" },
        { label: "Njia ya msalaba", link: "njia-ya-msalaba" },
        { label: "Novena", link: "novena" },
      ],
      activeSublink: "",
    },
    {
      link: "tafakari-nasi",
      label: "Tafakari Nasi",
      active: false,
      sublinks: [
        { label: "Somo la kwanza", link: "somo-la-kwanza" },
        { label: "Zaburi", link: "zaburi" },
        { label: "Injili", link: "injili" },
        { label: "Tafakari", link: "tafakari" },
        { label: "Mtakatifu wa siku", link: "mtakatifu-wa-siku" },
        { label: "Nukuu", link: "nukuu" },
        { label: "Nyimbo", link: "nyimbo" },
        { label: "Sala ya waumini", link: "sala-ya-waumini" },
      ],
      activeSublink: "",
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
  return (
    <>
      <div
        id="docs-sidebar"
        className={`hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-52 bg-white border-r border-gray-200 pt-5 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="pl-3">
          <Link
            className="flex-none text-2xl font-semibold text-red-800 dark:text-white"
            href="/"
            aria-label="Brand"
          >
            Tafakari
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
                        ? "bg-red-400 text-white font-semibold"
                        : "text-slate-600 hover:bg-gray-200"
                    } hs-accordion-toggle transition-all duration-300 flex items-center gap-x-3.5 py-2 px-2.5 text-md rounded-md`}
                  >
                    {nav.label || nav.link}
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
                        <li key={link.link}>
                          <Link
                            className={`flex items-center gap-x-3.5 py-1.5 mb-1 px-2.5 text-md rounded-md ${
                              nav.active && nav.activeSublink == link.link
                                ? "bg-red-400 text-gray-50 font-semibold"
                                : "hover:bg-gray-200 text-slate-700"
                            }`}
                            href={"/" + nav.link + "/" + link.link}
                          >
                            {link.label}
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
                        ? "bg-red-400 text-white font-semibold"
                        : "text-slate-600 hover:bg-gray-200"
                    } flex items-center gap-x-3.5 py-2 px-2.5 text-md rounded-md `}
                    href={"/" + nav.link}
                  >
                    {nav.label}
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
