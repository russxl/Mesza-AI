import { type ClassValue, clsx } from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Forward ref implementation using type assertion to avoid TypeScript errors
export function fr<T, P extends object = {}>(
  component: React.ForwardRefRenderFunction<T, P>
) {
  // Use type assertion to work around TypeScript limitations
  return forwardRef(component as any) as ReturnType<typeof forwardRef<T, P>>;
}

// styled element
export function se<
  T = HTMLElement,
  P extends React.HTMLAttributes<T> = React.HTMLAttributes<T>
>(Tag: keyof React.ReactHTML, ...classNames: ClassValue[]) {
  const component = fr<T, P>(({ className, ...props }, ref) => (
    // @ts-expect-error Too complicated for TypeScript
    <Tag ref={ref} className={cn(...classNames, className)} {...props} />
  ));
  component.displayName = Tag[0].toUpperCase() + Tag.slice(1);
  return component;
}
