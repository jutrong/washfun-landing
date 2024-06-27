import { RefObject, useRef } from "react";
import emailjs from "@emailjs/browser";


const Contact = () => {
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
    <div className=" w-full h-full flex flex-col items-center gap-20 text-black  bg-gradient-to-t from-lightPrimary to-white pb-32 mt-44 mb-44">
      <div className="text-black flex justify-center items-center ">
        <p className="font-bold text-5xl">WashFun 문의</p>
      </div>
      <div className="w-2/3 py-20 pb-10 bg-white shadow-primary-shadow rounded-3xl px-16">
        <form ref={form} onSubmit={sendEmail}>
          <div className="flex ">
            <div className="flex-1 flex flex-col mx-10 gap-3">
              <label className="font-semibold">이름</label>
              <input className="w-full h-9 border border-lightGray rounded-md pl-5 outline-none focus:outline-none focus:border-primary" type="text" name="name" required />
            </div>
            <div className="flex-1 flex flex-col mx-10 gap-3">
              <label className="font-semibold">이메일</label>
              <input className="w-full h-9 border border-lightGray rounded-md  pl-5 focus:outline-none focus:border-primary" type="email" name="email" required />
            </div>
          </div>
          <div className="flex mt-10">
            <div className="flex-1 flex flex-col mx-10 gap-3">
              <label className="font-semibold">주소</label>
              <input className="w-full h-9 border border-lightGray rounded-md pl-5 outline-none focus:outline-none focus:border-primary" type="text" name="address" required />
            </div>
            <div className="flex-1 flex flex-col mx-10 gap-3">
              <label className="font-semibold">전화번호</label>
              <input className="w-full h-9 border border-lightGray rounded-md pl-5 outline-none focus:outline-none focus:border-primary" type="text" name="phone" required />
            </div>
          </div>
          <div className="flex mt-10">
            <div className="flex-1 flex flex-col mx-10 gap-3">
              <label className="font-semibold">상호명</label>
              <input className="w-full h-9 border border-lightGray rounded-md pl-5 outline-none focus:outline-none focus:border-primary" type="text" name="store_name" required />
            </div>
            <div className="flex-1 flex flex-col mx-10 gap-3">
              <label className="font-semibold">업력(년차)</label>
              <input className="w-full h-9 border border-lightGray rounded-md  pl-5 focus:outline-none focus:border-primary" type="text" name="year" />
            </div>
          </div>
          <div className="flex mt-10">
            <div className="flex-1 flex flex-col mx-10 gap-3">
              <label className="font-semibold">베이 수</label>
              <input className="w-full h-9 border border-lightGray rounded-md pl-5 outline-none focus:outline-none focus:border-primary" type="text" name="bay" />
            </div>
            <div className="flex-1 flex flex-col mx-10 gap-3">
              <label className="font-semibold">드라잉존 수</label>
              <input className="w-full h-9 border border-lightGray rounded-md  pl-5 focus:outline-none focus:border-primary" type="text" name="drying" />
            </div>
          </div>
          <div className="flex mt-10">
            <div className="flex-1 flex flex-col mx-10 gap-3">
              <label className="font-semibold">내용</label>
              <textarea className="w-full h-44 py-2 border border-lightGray rounded-md pl-5 outline-none focus:outline-none focus:border-primary resize-none" name="content" required />
            </div>
          </div>
          <div className="flex cursor-pointer">
            <button type="submit" role="button" className="text-lg w-full cursor-pointer text-white p-3 mt-12 rounded-xl opacity-80 hover:opacity-100 transition bg-primary  mx-10">문의하기</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact;