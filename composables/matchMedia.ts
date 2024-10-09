type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, string> = {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
};

export const getBreakpoint = (): Breakpoint | null => {
    if (window.matchMedia(breakpoints['2xl']).matches) {
        return '2xl';
    } else if (window.matchMedia(breakpoints.xl).matches) {
        return 'xl';
    } else if (window.matchMedia(breakpoints.lg).matches) {
        return 'lg';
    } else if (window.matchMedia(breakpoints.md).matches) {
        return 'md';
    } else if (window.matchMedia(breakpoints.sm).matches) {
        return 'sm';
    }
    return null; // If no breakpoints are matched
};


