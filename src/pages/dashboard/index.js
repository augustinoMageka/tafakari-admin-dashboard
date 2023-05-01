import CardLink from "@/components/cardLink";
import CoreLayout from "@/components/coreLayout";

export default function DashboardPage() {
  return (
    <CoreLayout>
      <div className="grid grid-cols-4 gap-5">
        <div className="bg-white text-slate-800 p-3 rounded-lg flex flex-col justify-between">
          <div>
            <p className="font-bold text-teal-600">Sales summary</p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-gray-600">
                <p className="text-sm">TODAY</p>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <p className="text-sm">THIS WEEK</p>
              </div>
              {/* <div className="flex items-center justify-between text-gray-600">
                <p className="text-sm">THIS MONTH</p>
                <p>400000</p>
              </div> */}
            </div>
          </div>
          <CardLink link="/sales" text="Go to sales" />
        </div>
      </div>
    </CoreLayout>
  );
}
