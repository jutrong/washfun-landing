import { RefObject, useRef } from "react";
import emailjs from "@emailjs/browser";


const Contact = ({ element }: { element: RefObject<HTMLDivElement> }) => {
  const form: RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);

  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          serviceID,
          templateID,
          form.current,
          {
            publicKey: publicKey,
          },
        )
        .then(
          (result) => {
            console.log(result.text);
            (e.target as HTMLFormElement).reset();
            alert("문의가 성공적으로 전송되었습니다.");
          }, (error) => {
            console.log(error.text);
            alert("문의 전송에 실패했습니다. 다시 시도해주세요.");
          });
    }
  };

  return (
    <div className=" w-full h-full flex flex-col items-center gap-20 text-black  bg-gradient-to-t from-lightPrimary to-white pb-32 mt-44 mb-44 px-36 md:px-0 md:mt-0" ref={element}>
      {/* <div className="text-black flex justify-center items-center ">
        <p className="font-semibold text-4xl">WashFun 문의</p>
      </div> */}
      <div className="w-full h-full flex py-20 pb-10 md:flex-col">
        <div className="flex-[2] font-semibold text-2xl gap-4 flex flex-col items-start mt-44 md:mt-0">
          <p className="ml-20 md:ml-10">편리하고 체계적인</p>
          <p className="ml-20 md:ml-10">세차장 관리</p>
          <p className="ml-20 md:ml-10">워시펀과 함께 만들어 나갑니다.</p>
        </div>
        <form ref={form} onSubmit={sendEmail} className="flex-[3] p-32 md:p-0 md:mt-20 md:justify-center">
          <div className="flex md:flex-col md:gap-6">
            <div className="flex-1 flex flex-col mx-10 ">
              <input className="w-full h-9 border border-lightGray rounded-md pl-5 outline-none focus:outline-none focus:border-primary placeholder:text-sm" type="text" name="name" placeholder="이름" required />
            </div>
            <div className="flex-1 flex flex-col mx-10">
              <input className="w-full h-9 border border-lightGray rounded-md  pl-5 focus:outline-none focus:border-primary placeholder:text-sm" type="email" name="email" placeholder="이메일" required />
            </div>
          </div>
          <div className="flex mt-6 md:flex-col md:gap-6">
            <div className="flex-1 flex flex-col mx-10">
              <input className="w-full h-9 border border-lightGray rounded-md pl-5 outline-none focus:outline-none focus:border-primary placeholder:text-sm" type="text" name="address" placeholder="주소" required />
            </div>
            <div className="flex-1 flex flex-col mx-10">
              <input className="w-full h-9 border border-lightGray rounded-md pl-5 outline-none focus:outline-none focus:border-primary placeholder:text-sm" type="text" name="phone" placeholder="전화번호" required />
            </div>
          </div>
          <div className="flex mt-6 md:flex-col md:gap-6">
            <div className="flex-1 flex flex-col mx-10">
              <input className="w-full h-9 border border-lightGray rounded-md pl-5 outline-none focus:outline-none focus:border-primary placeholder:text-sm" type="text" name="store_name" placeholder="상호명" required />
            </div>
            <div className="flex-1 flex flex-col mx-10">
              <input className="w-full h-9 border border-lightGray rounded-md  pl-5 focus:outline-none focus:border-primary placeholder:text-sm" type="text" name="year" placeholder="입력(년차)" required />
            </div>
          </div>
          <div className="flex mt-6 md:flex-col md:gap-6">
            <div className="flex-1 flex flex-col mx-10">
              <input className="w-full h-9 border border-lightGray rounded-md pl-5 outline-none focus:outline-none focus:border-primary placeholder:text-sm" type="text" name="bay" placeholder="베이 수" required />
            </div>
            <div className="flex-1 flex flex-col mx-10">
              <input className="w-full h-9 border border-lightGray rounded-md  pl-5 focus:outline-none focus:border-primary placeholder:text-sm" type="text" name="drying" placeholder="드라잉존 수" required />
            </div>
          </div>
          <div className="flex mt-6">
            <div className="flex-1 flex flex-col mx-10">
              <label className="font-base mb-4 pl-2">문의 사항</label>
              <textarea className="w-full h-44 py-2 border border-lightGray rounded-md pl-5 outline-none focus:outline-none focus:border-primary resize-none" name="content" required />
            </div>
          </div>
          <div className="flex justify-end cursor-pointer">
            <button type="submit" role="button" className="text-base w-36 cursor-pointer text-white p-2 mt-6 rounded-md opacity-80 hover:opacity-100 transition bg-primary  mx-10">문의하기</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact;