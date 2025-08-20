import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const path = usePathname();
  const router = useRouter();
  return (
    <div className="absolute inset-x-0 z-10 flex h-24 w-full items-center justify-between px-60 lg:px-0">
      <div className="flex h-[60px] w-[120px] cursor-pointer items-center justify-center" onClick={() => router.push("/")}>
        {path === "/" ?
          <Image src="/images/svg/white-logo.svg" alt="washfun Logo" width={60} height={50} />
          :
          <Image src="/images/svg/WashFunLogo1.svg" alt="washfun Logo" width={60} height={50} />
        }
      </div>
      <div className="flex w-full  cursor-pointer justify-end gap-8 lg:w-auto lg:pr-4">
        {/* <p className="text-white text-opacity-80 transition duration-500 hover:text-opacity-100" onClick={onMoveBox}>회사 소개</p> */}
        <Link href="/service">
          <p className={`${path === "/service" || path === "/contact" ? "text-black" : "text-white text-opacity-80"} transition duration-500 hover:text-opacity-100`}>워시펀 사장님</p>
        </Link>
        <Link href="/contact">
          <p className={`${path === "/service" || path === "/contact" ? "text-black" : "text-white text-opacity-80"} transition duration-500 hover:text-opacity-100`} >도입 문의</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;