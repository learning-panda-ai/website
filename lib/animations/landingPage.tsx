/** Returns transition prop with optional delay. */
export function td(delay = 0) {
    return { duration: 0.55, delay };
}

export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};