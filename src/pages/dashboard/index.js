import CardLink from "@/components/cardLink";
import CoreLayout from "@/components/coreLayout";
import { useState, useEffect } from "react";
import { getCount } from "@/services/dbServices";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([
    // sala
    { label: "Sala za kawaida", link: "/sala/kawaida", coln: "salazakawaida" },
    {
      label: "Sala za kila siku",
      link: "/sala/kila-siku",
      coln: "salazakilasiku",
    },
    { label: "Sala za familia", link: "/sala/familia", coln: "salazafamilia" },
    { label: "Sakramenti", link: "/sala/sakramenti", coln: "sakramenti" },
    { label: "Sala za baraka", link: "/sala/baraka", coln: "baraka" },
    {
      label: "Rozari itakatifu",
      link: "/sala/rozari-itakatifu",
      coln: "rozariitakatifu",
    },
    {
      label: "Njia ya msalaba",
      link: "/sala/njia-ya-msalaba",
      coln: "njiayamsalaba",
    },
    { label: "Novena", link: "/sala/novena", coln: "novena" },
    // tafakari-nasi
    {
      label: "Somo la kwanza",
      link: "/tafakari-nasi/somo-la-kwanza",
      coln: "somolakwanza",
    },
    { label: "Zaburi", link: "/tafakari-nasi/zaburi", coln: "zaburi" },
    { label: "Injili", link: "/tafakari-nasi/injili", coln: "injili" },
    { label: "Tafakari", link: "/tafakari-nasi/tafakari", coln: "tafakari" },
    {
      label: "Mtakatifu wa siku",
      link: "/tafakari-nasi/mtakatifu-wa-siku",
      coln: "mtakatifuwasiku",
    },
    { label: "Nukuu", link: "/tafakari-nasi/nukuu", coln: "nukuu" },
    { label: "Nyimbo", link: "/tafakari-nasi/nyimbo", coln: "nyimbo" },
    {
      label: "Sala ya waumini",
      link: "/tafakari-nasi/sala-ya-waumini",
      coln: "salayawaumini",
    },
  ]);

  useEffect(() => {
    async function getDataCount() {
      let newLinks = [];
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const count = await getCount(link.coln);
        newLinks.push({ ...link, count });
      }
      setLoading(false);
      setLinks(newLinks);
    }
    getDataCount();
  }, []);

  return (
    <CoreLayout>
      <div className="grid grid-cols-4 gap-5">
        {links.map((i) => (
          <div
            key={i.link}
            className="bg-white text-slate-800 p-3 rounded-lg flex flex-col justify-between"
          >
            <div>
              <p className="font-bold text-red-600">{i.label}</p>
              <div className="mt-3">
                <div className="flex items-center justify-between text-gray-600">
                  <p className="text-sm">Number of items</p>
                  <p className="text-sm">{loading ? "..." : i.count}</p>
                </div>
                {/* <div className="flex items-center justify-between text-gray-600">
                <p className="text-sm">THIS MONTH</p>
                <p>400000</p>
              </div> */}
              </div>
            </div>
            <CardLink link={i.link} text={"Go to " + i.label} />
          </div>
        ))}
      </div>
    </CoreLayout>
  );
}
