import { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-hh-white sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 text-lg text-hh-gray">{subtitle}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
