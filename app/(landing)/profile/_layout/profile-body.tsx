export default function ProfileBody({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="flex flex-col gap-8 w-full">
      <h1 className="text-3xl md:block hidden text-gray-900 leading-tight px-4">
        {title}
      </h1>
      {children}
    </section>
  );
}
