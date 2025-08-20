import Image from "next/image";

export default function Footer() {
  return (
    <div className="mt-[200px] flex flex-row justify-between pb-[120px] pt-[80px]">
      <div>
        <div className="flex flex-col gap-[16px]">
          <Image src="/images/logo/HorizontalType.svg" alt="logo" width={200} height={100} />
        </div>
        <div className="mt-[24px] flex flex-col gap-[8px]">
          <div className="flex items-center gap-[8px]">
            <p className="text-[14px] font-medium text-secondaryDefault">상호명</p>
            <p className="text-[14px] font-medium text-black">라이프다이버전스</p>
          </div>

          <div className="flex items-center gap-[8px]">
            <p className="text-[14px] font-medium text-secondaryDefault">사업자등록번호</p>
            <p className="text-[14px] font-medium text-black">797-43-01003 / 정보통신업 응용 소프트웨어 개발 및 공급업, 자동차 세차업</p>
          </div>
          <div className="flex items-center gap-[8px]">
            <p className="text-[14px] font-medium text-secondaryDefault">주소</p>
            <p className="text-[14px] font-medium text-black">울산광역시 중구 종가6길 21, 우정혁신타워 605호</p>
          </div>
          <div className="flex items-center gap-[8px]">
            <p className="text-[14px] font-medium text-secondaryDefault">통신판매 신고번호</p>
            <p className="text-[14px] font-medium text-black">2024-울산중구-0396</p>
          </div>
          <div className="flex items-center gap-[8px]">
            <p className="text-[14px] font-medium text-secondaryDefault">개인정보 처리방침 및 기타문의사항</p>
            <p className="text-[14px] font-medium text-black">contact@washfun.fun / 070-8806-8088</p>
          </div>
        </div>
      </div>
      <div className="flex cursor-pointer gap-[80px] px-[80px]">
        <div>
          <p className="text-[18px] font-semibold">솔루션</p>
          <div className="mt-[16px] flex flex-col gap-[12px]">
            <p className="text-[16px] font-normal text-secondaryDefault">자동 세차</p>
            <p className="text-[16px] font-normal text-secondaryDefault">셀프 세차</p>
            <p className="text-[16px] font-normal text-secondaryDefault">관리 시스템</p>
          </div>
        </div>
        <div className="cursor-pointer">
          <p className="text-[18px] font-semibold">도입하기</p>
          <div className="mt-[16px] flex flex-col gap-[12px]">
            <p className="text-[16px] font-normal text-secondaryDefault">온라인 문의하기</p>
            <div className="flex items-center gap-[8px]">
              <Image src="/images/v2/svg/phone.svg" alt="phone" width={16} height={16} className="mb-1" />
              <p className="text-[16px] font-normal text-secondaryDefault">070 8806 8088 </p>
            </div>
          </div>
        </div>
        <div className="cursor-pointer">
          <p className="text-[18px] font-semibold">약관</p>
          <div className="mt-[16px] flex flex-col gap-[12px]">
            <p className="text-[16px] font-normal text-secondaryDefault">서비스 이용약관</p>
            <p className="text-[16px] font-normal text-secondaryDefault">개인정보 처리방침</p>
          </div>
        </div>
      </div>
    </div>
  )
}