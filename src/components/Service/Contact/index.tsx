import { RefObject, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Modal from "@/components/common/Modal";


const Contact = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const form: RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);

  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY;

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current !== null &&
      serviceID !== undefined &&
      templateID !== undefined &&
      publicKey !== undefined) {
      emailjs
        .sendForm(
          serviceID,
          templateID,
          form.current,
          {
            publicKey: publicKey
          }
        )
        .then(
          (result) => {
            console.log(result.text);
            (e.target as HTMLFormElement).reset();
            setModalOpen(false);
            alert("문의가 성공적으로 전송되었습니다.");
          }, (error) => {
            console.log(error.text);
            console.log(error)
            alert("문의 전송에 실패했습니다. 다시 시도해주세요.");
          });
    } else {
      alert("문의 전송에 실패했습니다. 다시 시도해주세요...");
    }
  };

  const onClickContactBtn = () => {
    if (form.current) {
      const allFieldsFilled = Array.from(form.current.elements).every(element => {
        const input = element as HTMLInputElement;
        return input.value.trim() !== '';
      });

      if (allFieldsFilled) {
        setModalOpen(true);
      } else {
        alert("모든 필드를 채워주세요.");
      }
    }
  }

  return (
    <>
      <div className=" my-0 flex size-full flex-col items-center gap-20 bg-gradient-to-t  from-lightPrimary to-white px-36  text-black xl:px-10 md:mt-0 md:px-0 md:pt-20" >
        <div className="flex size-full py-20 pb-10 lg:flex-col md:flex-col ">
          <div className="mt-44 flex flex-[2] flex-col items-start gap-4 text-2xl font-semibold lg:items-start md:mt-0 ">
            <p className="ml-20 md:ml-10">편리하고 체계적인</p>
            <p className="ml-20 md:ml-10">세차장 관리</p>
            <p className="ml-20 md:ml-10">워시펀과 함께 만들어 나갑니다.</p>
          </div>
          <form ref={form} onSubmit={sendEmail} className="flex-[3] p-32 md:mt-20 md:justify-center md:p-0 ">
            <div className="flex md:flex-col md:gap-6">
              <div className="mx-10 flex min-w-[200px] flex-1 flex-col">
                <input className="h-9 w-full rounded-md border border-lightGray pl-5 outline-none placeholder:text-sm focus:border-primary focus:outline-none" type="text" name="name" placeholder="이름" />
              </div>
              <div className="mx-10 flex min-w-[200px] flex-1 flex-col">
                <input className="h-9 w-full rounded-md border border-lightGray  pl-5 placeholder:text-sm focus:border-primary focus:outline-none" type="email" name="email" placeholder="이메일" />
              </div>
            </div>
            <div className="mt-6 flex md:flex-col md:gap-6">
              <div className="mx-10 flex min-w-[200px] flex-1 flex-col">
                <input className="h-9 w-full rounded-md border border-lightGray pl-5 outline-none placeholder:text-sm focus:border-primary focus:outline-none" type="text" name="address" placeholder="사업장 주소" required />
              </div>
              <div className="mx-10 flex min-w-[200px] flex-1  flex-col">
                <input className="h-9 w-full rounded-md border border-lightGray pl-5 outline-none placeholder:text-sm focus:border-primary focus:outline-none" type="text" name="phone" placeholder="전화번호" required />
              </div>
            </div>
            <div className="mt-6 flex md:flex-col md:gap-6">
              <div className="mx-10 flex min-w-[200px] flex-1  flex-col">
                <input className="h-9 w-full rounded-md border border-lightGray pl-5 outline-none placeholder:text-sm focus:border-primary focus:outline-none" type="text" name="store_name" placeholder="상호명" required />
              </div>
              <div className="mx-10 flex min-w-[200px] flex-1  flex-col">
                <input className="h-9 w-full rounded-md border border-lightGray  pl-5 placeholder:text-sm focus:border-primary focus:outline-none" type="text" name="year" placeholder="입력(년차)" required />
              </div>
            </div>
            <div className="mt-6 flex md:flex-col md:gap-6">
              <div className="mx-10 flex min-w-[200px] flex-1  flex-col">
                <input className="h-9 w-full rounded-md border border-lightGray pl-5 outline-none placeholder:text-sm focus:border-primary focus:outline-none" type="text" name="bay" placeholder="베이 수" required />
              </div>
              <div className="mx-10 flex min-w-[200px] flex-1  flex-col">
                <input className="h-9 w-full rounded-md border border-lightGray  pl-5 placeholder:text-sm focus:border-primary focus:outline-none" type="text" name="drying" placeholder="드라잉존 수" required />
              </div>
            </div>
            <div className="mt-6 flex">
              <div className="mx-10 flex flex-1 flex-col">
                <label className="mb-4 pl-2">문의 사항</label>
                <textarea className="h-44 w-full resize-none rounded-md border border-lightGray py-2 pl-5 outline-none focus:border-primary focus:outline-none" name="content" required />
              </div>
            </div>
            <div className="flex cursor-pointer justify-end">
              <div onClick={onClickContactBtn} className="mx-10 mt-6 w-36 cursor-pointer rounded-md bg-primary p-2 text-center text-base text-white opacity-80  transition hover:opacity-100">문의하기</div>
            </div>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={sendEmail} />
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact;