"use server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT,
});

const SalaryInputResponse = z.object({
  netSalary: z.number(),
});

export async function calculateSalary(
  previousState: unknown,
  formData: FormData,
): Promise<{ grossSalary: number } | void> {
  const rawFormData = {
    query: formData.get("query"),
  };

  const prompt = `
  Extract the following variables from the user's query:
  - netSalary

  User Query: '${rawFormData.query}'
  `;

  try {
    const response = await openai.beta.chat.completions.parse({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      response_format: zodResponseFormat(
        SalaryInputResponse,
        "salary_response",
      ),
    });

    const output = response.choices.at(0)?.message;

    if (output?.refusal) {
      return;
    }
    const netSalary = output?.parsed?.netSalary;

    if (!netSalary) {
      return;
    }

    // Dummy
    return { grossSalary: netSalary * 2 };
  } catch (error) {
    console.error("Error extracting variables:", error);
    throw new Error("Failed to extract variables from the query");
  }
}
