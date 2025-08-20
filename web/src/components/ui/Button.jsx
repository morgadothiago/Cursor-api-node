import React from 'react'
import { cn } from '@/lib/utils'

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  
  const variants = {
    default: 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:translate-y-[-2px] hover:shadow-blue-200',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-blue-200 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-300',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline'
  }
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10'
  }
  
  const Comp = asChild ? 'span' : 'button'
  
  return (
    <Comp
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = 'Button'

export { Button }