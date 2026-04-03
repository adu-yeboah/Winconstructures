import React from 'react';

interface HeadProps {
  head: string;
}

export default function Head({ head }: HeadProps) {
  return (
    <div className="text-2xl text-secondary my-3 font-bold">
      {head}
    </div>
  );
}