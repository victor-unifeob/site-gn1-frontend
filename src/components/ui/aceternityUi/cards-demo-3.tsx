"use client";
import { animate } from "motion/react";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function CardDemo() {
  return (
    <Card>
      <CardSkeletonContainer>
        <Skeleton />
      </CardSkeletonContainer>
      <CardTitle>
        Principais marcas
      </CardTitle>
      <CardDescription>
        Compare e escolha entre os modelos elétricos e híbridos das marcas mais prestigiadas do mercado.
      </CardDescription>
    </Card>
  );
}

const Skeleton = () => {
  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  const sequence = [
    [
      ".circle-1",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-2",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-3",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-4",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-5",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
  ];

  useEffect(() => {
    animate(sequence, {
      // @ts-ignore
      repeat: Infinity,
      repeatDelay: 1,
    });
  }, []);

  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row shrink-0 justify-center items-center gap-2">
        <Container className="h-10 w-10 circle-1">
          <Image
            src="/brands/volvo-logo.svg"
            alt="BMW"
            width={24}
            height={24}
            className="object-contain dark:invert"
          />
        </Container>
        <Container className="h-14 w-14 circle-2">
          <Image
            src="/brands/bmw-logo.svg"
            alt="Porsche"
            width={32}
            height={32}
            className="object-contain"
          />
        </Container>
        <Container className="circle-3">
          <Image
            src="/brands/byd-logo.svg"
            alt="BYD"
            width={40}
            height={40}
            className="object-contain"
          />
        </Container>
        <Container className="h-14 w-14 circle-4">
          <Image
            src="/brands/gwm-logo.svg"
            alt="Zeekr"
            width={32}
            height={32}
            className="object-contain dark:invert"
          />
        </Container>
        <Container className="h-10 w-10 circle-5">
          <Image
            src="/brands/tesla-logo.svg"
            alt="Mini"
            width={24}
            height={24}
            className="object-contain"
          />
        </Container>
      </div>

      <div className="h-40 w-px absolute top-15 m-auto z-40 bg-gradient-to-b from-transparent via-green-500 to-transparent animate-move"></div>
    </div>
  );
};

// Resto dos componentes permanecem inalterados
export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-full mx-auto p-10 rounded-xl dark:bg-bg-secondary/90 bg-secondary/90 group flex flex-col justify-between min-h-[400px] shadow",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-xl font-semibold mb-3",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-gray-500 dark:text-gray-400",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-[15rem] md:h-[18rem] rounded-xl z-40 flex-1",
        className,
        showGradient &&
        "bg-slate-200 dark:bg-slate-800 [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
      )}
    >
      {children}
    </div>
  );
};

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `h-19 w-19 rounded-full flex items-center justify-center bg-secondary dark:bg-slate-900 shadow-xl`,
        className
      )}
    >
      {children}
    </div>
  );
};