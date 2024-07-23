import Image from "next/image";

const PrivacyPolicy = () => {
  return (
    <div className="size-full flex justify-center">
      <div className="flex w-[1200px] justify-center">
        <Image src="/images/png/desktop-policy.png" width={1900} height={5000} alt="policy" />
      </div>
    </div>
  )
}

export default PrivacyPolicy;