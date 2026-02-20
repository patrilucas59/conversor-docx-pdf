import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = 'solid' | 'outline'
type ButtonColor = 'primary' | 'success' | 'error'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    color?: ButtonColor;
    isPending?: boolean;
}

export function Button({ children, variant = 'solid', color = 'primary', isPending = false,  disabled, className = '', ...props}: ButtonProps) {
    const colors = {
        primary: 'bg-blue-600 hover:bg-blue-700',
        success: 'bg-green-600 hover:bg-green-700',
        error: 'bg-red-600 hover:bg-red-700',
    }

    const variants = {
        solid: 'text-white',
        outline: 'bg-transparent border border-current',
    }

    return (
        <button  
            className={`px-4 py-2 rounded font-medium transition
            ${colors[color]} 
            ${variants[variant]}
            ${className}
            `}
            disabled={disabled || isPending} 
            {...props}
        >
            {isPending ? 'Carregando...' : children}
        </button>
    );
}