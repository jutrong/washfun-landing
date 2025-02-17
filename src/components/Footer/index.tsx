import Image from "next/image";
import Link from "next/link";


const Footer = () => {
  return (
    <div className="w-full  border-t border-lightPrimary bg-gradient-to-tr from-lightPrimary to-white">
      <div className="flex size-full flex-col justify-center py-10">
        <div className="flex flex-col items-center">
          <div className="mt-6 flex h-20 w-2/3 justify-between">
            <div className="opacity-50">
              <Image src="/images/svg/grayLogo.svg" alt="gray Logo" width={80} height={80} />
            </div>
            <Link href={"https://www.instagram.com/wash.fun_official/?locale=French"} target="_blank">
              <div className="cursor-pointer">
                <Image src="/images/png/instagram.png" alt="instagram" width={30} height={30} />
              </div>
            </Link>
          </div>
          <div className="flex w-2/3 flex-col gap-3 text-gray md:pt-10 md:text-sm">
            <div className="my-2 mt-4">
              <Image src="/images/logo/HorizontalType.svg" alt="logo" width={200} height={100} />
            </div>
            <div className="flex gap-2 md:flex-col ">
              <p className="font-bold ">개인정보 처리방침 및 기타문의사항 </p>
              <p>contact@washfun.fun / 070-8806-8088</p>
            </div>
            <div className="flex gap-2 md:flex-col">
              <p className="font-bold ">주소</p>
              <p>울산광역시 중구 종가6길 21, 우정혁신타워 605호</p>
            </div>
            <div className="flex gap-2 md:flex-col">
              <p className="font-bold  ">사업자등록번호 </p>
              <p>797-43-01003 / 정보통신업 응용 소프트웨어 개발 및 공급업, 자동차 세차업</p>
            </div>
            <div className="flex gap-2 md:flex-col">
              <p className="font-bold">통신판매 신고번호 </p>
              <p>2024-울산중구-0396</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Footer;