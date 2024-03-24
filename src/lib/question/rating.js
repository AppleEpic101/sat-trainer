export const getLevel = (xp) => {
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