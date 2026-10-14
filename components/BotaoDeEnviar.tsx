"use client";

import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  enviando: string;
};

export default function BotaoDeEnviar({ children, enviando }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? enviando : children}
    </button>
  );
}
