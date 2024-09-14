// import Image from "next/image";

// const TermsOfLocation = () => {
//   return (
//     <div className="size-full flex justify-center">
//       <div className="flex w-[1200px] justify-center">
//         <Image src="/images/png/termsOfLocation.png" width={1900} height={10000} alt="policy" />
//       </div>
//     </div>
//   )
// }

// export default TermsOfLocation;

'use client';

import axios from 'axios';
import { useState } from 'react';

const CardPage = () => {
  const [phoneNumber1, setPhoneNumber1] = useState('');
  const [phoneNumber2, setPhoneNumber2] = useState('');
  const [phoneNumber3, setPhoneNumber3] = useState('');
  const [cardNumber1, setCardNumber1] = useState('');
  const [cardNumber2, setCardNumber2] = useState('');
  const [cardNumber3, setCardNumber3] = useState('');
  const [cardNumber4, setCardNumber4] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const postCard = async (payload: {
    phone: string;
    cardNo: string;
    expYear: string;
    expMonth: string;
    idNo: string;
    cardPw: string;
    holderName: string
  }) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/v0/user/card/temp`, payload)

      alert('카드 등록 성공')
      return response.data;
    } catch (error) {
      console.log(error)
      alert('카드 등록 실패')
    }
  }

  const onClickBtn = () => {
    const fullPhoneNumber = `${phoneNumber1}${phoneNumber2}${phoneNumber3}`;
    const fullCardNumber = `${cardNumber1}${cardNumber2}${cardNumber3}${cardNumber4}`;

    postCard({
      phone: fullPhoneNumber,
      cardNo: fullCardNumber,
      expYear: expiryYear,
      expMonth: expiryMonth,
      idNo: birthdate,
      cardPw: password,
      holderName: name,
    })
  }

  console.log(phoneNumber1, phoneNumber2, phoneNumber3, cardNumber1, cardNumber2, cardNumber3, cardNumber4, expiryMonth, expiryYear, cvc, password, name, birthdate)
  return (
    <div className="w-full mx-auto my-4 p-8 bg-white shadow-md rounded-lg text-black">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">카드 등록</h2>
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={phoneNumber1}
              onChange={(e) => setPhoneNumber1(e.target.value)}
              maxLength={3}
              required
              className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="flex items-center">-</span>
            <input
              type="text"
              value={phoneNumber2}
              onChange={(e) => setPhoneNumber2(e.target.value)}
              maxLength={4}
              required
              className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="flex items-center">-</span>
            <input
              type="text"
              value={phoneNumber3}
              onChange={(e) => setPhoneNumber3(e.target.value)}
              maxLength={4}
              required
              className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">카드번호</label>
          <div className="flex gap-2">
            {[cardNumber1, cardNumber2, cardNumber3, cardNumber4].map((value, index) => (
              <input
                key={index}
                type={index < 2 ? "text" : "password"}
                value={value}
                onChange={(e) => {
                  const setters = [setCardNumber1, setCardNumber2, setCardNumber3, setCardNumber4];
                  setters[index](e.target.value);
                }}
                maxLength={4}
                required
                className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">유효기간</label>
            <div className="flex gap-1">
              <input
                type="text"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
                placeholder="MM"
                maxLength={2}
                required
                className="w-1/2 p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="flex items-center">/</span>
              <input
                type="text"
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
                placeholder="YY"
                maxLength={2}
                required
                className="w-1/2 p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">CVC번호</label>
            <input
              type="password"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              maxLength={3}
              required
              className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 앞 두자리</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={2}
            required
            className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">실명</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">생년월일 6자리</label>
          <input
            type="text"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            placeholder="YYMMDD"
            maxLength={6}
            required
            className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => onClickBtn()}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          카드 등록
        </button>
      </div>
    </div>
  );
};

export default CardPage;
