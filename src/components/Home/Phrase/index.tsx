import Image from "next/image";

const Phrase = () => {
  return (
    <div className="flex flex-col items-center justify-center  py-40 text-black">
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="text-3xl font-bold">실물 카드보다 모바일 결제 비중이 높은 시대</h2>
        <h3 className="text-5xl font-semibold">현금은 고객의 <span className="tracking-widest text-primary2">불편함</span>입니다.</h3>
      </div>
      <div className="mt-28  flex items-center justify-center rounded-xl shadow-2xl">
        <Image src="/images/png/Group20.png" alt="globalGraph" width={1000} height={400} className="w-800px" />
      </div>
    </div>
  )
}

export default Phrase;