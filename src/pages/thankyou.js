import { useRouter } from "next/router";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Thank You!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your message has been successfully sent. We'll get back to you soon!
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
}
