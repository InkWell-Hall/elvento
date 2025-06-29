import { BadgeDollarSign, Boxes, Megaphone, UsersRound } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Tile from "../components/Tile";
import ChartBox from "../components/ChartBox";
import BarChartBox from "../components/BarChartBox";
import PieChartBox from "../components/PieChartBox";
import { Link } from "react-router";

const VendorDashboard = () => {
  const name = "Adel";
  return (
    <div className="home flex min-h-screen overflow-x-hidden bg-[#EAEBFF]">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 p-4">
        <h1 className="font-lead-font text-lead-text">
          Welcome {name} to your Dasboard
        </h1>
        <div className="cards  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-5">
          <Link to={"/vendor-ads"}>
            <Tile
              title={"Ads Running"}
              value={45}
              icon={<Megaphone color="#4b6382" />}
            />
          </Link>
          <Tile
            title={"NUMBER OF SALES"}
            value={45}
            icon={<BadgeDollarSign color="#4b6382" />}
          />
          <Tile
            title={"ORDERS DELIVERED"}
            value={45}
            icon={<Boxes color="#4b6382" />}
          />
          <Tile
            title={"AUDIENCE REACHED"}
            value={45}
            icon={<UsersRound color="#4b6382" />}
          />
          <Tile
            title={"Number of Ads"}
            value={45}
            icon={<Megaphone color="#4b6382" />}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-[minmax(180px,_auto)]">
          <div className="p-5 rounded-lg text-center bg-[#D6C6E1] col-span-1 row-span-1 font-lead-font font-bold">
            Consistent Buyers
            <div></div>
          </div>
          <div className="p-5 rounded-lg border-2 border-[#5C3C6] col-span-2 font-lead-font font-bold">
            Sales Over the month{" "}
            <div>
              <ChartBox users={354} />
            </div>
          </div>
          {/* <div className="p-5 rounded-lg border bg-blue-200  col-span-1">
            box3
          </div> */}
          <div className="p-5 rounded-lg  bg-[#D6C6E1] col-span-1 row-span-1 font-bold font-lead-font">
            Favorites
            {/* <ChartBox users={80} /> */}
          </div>
          {/* <div className="p-5 rounded-lg border bg-blue-200">
            box5 <ChartBox users={80} />
          </div>
          <div className="p-5 rounded-lg border bg-blue-200">
            box6 <ChartBox users={80} />
          </div> */}
          <div className="p-5 rounded-lg border  col-span-2 row-span-1">
            <h1 className="mb-3 font-lead-font text-lead-text font-bold">
              Revenue Generation Chart
            </h1>{" "}
            <div>
              <PieChartBox />
            </div>
          </div>
          <div className="p-5 rounded-lg border col-span-2 row-span-1">
            <h1 className="mb-7 font-lead-font text-lead-text font-bold">
              User Interaction Progress Bar
            </h1>
            <div>
              <BarChartBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
