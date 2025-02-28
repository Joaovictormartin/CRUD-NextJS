"use client";

interface NavUserProps {
  title: string;
}

export function Title({ title }: NavUserProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold text-black">{title}</h1>
    </div>
  );
}
