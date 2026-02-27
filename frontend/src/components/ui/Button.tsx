import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = 'solid' | 'outline'
type ButtonColor = 'primary' | 'success' | 'error'
type LoadingPosition = 'start'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    color?: ButtonColor;
    isPending?: boolean;
    loadingPosition?: LoadingPosition;
}

function Spinner() {
  return (
    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );
}

export function Button({ 
    children, 
    variant = 'solid', 
    color = 'primary', 
    isPending = false, 
    disabled,
    loadingPosition = 'start',
    ...props
}: ButtonProps) {

    const colors = {
        primary: 'bg-blue-600 hover:bg-blue-700',
        success: 'bg-green-600 hover:bg-green-700',
        error: 'bg-red-600 hover:bg-red-700',
    }

    const variants = {
        solid: 'text-white',
        outline: 'bg-transparent border border-current',
    }

    const loadingPositions = {
        start: 'flex-row',
    }

    return (
        <button
        className={`px-4 py-2 rounded font-medium transition
        flex items-center justify-center gap-2
        ${colors[color]}
        ${variants[variant]}
        ${loadingPositions[loadingPosition]}
        disabled:opacity-70 disabled:cursor-not-allowed
        `}
        disabled={disabled || isPending}
        {...props}
        >
        {isPending && <Spinner />}
        {children}
        </button>
    );
}