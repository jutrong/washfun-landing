import Link from "next/link";

const ChangePhoneNumber = () => {

  return (
    <div className="w-screen  text-black pt-10 p-5">
      <h1 className="font-bold text-xl">만약 이메일을 등록하지 않았다면 아래 내용과 함께 고객센터에 문의 남겨 주세요.</h1>
      <p className="mt-2 text-sm">아래 내용이 확인되지 않으면 워시펀 팀에서 번호를 변경할 수 없어요.</p>
      <div className="mt-10 flex flex-col gap-4">
        <p>1. 기존 계정에 등록된 휴대전화번호(이전에 사용했던 번호)</p>
        <p>2. 기존 계정 유저명</p>
        <p>3. 기존 계정 비밀번호</p>
        <p>4. 바뀐 휴대전화번호</p>
        <p>5. 바뀐 휴대전화번호로 이미 가입한 계정이 있을 경우, 탈퇴처리하는 것에 동의하시나요(예/아니요)</p>
        <p>* 동의 후 탈퇴 처리된 계정에 대해서는 복구가 어려운 점 참고 부탁 드려요.</p>
      </div>
      <Link href="/inquiry">
        <div className="text-right">
          <button className="mt-8 text-subPrimary py-2 px-4 font-bold">문의하러 가기</button>
        </div>
      </Link>
    </div>
  )
}

export default ChangePhoneNumber;