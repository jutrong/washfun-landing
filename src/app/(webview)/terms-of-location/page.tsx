'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const TermsOfLocation = () => {
  const route = useRouter()

  const onClickBtn = () => {
    route.push('/terms-of-location/card')
  }
  return (
    <div className="size-full flex justify-center">
      <div className="flex w-[1200px] justify-center">
        <Image src="/images/png/termsOfLocation.png" width={1900} height={10000} alt="policy" />
      </div>
      <div>
        <button className="text-black" onClick={onClickBtn}>...</button>
      </div>
    </div>
  )
}

export default TermsOfLocation;




