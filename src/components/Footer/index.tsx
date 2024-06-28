import Image from "next/image";


const Footer = () => {
  return (
    <div className="w-full  border-t border-lightPrimary">
      <div className="w-full h-full flex flex-col justify-center py-10">
        <div className="flex flex-col items-center">
          <div className="w-2/3 h-20 flex justify-between mt-6">
            <div className="opacity-50">
              <Image src="/images/svg/grayLogo.svg" alt="gray Logo" width={80} height={80} />
            </div>
            <div>
              <Image src="/images/png/instagram.png" alt="instagram" width={30} height={30} />
            </div>
          </div>
          <div className="w-2/3 flex flex-col gap-3 text-gray md:pt-10">
            <div className="flex gap-2 md:flex-col">
              <p className="font-bold">개인정보 처리방침 및 기타문의사항 </p>
              <p>kdy@washfun.fun / 070-8806-8088</p>
            </div>
            <div className="flex gap-2 md:flex-col">
              <p className="font-bold ">주소</p>
              <p>울산광역시 중구 학성로 95-6, 304호</p>
            </div>
            <div className="flex gap-2 md:flex-col">
              <p className="font-bold  ">사업자등록번호 </p>
              <p>707-43-01003 / 정보통신업 응용 소프트웨어 개발 및 공급업, 자동차 세차업</p>
            </div>
            <div className="flex gap-2 md:flex-col">
              <p className="font-bold">통신판매 신고번호 </p>
              <p>2023-울산남구-0832</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;