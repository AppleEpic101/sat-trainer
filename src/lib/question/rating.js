export const getLevel = async (xp) => {
    let level = 0;
    let xpNeeded = 0;
    let xpTotal = 0;
    while(xpTotal < xp) {
        level++;
        xpNeeded = Math.floor(100 * Math.pow(1.1, level));
        xpTotal += xpNeeded;
    }
    return { level, xpNeeded, xpTotal };
}