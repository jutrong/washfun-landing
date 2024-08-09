"use client";

import React, { RefObject, useRef, useState } from 'react';
import emailjs from "@emailjs/browser";

const Inquiry = () => {
  const form: RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);

  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_INQUIRY_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_INQUIRY_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_INQUIRY_KEY;

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
      } else {
        alert("모든 필드를 채워주세요.");
      }
    }
  }


  return (
    <div className='text-black p-4 pl-6'>
      <h1 className='font-bold text-2xl'>워시펀에게 문의하기</h1>
      <div className='mt-6'>
        <p>워시펀에 궁금하신 사항이 있으신가요?</p>
        <p>아래에 남겨주시면 답변해 드리겠습니다.</p>
      </div>
      <form className='mt-6 flex flex-col gap-4' ref={form} onSubmit={sendEmail}>
        <div className='flex flex-col gap-3'>
          <label className='font-bold'>유저명</label>
          <input className='bg-lightGray py-1 px-2 focus:outline-none' name="name"></input>
        </div>
        <div className='flex flex-col gap-3'>
          <label className='font-bold'>전화번호</label>
          <input className='bg-lightGray py-1  px-2 focus:outline-none' name="phone"></input>
        </div>
        <div className='flex flex-col gap-3'>
          <label className='font-bold'>답변받을 이메일</label>
          <input className='bg-lightGray py-1  px-2 focus:outline-none' name="email"></input>
        </div>
        <div className='flex flex-col gap-3'>
          <label className='font-bold'>문의내용 (자세한 내용을 적어주세요.)</label>
          <textarea className='bg-lightGray h-40 p-3 focus:outline-none' name="content"></textarea>
        </div>
        <button className='bg-primary2 text-white py-2 rounded-md mt-4'>문의하기</button>
      </form>
    </div>
  );
};

export default Inquiry;
