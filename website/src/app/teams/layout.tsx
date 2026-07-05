export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#030508]">
      {children}
    </div>
  );
}
