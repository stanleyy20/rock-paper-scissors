type selectors = {
    GAME_BUTTONS: string;
    SCORE: string;
    SELECTION_SCREEN: string;
    RESULT_SCREEN: string;
    PLAYER_CHOOSE_CONTAINER: string;
    AI_CHOOSE_CONTAINER: string;
    WIN_OR_LOSE_TITLE: string;
    RESET_BUTTON: string;
    RULES_BUTTON: string;
    POPUP: string;
    CLOSE_POPUP_BUTTON: string;
};

type className = {
    SELECTION_SCREEN_CLASS_HIDEN: string;
    SELECTION_SCREEN_CLASS_ANIMATION: string;
    RESULT_SCREEN_CLASS_HIDEN: string;
    POPUP_HIDEN: string;
};

export const SELECTOR: selectors = {
    GAME_BUTTONS: '.selection-screen__choose',
    SCORE: '#score',
    SELECTION_SCREEN: '.selection-screen',
    RESULT_SCREEN: '.result-screen',
    PLAYER_CHOOSE_CONTAINER: '#player',
    AI_CHOOSE_CONTAINER: '#ai',
    WIN_OR_LOSE_TITLE: '.result-screen__title-h2',
    RESET_BUTTON: '.result-screen__btn',
    RULES_BUTTON: '#rules',
    POPUP: '.popup',
    CLOSE_POPUP_BUTTON: '.close-btn',
};

export const CLASS_NAME: className = {
    SELECTION_SCREEN_CLASS_HIDEN: 'selection-screen--hiden',
    SELECTION_SCREEN_CLASS_ANIMATION: 'selection-screen--animation',
    RESULT_SCREEN_CLASS_HIDEN: 'result-screen--hiden',
    POPUP_HIDEN: 'popup--hiden',
};
