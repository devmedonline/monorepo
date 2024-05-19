type RegisterResponse = {
  data: {
    id: string;
    email: string;
    name: string;
    verified: boolean;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  };
};

export async function fetchSignUp(
  formData: FormData
): Promise<RegisterResponse> {
  const password = formData.get("password");
  const name = formData.get("name");
  const email = formData.get("email");

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  if (response.ok) {
    return response.json();
  }

  const failed = await response.json();

  const intl = new Intl.ListFormat("pt-BR", {
    style: "long",
    type: "conjunction",
  });

  throw new Error(
    Array.isArray(failed.message) ? intl.format(failed.message) : failed.message
  );
}
