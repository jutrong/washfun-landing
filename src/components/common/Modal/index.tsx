import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Modal = ({ isOpen, onClose, onSubmit }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black "
      onClick={onClose}
    >
      <div
        className="rounded-lg bg-white px-20 py-10 text-black shadow-lg md:w-[300px] md:px-8 md:text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        <p className='mb-5 text-xl font-bold'>
          개인정보 수집 이용에 대한 안내
        </p>
        <div className='mb-5'>
          <p>
            1. 수집하는 개인정보의 항목
          </p>
          <p>
            이름, 전화번호, 이메일, 상호명, 사업장 주소
          </p>
        </div>
        <div className='mb-5'>
          <p>
            2. 개인정보의 수집 및 이용목적
          </p>
          <p>
            - 이름: 서비스 이용에 대한 견적 및 상담 진행을 위한 기본적인 대상자 정보
          </p>
          <p>
            - 전화번호/이메일: 문의 사항에 대한 답변을 전달하기 위한 원활한 의사 소통 경로의 확보
          </p>
          <p>
            - 상호명/사업장 주소: 서비스 이용에 대한 견적 및 상담 진행을 위한 기본적인 정보
          </p>
        </div>
        <div className='mb-10'>
          <p>
            3. 개인정보의 보유 및 이용기간
          </p>
          <p>
            원칙적으로 개인정보의 수집 또는 제공받은 목적 달성 시 지체없이 파기합니다.
            <br />단, 수집목적 및 제공받은 목적이 달성된 경우에도 법률의 규정에 의하여 보존할 필요성이 있는 경우에는
            <br />법률의 규정에 따라 고객의 개인정보를 보유할 수 있습니다.
          </p>
          <p className='mt-3'>
            - 계약 또는 청약철회 등에 관한 기록: 5년
          </p>
          <p>
            - 대금결제 및 재화 등의 공급에 관한 기록: 5년
          </p>
          <p>
            - 소비자의 불만 또는 분쟁 처리에 관한 기록 : 3년 등
          </p>
        </div>
        <div className='flex w-full justify-center gap-10 md:gap-5'>
          <button className=' rounded bg-primary px-32 py-2 text-white opacity-80 md:px-8' type='submit' role='button'>문의하기</button>
          <button className='rounded border border-black px-32 py-2 md:px-8' onClick={onClose}>취소하기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
