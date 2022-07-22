type selectors = {
    ROCK: string;
    PAPER: string;
    SCISSORS: string;
    SCORE: string;
    SELECTION_SCREEN: string;
    RESULT_SCREEN: string;
    PLAYER_CHOOSE_CONTAINER: string;
    AI_CHOOSE_CONTAINER: string;
    WIN_OR_LOSE_TITLE: string;
    RESET_BUTTON: string;
};

type className = {
    SELECTION_SCREEN_CLASS_HIDEN: string;
    RESULT_SCREEN_CLASS_HIDEN: string;
};

export const SELECTOR: selectors = {
    ROCK: '#rock',
    PAPER: '#paper',
    SCISSORS: '#scissors',
    SCORE: '#score',
    SELECTION_SCREEN: '.main',
    RESULT_SCREEN: '.main-second',
    PLAYER_CHOOSE_CONTAINER: '#player',
    AI_CHOOSE_CONTAINER: '#ai',
    WIN_OR_LOSE_TITLE: '.main-second__title-h2',
    RESET_BUTTON: '.main-second__btn',
};

export const CLASS_NAME: className = {
    SELECTION_SCREEN_CLASS_HIDEN: 'main--hiden',
    RESULT_SCREEN_CLASS_HIDEN: 'main-second--hiden',
};
