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
          <div className="w-2/3 flex flex-col gap-3 text-gray">
            <div className="flex gap-2">
              <p className="font-bold">개인정보 처리방침 기타문의사항 </p>
              <p>support@washfun.fun / 070-8098-4474</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold ">주소</p>
              <p>울산광역시 남구 옥현로 129 울산벤쳐빌딩 605-1호</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold  ">사업자등록번호 </p>
              <p>707-43-01003 / 정보통신업 ㅍ응용 소프트웨어 개발 및 공급업, 자동차 세차업</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;