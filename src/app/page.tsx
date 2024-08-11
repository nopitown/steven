import SalaryForm from "@/app/_components/SalaryForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-y-4">
      <h2>Ingresa tu consulta sobre tu salario y obtendra el resultado</h2>
      <SalaryForm />
    </main>
  );
}
