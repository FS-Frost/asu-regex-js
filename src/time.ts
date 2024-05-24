export type Time = {
    hours: number;
    minutes: number;
    seconds: number;
};

export function secondsToTime(seconds: number): Time {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((((seconds / 3600) - hours) * 60));
    seconds = seconds - hours * 3600 - minutes * 60;

    return {
        hours,
        minutes,
        seconds,
    };
}

export function parseTime(text: string): Time | null {
    const regexTime = /(?<h>\d+):(?<m>[0-9]{1,2}?):(?<s>[0-9]{1,2}(?:\.[0-9]{1,2})?)/;
    const match = text.match(regexTime);
    if (!match || match.length === 0) {
        return null;
    }

    const hours = Math.floor(Number(match.groups?.h ?? "0"));
    const minutes = Math.floor(Number(match.groups?.m ?? "0"));
    const seconds = Number(match.groups?.s ?? "0");

    const time: Time = {
        hours,
        minutes,
        seconds,
    };

    adjustTimeOverplus(time);
    return time;
}

export function adjustTimeOverplus(time: Time): void {
    if (time.seconds >= 60) {
        time.seconds -= 60;
        time.minutes++;
    }

    if (time.minutes >= 60) {
        time.minutes -= 60;
        time.hours++;
    }

    if (time.hours >= 9) {
        time.hours = 9;
        time.minutes = 59;
        time.seconds = 59.99;
    }
}

export function timeToString(time: Time): string {
    adjustTimeOverplus(time);
    const hours = time.hours.toFixed(0);
    const minutes = time.minutes.toFixed(0).padStart("00".length, "0");
    const seconds = time.seconds.toFixed(2).padStart("00.00".length, "0");
    return `${hours}:${minutes}:${seconds}`;
}

export function timeToSeconds(time: Time): number {
    adjustTimeOverplus(time);
    const seconds = ((time.hours * 3600) + (time.minutes * 60) + time.seconds);
    return seconds;
}

export function sumTimes(t1: Time, t2: Time): Time {
    const seconds1 = timeToSeconds(t1);
    const seconds2 = timeToSeconds(t2);
    const totalSeconds = seconds1 + seconds2;
    return secondsToTime(totalSeconds);
}

export function subtractTimes(minuend: Time, subtracting: Time): Time {
    const minuendSeconds = timeToSeconds(minuend);
    const subtractingSeconds = timeToSeconds(subtracting);
    const deltaSeconds = minuendSeconds - subtractingSeconds;
    return secondsToTime(deltaSeconds);
}
