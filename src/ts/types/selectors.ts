type selectors = {
    ROCK: string;
    PAPER: string;
    SCISSORS: string;
    SCORE: string;
    MAIN_FIRST: string;
    MAIN_SECOND: string;
    PLAYER_CHOOSE_CONTAINER: string;
    AI_CHOOSE_CONTAINER: string;
    WIN_OR_LOSE_TITLE: string;
    RESET_BUTTON: string;
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
    PLAYER_CHOOSE_CONTAINER: '#player',
    AI_CHOOSE_CONTAINER: '#ai',
    WIN_OR_LOSE_TITLE: '.main-second__title-h2',
    RESET_BUTTON: '.main-second__btn',
};

export const CLASS_NAME: className = {
    FIRST_SCREEN: 'main--hiden',
    SECOND_SCREEN: 'main-second--hiden',
};
