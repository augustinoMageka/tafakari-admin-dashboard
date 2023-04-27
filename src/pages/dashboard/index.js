import SalesChart from "@/components/salesChart";
import CardLink from "@/components/cardLink";
import { getDBDocs } from "@/services/dbServices";
import { useEffect, useState } from "react";
import CoreLayout from "@/components/coreLayout";

export default function DashboardPage() {
  const [todayTotal, setTodayTotal] = useState();
  const [thisWeekTotal, setThisWeekTotal] = useState();
  // const [bestSeller, setBestSeller] = useState(null);
  // const [worstSeller, setWorstSeller] = useState(null);

  useEffect(() => {
    const getSales = async () => {
      const sales = await getDBDocs("sales");
      let now = new Date(Date.now());
      const options = { weekday: "long" };
      const dayOfWeek = now.toLocaleString("en-US", options);
      let multiplier = 0;
      switch (dayOfWeek) {
        case "Sunday":
          multiplier = 6;
          break;
        case "Monday":
          multiplier = 0;
          break;
        case "Tuesday":
          multiplier = 1;
          break;
        case "Wednesday":
          multiplier = 2;
          break;
        case "Thursday":
          multiplier = 3;
          break;
        case "Friday":
          multiplier = 4;
          break;
        case "Saturday":
          multiplier = 5;
          break;
        default:
          multiplier = 0;
          break;
      }
      const thisWeek = new Date(
        now -
          (multiplier * 24 * 60 * 60 * 1000 + now.getHours() * 60 * 60 * 1000)
      );
      const today = new Date(now - now.getHours() * 60 * 60 * 1000);
      const todaySales = sales
        .map((sale) => {
          if (sale.date.toDate() > today) return sale;
        })
        .filter(Boolean);
      const thisWeekSales = sales
        .map((sale) => {
          if (sale.date.toDate() > thisWeek) return sale;
        })
        .filter(Boolean);
      let tempTodayTotal = 0;
      todaySales.forEach((el) => {
        tempTodayTotal += el.totalPrice;
      });
      let tempThisWeekTotal = 0;
      thisWeekSales.forEach((el) => {
        tempThisWeekTotal += el.totalPrice;
      });
      setTodayTotal(tempTodayTotal);
      setThisWeekTotal(tempThisWeekTotal);
      console.log(tempThisWeekTotal);
    };
    getSales();
  }, []);

  return (
    <CoreLayout>
      <div className="grid grid-cols-4 gap-5">
        <div className="bg-white text-slate-800 p-3 rounded-lg flex flex-col justify-between">
          <div>
            <p className="font-bold text-teal-600">Sales summary</p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-gray-600">
                <p className="text-sm">TODAY</p>
                <p>{"TZS " + (todayTotal || 0) + "/="}</p>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <p className="text-sm">THIS WEEK</p>
                <p>{"TZS " + (thisWeekTotal || 0) + "/="}</p>
              </div>
              {/* <div className="flex items-center justify-between text-gray-600">
                <p className="text-sm">THIS MONTH</p>
                <p>400000</p>
              </div> */}
            </div>
          </div>
          <CardLink link="/sales" text="Go to sales" />
        </div>
        <div className="bg-white text-slate-800 p-3 rounded-lg flex flex-col justify-between">
          <div>
            <p className="font-bold text-teal-600">Stock summary</p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-gray-600">
                <p className="text-sm">AVAILABLE</p>
                <p>300</p>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <p className="text-sm">OUT OF STOCK</p>
                <p>3</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <CardLink link="/stock/outOfStock" text="Out of stock" />
            <CardLink link="/stock" text="All Stock" />
          </div>
        </div>
        <div className="bg-white text-slate-800 p-3 rounded-lg flex flex-col justify-between">
          <div>
            <p className="font-bold text-teal-600">Expired medicine</p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-gray-600">
                <p className="text-sm">PRDOUCT COUNT</p>
                <p>13</p>
              </div>
            </div>
          </div>
          <CardLink link="/stock/expired" text="Go to expired medicine" />
        </div>
        <div className="bg-white text-slate-800 p-3 rounded-lg flex flex-col justify-between">
          <div>
            <p className="font-bold text-teal-600">Medicine Ranking</p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-gray-600">
                <p className="text-sm">BEST SELLER</p>
                <p>Paracetamol</p>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <p className="text-sm">WORST SELLER</p>
                <p>Diklopa</p>
              </div>
            </div>
          </div>
          <CardLink link="/medicine" text="Go to medicine" />
        </div>
      </div>
      <div className="grid grid-cols-2">
        <SalesChart
          title="Sales in the past 7 days"
          labels={["Mon", "Tue", "Wed", "Fri", "Thur", "Sat", "Sun"]}
          dataa={[20000, 30000, 54000, 81000, 12000, 33000, 74000]}
        />
        <SalesChart
          title="Sales in the past 10 months"
          labels={[
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
          ]}
          dataa={[
            200000, 300000, 200000, 540000, 810000, 120000, 200000, 330000,
            740000, 200000,
          ]}
        />
        {/* <SalesChart /> */}
      </div>
    </CoreLayout>
  );
}
