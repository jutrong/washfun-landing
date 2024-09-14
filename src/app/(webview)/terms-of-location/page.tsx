'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const TermsOfLocation = () => {
  const route = useRouter()

  const onClickBtn = () => {
    route.push('/terms-of-location/card')
  }
  return (
    <>
      <div className="size-full flex justify-center">
        <div className="flex w-[1200px] justify-center">
          <Image src="/images/png/termsOfLocation.png" width={1900} height={10000} alt="policy" />
        </div>
        <div>
          <div className="text-black  w-40 h-20" onClick={onClickBtn}></div>
        </div>
      </div>

    </>

  )
}

export default TermsOfLocation;




