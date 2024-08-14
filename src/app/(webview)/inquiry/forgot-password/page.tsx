import Link from "next/link";

const ForgotPassword = () => {

  return (
    <div className="w-screen  text-black pt-10 p-5">
      <h1 className="font-bold text-xl">만약 이메일을 등록하지 않고 비밀번호를 잊으셨다면 아래 내용과 함께 고객센터에 문의 남겨 주세요.</h1>
      <p className="mt-2 text-sm">아래 내용이 확인되지 않으면 워시펀 팀에서 확인할 수 없어요.</p>
      <div className="mt-10 flex flex-col gap-4">
        <p>1. 기존 계정에 등록된 휴대전화번호(이전에 사용했던 번호)</p>
        <p>2. 회원가입 시 등록한 이름</p>
      </div>
      <div className="mt-10 flex flex-col gap-4">
        <p className="font-bold text-xl mb-4">💁 이후 복구 방법 안내</p>
        <p>1. 워시펀이 확인하는 즉시, 문자로 임시 비밀번호를 보내드려요.</p>
        <p>2. 기존 앱은 모두 로그아웃이 돼요.</p>
        <p>3. 문자로 받은 임시 비밀번호로 다시 로그인해주세요.</p>
        <p>4. 마이페이지에서 비밀번호를 변경해주세요.</p>
      </div>
      <Link href="/inquiry">
        <div className="text-right">
          <button className="mt-8 text-subPrimary py-2 px-4 font-bold">문의하러 가기</button>
        </div>
      </Link>
    </div>
  )
}

export default ForgotPassword;