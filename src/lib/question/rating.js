export const getLevel = (xp) => {
    let level = 0;
    let xpNeededToNext = 0;
    let xpTotal = 0;
    let currentXP = xp;

    while (xpTotal <= xp) {
        level++;
        xpNeededToNext = Math.floor(100 * Math.pow(1.1, level));
        xpTotal += xpNeededToNext;

        if (xpTotal > xp) {
            currentXP = xp - (xpTotal - xpNeededToNext);
            break;
        }
    }

    return { level, currentXP, xpNeededToNext, xpTotal };
}

export const gainXP = (xp, questionLevel, isCorrect, streak, boost = 1) => {
    
}

export const updateRating = (rating, questionLevel, isCorrect, boost = 1) => {
    const ratingChange = 0.01 * questionLevel;

    if(typeof rating !== 'number') {
        rating = 0;
    }
    let newRating;
    if(isCorrect) {
        newRating = rating + ratingChange * boost;
    } else {
        newRating = rating - ratingChange * boost;
    }

    if(newRating < 0) {
        newRating = 0;
    }
    if(newRating > 100) {
        newRating = 100;
    }

    console.log(newRating);
    return newRating;
}