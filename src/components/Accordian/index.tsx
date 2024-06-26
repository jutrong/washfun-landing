"use client"

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const QNA = [
  {
    id: 1,
    title: "기존 회원 카드 잔액은 어떡하나요?",
    answer: "RFID 카드 잔액 확인 후, 점주 웹 페이지에서 해당 고객의 계정에 포인트 충전해주시면 됩니다."
  },
  {
    id: 2,
    title: "설비 설치는 얼마나 시간이 소요되나요?",
    answer: "세차장의 규모에 따라 상이하나, 보통 1일 ~ 2일 내로 마무리가 됩니다. 자동시작시스템까지 설치한다면 최대 3일까지 소요될 수 있습니다."
  },
  {
    id: 3,
    title: "설비 수리는 어떻게 진행되나요?",
    answer: "기존의 기계실 펌프 같은 기계는 해당 업체에 문의 하시면 됩니다.저희 코인 박스와 청소기, 자동시작시스템은 단순 고장건에 대해서만 2년간 무상 A/S가 제공되며, 고장 시 여분 제품을 택배로 보내드립니다! 볼트 체결만으로 손쉽게 교체가 가능합니다"
  },
  {
    id: 4,
    title: "도입 과정은 어떻게 되나요?",
    answer: " 파트너 계약 - 현장 실사 - 시스템 계정 생성 - 설비 설치 순으로 진행됩니다. 설치는 파트너 계약 순에 따라 순차적으로 진행되므로 계약에서 설비 설치까지의 시간은 먼저 계약된 건에 따라 달라질 수 있습니다."
  }

]

const Accordian = () => {

  const [openId, setOpenId] = useState<number | null>(null); // 현재 열린 항목의 ID를 저장

  const toggleOpen = (id: number) => setOpenId(openId === id ? null : id);

  return (
    <div className="w-full  mb-52 text-black">
      <div className="flex justify-center items-center mt-32 mb-20">
        <p className="font-bold text-4xl">자주 묻는 질문</p>
      </div>
      {QNA.map((qna) => {
        return (
          <motion.div className=" flex justify-center " key={qna.id}>
            <div className="w-3/4 cursor-pointer">
              <div>
                <motion.div layout className="flex justify-between items-center h-20 px-10" onClick={() => toggleOpen(qna.id)}>
                  <p className="font-bold text-xl">{qna.title}</p>
                  <motion.img
                    src={openId === qna.id ? "/images/svg/close.svg" : "/images/svg/plus.svg"}
                    alt="toggle"
                    width={30}
                    height={30}
                    animate={{ rotate: openId === qna.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
              <AnimatePresence>
                {openId === qna.id &&
                  <motion.div
                    initial={{ opacity: 0, maxHeight: 0 }}
                    animate={{ opacity: 1, maxHeight: "200px" }}
                    transition={{ duration: 0.5, type: "tween" }}
                    exit={{ opacity: 0, maxHeight: 0 }}
                    style={{ overflow: 'hidden' }}
                    className="px-20"
                  >
                    <p className="text-gray my-4">{qna.answer}</p>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </motion.div>
        )
      })}

    </div>
  )
}

export default Accordian;