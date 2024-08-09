import LoginForm from "@/components/LoginForm";

export default function Login() {
    return (
      <>
        <div className="flex items-center justify-center">
          <div className="w-96 h-[36rem] mt-6 rounded-2xl shadow-xl bg-white border-opacity-25 border-2 border-sky-500 flex flex-col items-center p-8">
            <p className="text-center text-xl font-bold">Log in</p>
            <div className="w-full h-0.5 bg-sky-500 my-4"></div>
            <LoginForm/>
            <p className="text-center text-sm mt-2">or</p>
            <div className="w-full h-0.5 bg-sky-500 my-4"></div>
            <p className="text-center text-sm">Log in with Google</p>
          </div>
        </div>
      </>
    );
}