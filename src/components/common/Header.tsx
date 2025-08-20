import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Header() {
  const router = useRouter();
  return (
    <>
      <div className="sticky left-0 top-0 z-[100] flex w-full items-center justify-between bg-white px-[160px] py-[24px] lg:hidden ">
        <div className="flex items-center gap-[40px]">
          <Image src="/images/v2/svg/logo1.svg" alt="washfun Logo" width={65} height={35} style={{ objectFit: "cover", cursor: "pointer" }} onClick={() => router.push('/')} />
          <div className="flex gap-[40px] ">
            {/* <p className="cursor-pointer text-[18px] font-medium">홈</p> */}
            <p className="cursor-pointer text-[18px] font-medium text-secondaryDefault" onClick={() => router.push('/service')}>워시펀 사장님</p>
            <p className="cursor-pointer text-[18px] font-medium text-secondaryDefault" onClick={() => router.push('/contact')}>도입 문의</p>
          </div>
        </div>

        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-[8px] rounded-[999px] bg-secondaryForeground px-[16px] py-[10px]">
            <Image src="/images/v2/svg/phone.svg" alt="phone" width={20} height={20} />
            <p className="text-[18px] font-semibold text-secondaryDefault">
              070 8806 8088
            </p>
          </div>
          <div className="cursor-pointer rounded-[999px] bg-main px-[24px] py-[12px]" onClick={() => router.push('/contact')}>
            <p className="font-semibold text-white">온라인 문의</p>
          </div>
        </div>
      </div >
      <div className="hidden lg:block lg:p-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <Image src="/images/v2/svg/menu.svg" alt="washfun Logo" width={30} height={28} style={{ objectFit: "cover", cursor: "pointer" }} />
            <Image src="/images/v2/svg/logo1.svg" alt="washfun Logo" width={50} height={46} style={{ objectFit: "cover", cursor: "pointer" }} />
          </div>
          <div className="flex items-center gap-[40px] ">
            <div className="cursor-pointer rounded-[999px] bg-main px-[24px] py-[12px] lg:py-[8px]">
              <p className="font-semibold text-white">온라인 문의</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}