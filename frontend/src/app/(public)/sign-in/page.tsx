import LogoLorem from "../../../../public/svg/mark/logo-lorem";
import SignInForm from "./_components/form-sign-in";


export default function SignIn() {

  return (
    <main className="flex min-h-screen">
      <section
        className="flex min-h-screen w-1/2 items-center justify-center bg-normal border-none border-r rounded-tr-4xl rounded-br-4xl"
        style={{ boxShadow: "10px 0 10px -5px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="flex justify-center items-center flex-col gap-7">
          <LogoLorem className="w-96 h-20" />
          <p className="w-110 text-center font-medium text-white text-wrap">
            Gerencie seu cardápio online com praticidade, otimizando seu
            estabelecimento de forma simples e segura.
          </p>
        </div>
      </section>
      <SignInForm />
    </main>
  );
}