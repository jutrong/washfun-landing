const SERVICE_TERMS_URL = "https://grand-balmoral-3e3.notion.site/ebd/40f07002948980ecae65dee07489a5e0";

const TermsOfService = () => {
  return (
    <iframe
      src={SERVICE_TERMS_URL}
      title="서비스 이용약관"
      className="block h-dvh w-full border-0"
    />
  );
};

export default TermsOfService;
