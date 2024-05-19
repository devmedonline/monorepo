export async function fetchSignIn(email: string, password: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (response.ok) {
    const ok = await response.json();
    return ok;
  }

  const failed = await response.json();

  const intl = new Intl.ListFormat("pt-BR", {
    style: "long",
    type: "conjunction",
  });

  throw new Error(intl.format(failed.message));
}
