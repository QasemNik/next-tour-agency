import CheckOtpForm from "@/components/CheckOtpForm";

export default function VerifyOtpPage() {
  return (
    <>
      <div className=" fixed inset-0 flex justify-center items-center backdrop-blur-xs transition-all duration-500">
        <CheckOtpForm />
      </div>
    </>
  );
}
