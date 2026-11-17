"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import Button from "../Button";
import Checkbox from "../Checkbox";
import TextField from "../TextField";
import { ToastSurface } from "../Toast";

const label = "mb-x2 text-t2 font-bold text-fg-neutral-subtle";
const card = "rounded-r4 bg-bg-layer-default p-x5";

const digits = (text: string) => text.replace(/\D/g, "");

/** 치는 대로 010-1234-5678 모양으로 보여 준다. */
function formatPhone(text: string) {
  const d = digits(text).slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

/** 세 자리마다 쉼표를 넣는다. */
function formatAmount(text: string) {
  const d = digits(text).slice(0, 7);
  return d ? Number(d).toLocaleString("ko-KR") : "";
}

const TERMS = [
  { key: "service", label: "(필수) 서비스 이용약관", required: true },
  { key: "privacy", label: "(필수) 개인정보 수집과 이용", required: true },
  { key: "marketing", label: "(선택) 혜택 알림 받기", required: false },
];

/** 고객 앱 가입: 칸을 떠날 때와 보내기를 눌렀을 때만 검사한다. 버튼은 늘 누를 수 있다. */
function SignUp() {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string>();
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string>();
  const [agreed, setAgreed] = useState<Record<string, boolean>>({});
  const [termsError, setTermsError] = useState(false);
  const [done, setDone] = useState(false);

  const phoneValid = digits(phone).length === 11;
  const allAgreed = TERMS.every((term) => agreed[term.key]);

  const checkPhone = () => setPhoneError(phone && !phoneValid ? "휴대폰 번호를 다시 확인해주세요" : undefined);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextPhoneError = phoneValid ? undefined : "휴대폰 번호를 입력해주세요";
    const nextCodeError = code.length === 6 ? undefined : "인증번호 6자리를 입력해주세요";
    const nextTermsError = TERMS.some((term) => term.required && !agreed[term.key]);
    setPhoneError(nextPhoneError);
    setCodeError(nextCodeError);
    setTermsError(nextTermsError);
    setDone(!nextPhoneError && !nextCodeError && !nextTermsError);
  };

  if (done) {
    return (
      <div className={`${card} flex flex-col items-center gap-x4 text-center`}>
        <div>
          <p className="text-t5 font-bold text-fg-neutral">가입을 마쳤어요</p>
          <p className="mt-x1 text-t4 text-fg-neutral-muted">이제 이 번호로 포인트를 충전할 수 있어요</p>
        </div>
        <Button variant="secondary" size="medium" onClick={() => setDone(false)}>
          처음으로
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className={`${card} flex flex-col gap-x6`}>
      <div className="flex flex-col gap-x4">
        <div className="flex items-start gap-x2">
          <TextField
            label="휴대폰 번호"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="010-1234-5678"
            value={phone}
            onChangeText={(text) => {
              setPhone(formatPhone(text));
              setPhoneError(undefined);
            }}
            onBlur={checkPhone}
            helperText={sent ? "인증번호를 보냈어요. 3분 안에 입력해주세요." : "숫자만 입력해주세요"}
            errorText={phoneError}
          />
          {/* 레이블 한 줄만큼 내려 입력 칸과 높이를 맞춘다. */}
          <Button variant="outline" className="mt-x8 shrink-0" disabled={!phoneValid} onClick={() => setSent(true)}>
            {sent ? "다시 받기" : "인증번호 받기"}
          </Button>
        </div>
        <TextField
          label="인증번호"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="6자리"
          value={code}
          onChangeText={(text) => {
            setCode(digits(text).slice(0, 6));
            setCodeError(undefined);
          }}
          errorText={codeError}
        />
        <TextField label="차량 번호 (선택)" placeholder="12가3456" helperText="띄어쓰기 없이 입력해주세요" />
      </div>

      <fieldset className="flex flex-col">
        <legend className="mb-x2 text-t4 font-medium text-fg-neutral">약관 동의</legend>
        <Checkbox
          label="모두 동의"
          checked={allAgreed}
          onCheckedChange={(checked) => {
            setAgreed(Object.fromEntries(TERMS.map((term) => [term.key, checked])));
            setTermsError(false);
          }}
        />
        <div className="flex flex-col border-t border-stroke-neutral-weak pt-x1">
          {TERMS.map((term) => (
            <Checkbox
              key={term.key}
              size="small"
              label={term.label}
              checked={Boolean(agreed[term.key])}
              invalid={termsError && term.required && !agreed[term.key]}
              onCheckedChange={(checked) => {
                setAgreed((before) => ({ ...before, [term.key]: checked }));
                setTermsError(false);
              }}
            />
          ))}
        </div>
        {termsError ? (
          <p role="alert" className="mt-x1 text-t3 text-fg-critical">
            필수 약관에 동의해주세요
          </p>
        ) : null}
      </fieldset>

      <Button type="submit" fullWidth>
        가입하기
      </Button>
    </form>
  );
}

/** 파트너 웹 상품 가격: 범위는 도움말로 먼저 알리고, 벗어나면 칸을 떠날 때 같은 자리에 알린다. */
function PriceSetting() {
  const [price, setPrice] = useState("3,000");
  const [error, setError] = useState<string>();
  const [saved, setSaved] = useState(false);

  const check = () => {
    const value = Number(digits(price));
    const ok = value >= 100 && value <= 20000;
    setError(ok ? undefined : "가격은 100원 이상 20,000원 이하로 설정해주세요.");
    return ok;
  };

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(check());
      }}
      className={`${card} flex flex-col gap-x4`}
    >
      <TextField
        label="상품 가격"
        inputMode="numeric"
        suffix="원"
        value={price}
        onChangeText={(text) => {
          setPrice(formatAmount(text));
          setError(undefined);
          setSaved(false);
        }}
        onBlur={check}
        helperText="100원 이상 20,000원 이하로 입력해주세요."
        errorText={error}
      />
      <div className="flex items-center gap-x3">
        <Button type="submit" size="medium">
          저장하기
        </Button>
        {saved ? <ToastSurface tone="positive" message="가격을 저장했습니다." /> : null}
      </div>
    </form>
  );
}

/** 랜딩 문의: 선택이 더 많은 폼이므로 필수 칸에 표시한다. */
function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={`${card} text-center`}>
        <p className="text-t4 text-fg-neutral">문의를 보냈습니다. 확인한 뒤 연락드리겠습니다.</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        setSent(Boolean(name.trim()) && digits(phone).length >= 9);
      }}
      className={`${card} flex flex-col gap-x4`}
    >
      <TextField
        label="이름 (필수)"
        size="medium"
        autoComplete="name"
        value={name}
        onChangeText={setName}
        errorText={submitted && !name.trim() ? "이름을 입력해주세요." : undefined}
      />
      <TextField
        label="연락처 (필수)"
        size="medium"
        inputMode="numeric"
        autoComplete="tel"
        placeholder="010-1234-5678"
        value={phone}
        onChangeText={(text) => setPhone(formatPhone(text))}
        errorText={submitted && digits(phone).length < 9 ? "연락처를 입력해주세요." : undefined}
      />
      <TextField label="매장 이름" size="medium" />
      <Button type="submit" size="medium" fullWidth>
        문의 보내기
      </Button>
    </form>
  );
}

export default function demo(thumb: boolean): ReactNode {
  if (thumb) {
    return (
      <div className="flex w-full max-w-xs flex-col gap-x3">
        <TextField label="휴대폰 번호" size="medium" defaultValue="010-1234-5678" helperText="숫자만 입력해주세요" />
        <Button size="medium" fullWidth>
          인증번호 받기
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x8 md:grid-cols-1">
      <div>
        <p className={label}>고객 앱 가입 · 칸을 떠날 때와 보낼 때 검사</p>
        <SignUp />
      </div>
      <div>
        <p className={label}>파트너 웹 상품 가격 · 범위를 도움말로 먼저</p>
        <PriceSetting />
        <p className={`mt-x8 ${label}`}>랜딩 문의 · 필수 칸만 표시</p>
        <Contact />
      </div>
    </div>
  );
}
