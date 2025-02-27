"use client";

import React, { RefObject, useRef, useState } from 'react';
import emailjs from "@emailjs/browser";

const Inquiry = () => {
  const form: RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    content: ''
  });

  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_INQUIRY_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_INQUIRY_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_INQUIRY_KEY;

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current || !isFormValid()) {
      return;
    }

    if (serviceID !== undefined &&
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
            setFormData({
              name: '',
              phone: '',
              email: '',
              content: ''
            });
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

  return (
    <div className='relative flex min-h-screen flex-1 flex-col gap-[12px] bg-[#F9F9FA] p-[20px] text-black'>
      <h1 className='text-2xl font-bold'>워시펀에게 문의하기</h1>
      <div className='mt-6'>
        <p>워시펀에 대해 궁금하거나 불편한 점이 있으셨나요?</p>
        <p>아래에 남겨주시면, 빠르고 정확하게 답변드리겠습니다!.</p>
      </div>
      <form className='mt-6 flex flex-col gap-4 pb-[80px]' ref={form} onSubmit={sendEmail}>
        <div className='flex flex-col gap-3'>
          <label className='text-[14px] font-medium text-[#6B7280]'>닉네임</label>
          <input
            className='rounded-[16px] border border-[#E1E3E6] bg-white px-[12px] py-[14px] focus:outline-none'
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder='닉네임을 입력해주세요.'
          />
        </div>
        <div className='flex flex-col gap-3'>
          <label className='text-[14px] font-medium text-[#6B7280]'>전화번호</label>
          <input
            className='rounded-[16px] border border-[#E1E3E6] bg-white px-[12px] py-[14px] focus:outline-none'
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder='010-0000-0000'
          />
        </div>
        <div className='flex flex-col gap-3'>
          <label className='text-[14px] font-medium text-[#6B7280]'>답변 받으실 이메일</label>
          <input
            className='rounded-[16px] border border-[#E1E3E6] bg-white px-[12px] py-[14px] focus:outline-none'
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder='example@gmail.com'
          />
        </div>
        <div className='flex flex-col gap-3'>
          <label className='text-[14px] font-medium text-[#6B7280]'>문의 내용을 자세히 작성해주세요!</label>
          <textarea
            className='h-52 rounded-[16px] border border-[#E1E3E6] bg-white px-[12px] py-[14px] focus:outline-none'
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder='문의 내용을 자세히 작성해주세요.'
          />
        </div>
        <div className='fixed inset-x-0 bottom-0 bg-[#F9F9FA] p-[20px]'>
          <button
            className={`h-[48px] w-full rounded-md py-2 text-white ${isFormValid() ? 'bg-primary2' : 'cursor-not-allowed bg-[#E1E3E6]'
              }`}
            disabled={!isFormValid()}
          >
            문의하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inquiry;
