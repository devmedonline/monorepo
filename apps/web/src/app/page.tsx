const getMessageFromNestJS = async () => {
  const response = await fetch('http://localhost:3000/api');
  const text = await response.text();
  return text;
};

export default async function Home() {
  const message = await getMessageFromNestJS();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Welcome to web!</h1>
      <p className="text-2xl font-bold">{message}</p>
    </main>
  );
}
