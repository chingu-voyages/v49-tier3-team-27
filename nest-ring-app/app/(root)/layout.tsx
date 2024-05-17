export default function RootAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div> root section{children}</div>;
}
