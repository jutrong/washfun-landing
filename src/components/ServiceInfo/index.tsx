import Image from "next/image";

const ServiceInfo = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-t from-lightPrimary to-white overflow-hidden">
      <div className="flex justify-center pt-40 text-5xl font-bold tracking-wider">
        <p className="text-black mr-4">셀프 셀차의</p>
        <span className="text-black text-gradient">패 · 러 · 다 · 임</span>
      </div>
      <div className="flex justify-center items-center gap-20 mt-32">
        <div className="w-80 h-96 shadow-gray rounded-3xl bg-white flex justify-center items-center flex-col">
          <Image src="/images/svg/nfc.svg" width={180} height={200} alt="nfc" />
          <p className="text-black text-2xl font-bold mt-10">사용량 기반</p>
          <p className="text-black text-2xl font-bold">후불 결제 시스템</p>
        </div>
        <div className="w-80 h-96 shadow-gray rounded-3xl bg-white flex justify-center items-center flex-col">
          <Image src="/images/svg/coinbox.svg" width={180} height={200} alt="coinbox" />
          <p className="text-black text-2xl font-bold mt-10">실시간 서버와 통신하는</p>
          <p className="text-black text-2xl font-bold">IoT 코인박스 · 청소기</p>
        </div>
        <div className="w-80 h-96 shadow-gray rounded-3xl bg-white flex justify-center items-center flex-col">
          <Image src="/images/svg/get-data.svg" width={180} height={200} alt="data" />
          <p className="text-black text-2xl font-bold mt-10">사용량 데이터 수집</p>
        </div>
      </div>
    </div >
  )
}

export default ServiceInfo;