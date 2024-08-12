import Image from "next/image";

const TermsOfService = () => {
  return (
    <div className="size-full flex justify-center">
      <div className="flex w-[1200px] justify-center">
        <Image src="/images/png/termsOfService.png" width={1900} height={10000} alt="policy" />
      </div>
    </div>
  )
}

export default TermsOfService;