const MARKETING_CONSENT_URL = "https://grand-balmoral-3e3.notion.site/ebd/40f0700294898036bff9cdb14b8a4386";

const TermsOfMarketing = () => {
  return (
    <iframe
      src={MARKETING_CONSENT_URL}
      title="마케팅 정보 수신 동의"
      className="block h-dvh w-full border-0"
    />
  );
};

export default TermsOfMarketing;
