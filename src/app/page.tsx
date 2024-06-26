import Accordian from "@/components/Accordian";
import Cover from "@/components/Cover";
import DeviceService from "@/components/DeviceService";
import EditPriceService from "@/components/EditPriceService";
import Footer from "@/components/Footer";
import InventoryService from "@/components/InventoryService";
import PointService from "@/components/PointService";
import ServiceData from "@/components/ServiceData";
import ServiceInfo from "@/components/ServiceInfo";
import VarienceFeeService from "@/components/VarienceFeeService";

export default function Home() {
  return (
    <>
      <div className="w-full box-border">
        <Cover />
        <ServiceInfo />
        <ServiceData />
        <EditPriceService />
        <InventoryService />
        <VarienceFeeService />
        <DeviceService />
        <PointService />
        <Accordian />
        <Footer />
      </div>
    </>
  );
}
