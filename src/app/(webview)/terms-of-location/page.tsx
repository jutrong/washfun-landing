'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const TermsOfLocation = () => {
  // const route = useRouter()

  // const onClickBtn = () => {
  //   route.push('/terms-of-location/card')
  // }
  return (
    <>
      <div className="size-full flex justify-center items-centerflex-col">
        <div className="flex w-[1200px] justify-center">
          <Image src="/images/png/termsOfLocation.png" width={1900} height={9000} alt="policy" />
        </div>

      </div>
      {/* <div>
        <div className="text-black  w-[2000px] h-[300px]" onClick={onClickBtn}></div>
      </div> */}
    </>

  )
}

export default TermsOfLocation;




