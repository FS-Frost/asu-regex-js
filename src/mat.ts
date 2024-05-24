export function hexToNumber(s: string): number {
    return parseInt(s, 16);
}

export function numberToHex(n: number): string {
    const int = Math.floor(n);
    return int.toString(16).padStart(2, "0").toUpperCase();
}

export function interpolate(min: number, max: number, intervals: number): number[] {
    const reverse = min > max;
    let actualMax = max;
    let actualMin = min;
    if (reverse) {
        actualMax = min;
        actualMin = max;
    }

    const range = actualMax - actualMin;
    const step = range / intervals;
    let sum = actualMin;

    // Enforce min as first value
    const interpolations: number[] = [actualMin];

    for (let i = 1; i < intervals; i++) {
        sum += step;

        if (sum > actualMax) {
            sum = actualMax;
        }

        interpolations.push(sum);
    }

    // Enforce max as last value
    interpolations[intervals - 1] = actualMax;

    if (reverse) {
        interpolations.reverse();
    }

    return interpolations;
}

export function truncate(n: number, decimals: number): number {
    decimals = Math.floor(decimals);
    const regexPattern = `/(-?\d+\.?\d{{1,${decimals}}})/`;
    const regexNumber = new RegExp(regexPattern);
    const match = n.toString().match(regexNumber);
    if (!match || match.length === 0) {
        return n;
    }

    const truncatedNumber = Number(match[0]);
    return truncatedNumber;
}
