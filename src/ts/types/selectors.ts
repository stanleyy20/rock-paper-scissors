type selectors = {
    ROCK: string;
    PAPER: string;
    SCISSORS: string;
    SCORE: string;
    MAIN_FIRST: string;
    MAIN_SECOND: string;
};

type className = {
    FIRST_SCREEN: string;
    SECOND_SCREEN: string;
};

export const SELECTOR: selectors = {
    ROCK: '#rock',
    PAPER: '#paper',
    SCISSORS: '#scissors',
    SCORE: '#score',
    MAIN_FIRST: '.main',
    MAIN_SECOND: '.main-second',
};

export const CLASS_NAME: className = {
    FIRST_SCREEN: 'main--hiden',
    SECOND_SCREEN: 'main-second--hiden',
};
