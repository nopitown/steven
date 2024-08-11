"use client";

import { useFormState, useFormStatus } from "react-dom";

import { calculateSalary } from "../calculate-salary.action";

const initialState = {
  grossSalary: 0,
};

function SalaryForm() {
  const [state, formAction] = useFormState(calculateSalary, initialState);

  return (
    <form className="w-full" action={formAction}>
      <textarea name="query" className="w-full" />
      <SalaryFormButton />
      <h3>Tu salario a pedir es: {state?.grossSalary}</h3>
    </form>
  );
}

function SalaryFormButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-slate-700 text-white p-4"
    >
      {pending ? "Calculando..." : "Calcular"}
    </button>
  );
}

export default SalaryForm;
