import { CLASS_NAME, SELECTOR } from './types/selectors';

const {
    GAME_BUTTONS,
    SCORE,
    SELECTION_SCREEN,
    RESULT_SCREEN,
    PLAYER_CHOOSE_CONTAINER,
    AI_CHOOSE_CONTAINER,
    WIN_OR_LOSE_TITLE,
    RESET_BUTTON,
    RULES_BUTTON,
    POPUP,
    CLOSE_POPUP_BUTTON,
} = SELECTOR;

const { SELECTION_SCREEN_CLASS_HIDEN, RESULT_SCREEN_CLASS_HIDEN, POPUP_HIDEN } = CLASS_NAME;

export class StartGame {
    gameButtons: NodeListOf<Element> | null;
    playAgainButton: HTMLDivElement | null;
    rulesButton: HTMLDivElement | null;
    closePopupButton: HTMLDivElement | null;

    //html div elemnts
    score: HTMLDivElement | null;
    selectionScreen: HTMLDivElement | null;
    resultScreen: HTMLDivElement | null;
    playerChoiceContainer: HTMLDivElement | null;
    aiChoiceContainer: HTMLDivElement | null;
    winOrLoseTitle: HTMLDivElement | null;
    popup: HTMLDivElement | null;

    // initial state
    initialScore: number;
    choiceForAI: Array<string>;
    choiceAI: string;
    playerChoice: string;
    playerOrAi: boolean;
    whoWin: Array<string>;

    constructor() {
        this.gameButtons = document.querySelectorAll(GAME_BUTTONS);
        this.playAgainButton = this.bindDomElement(RESET_BUTTON);
        this.rulesButton = this.bindDomElement(RULES_BUTTON);
        this.closePopupButton = this.bindDomElement(CLOSE_POPUP_BUTTON);

        this.score = this.bindDomElement(SCORE);
        this.selectionScreen = this.bindDomElement(SELECTION_SCREEN);
        this.resultScreen = this.bindDomElement(RESULT_SCREEN);
        this.playerChoiceContainer = this.bindDomElement(PLAYER_CHOOSE_CONTAINER);
        this.aiChoiceContainer = this.bindDomElement(AI_CHOOSE_CONTAINER);
        this.winOrLoseTitle = this.bindDomElement(WIN_OR_LOSE_TITLE);
        this.popup = this.bindDomElement(POPUP);

        this.initialScore = Number(localStorage.getItem('score'));
        this.choiceForAI = ['rock', 'paper', 'scissors'];
        this.choiceAI = '';
        this.playerChoice = '';
        this.playerOrAi = true;
        this.whoWin = [];
    }

    bindDomElement(selector: string): HTMLDivElement | null {
        if (document.querySelector(selector) === null) {
            console.error(`don't find selector ${selector}`);
            return null;
        }

        return document.querySelector(selector);
    }

    renderScore() {
        if (this.score === null) {
            console.error('score not faund');
            return null;
        }

        this.score.innerText = String(localStorage.getItem('score') || 0);
        this.initialScore = Number(localStorage.getItem('score'));
        return null;
    }

    randomChoiceForAI(options: Array<string>) {
        const index = Math.floor(Math.random() * options.length);
        return (this.choiceAI = options[index]);
    }

    showHide(elemnet: HTMLDivElement | null, className: string) {
        if (elemnet === null) {
            console.warn('dont find html element');
            return null;
        }

        elemnet.classList.toggle(className);
        return null;
    }

    renderPlayersChoice(
        container: HTMLDivElement | null,
        event: any,
        AI: string,
        player: boolean,
        whoWin: Array<string>
    ) {
        const resultScreen = document.createElement('div');
        const choice = document.createElement('div');
        const img: HTMLImageElement = document.createElement('img');

        const classNameModifire = player ? event.target.getAttribute('data-choice') : AI;
        const imgUrl = new URL(`/public/images/icon-${classNameModifire}.svg`, import.meta.url)
            .href;

        resultScreen.classList.add(
            'selection-screen__choose',
            'selection-screen__choose--position',
            `selection-screen__choose--${classNameModifire}`
        );

        if (!player) {
            resultScreen.classList.add(`selection-screen__choose--animation`);
        }

        if (whoWin[0] === 'AI' && !player) {
            resultScreen.classList.add(`selection-screen__choose--winning`);
        } else if (whoWin[0] === 'PLAYER' && player) {
            resultScreen.classList.add(`selection-screen__choose--winning`);
        }

        choice.classList.add('selection-screen__choose-bg');
        img.src = imgUrl;

        resultScreen.appendChild(choice);
        choice.appendChild(img);

        if (container !== null) {
            container.appendChild(resultScreen);
        }
    }

    winOrLoseRules(
        event: any,
        AI: string,
        textContainer: HTMLDivElement | null,
        score: HTMLDivElement | null,
        initialScore: number,
        whoWin: Array<string>
    ) {
        if (textContainer === null) return null;
        if (score === null) return null;

        const player = event.target.getAttribute('data-choice');

        if (player === AI) {
            textContainer.textContent = 'DRAW';
            return null;
        }

        if (
            (player === 'rock' && AI == 'paper') ||
            (player === 'paper' && AI == 'scissors') ||
            (player === 'scissors' && AI == 'rock')
        ) {
            textContainer.textContent = 'YOU LOSE';
            localStorage.setItem('score', String(initialScore - 3));

            whoWin.push('AI');

            return null;
        }

        if (
            (player === 'rock' && AI == 'scissors') ||
            (player === 'paper' && AI == 'rock') ||
            (player === 'scissors' && AI == 'paper')
        ) {
            textContainer.textContent = 'YOU WIN';
            localStorage.setItem('score', String(initialScore + 3));

            whoWin.push('PLAYER');

            return null;
        }

        return null;
    }

    bindFunctionToGameButton(
        buttons: NodeListOf<Element> | null,
        showHideScreen: (elemnet: HTMLDivElement | null, className: string) => void,
        showHideScreenSecond: (elemnet: HTMLDivElement | null, className: string) => void,
        winOrLoseRules: (
            event: any,
            AI: string,
            textContainer: HTMLDivElement | null,
            score: HTMLDivElement | null,
            initialScore: number,
            whoWin: Array<string>
        ) => void,
        renderPlayerChoice: (
            container: HTMLDivElement | null,
            event: any,
            AI: string,
            playerOrAi: boolean,
            whoWin: Array<string>
        ) => void,
        renderAiChoice: (
            container: HTMLDivElement | null,
            event: any,
            AI: string,
            playerOrAi: boolean,
            whoWin: Array<string>
        ) => void
    ) {
        if (buttons === null) {
            console.warn(`don't find button`);
            return null;
        }

        buttons.forEach((button) =>
            button.addEventListener('click', (event: any) => {
                showHideScreen(this.selectionScreen, SELECTION_SCREEN_CLASS_HIDEN);

                showHideScreenSecond(this.resultScreen, RESULT_SCREEN_CLASS_HIDEN);

                winOrLoseRules(
                    event,
                    this.choiceAI,
                    this.winOrLoseTitle,
                    this.score,
                    this.initialScore,
                    this.whoWin
                );
                renderPlayerChoice(
                    this.playerChoiceContainer,
                    event,
                    this.choiceAI,
                    this.playerOrAi,
                    this.whoWin
                );

                renderAiChoice(
                    this.aiChoiceContainer,
                    event,
                    this.choiceAI,
                    !this.playerOrAi,
                    this.whoWin
                );
            })
        );

        return null;
    }

    bindFunctionToPopUpButton(
        button: HTMLDivElement | null,
        showHidePopUp: (elemnet: HTMLDivElement | null, className: string) => void
    ) {
        button?.addEventListener('click', () => {
            showHidePopUp(this.popup, POPUP_HIDEN);
        });
    }

    playAgain() {
        this.playAgainButton?.addEventListener('click', () => {
            if (this.playerChoiceContainer !== null && this.aiChoiceContainer !== null) {
                this.playerChoiceContainer.innerText = '';
                this.aiChoiceContainer.innerText = '';
            }

            this.randomChoiceForAI(this.choiceForAI);
            this.showHide(this.resultScreen, RESULT_SCREEN_CLASS_HIDEN);
            this.showHide(this.selectionScreen, SELECTION_SCREEN_CLASS_HIDEN);
            this.renderScore();

            this.whoWin.pop();
        });
    }

    resetScore() {
        this.score?.addEventListener('click', () => {
            localStorage.setItem('score', '0');
            this.renderScore();
        });
    }

    // addHidenClass(screen: HTMLDivElement | null, className: string) {
    //     if (screen) {
    //         const timeout = setTimeout(() => {
    //             screen.classList.add(className);
    //         }, 900);
    //     }
    // }

    initial() {
        this.resetScore();
        this.randomChoiceForAI(this.choiceForAI);
        this.playAgain();
        this.renderScore();

        this.bindFunctionToGameButton(
            this.gameButtons,
            this.showHide,
            this.showHide,
            this.winOrLoseRules,
            this.renderPlayersChoice,
            this.renderPlayersChoice
        );

        this.bindFunctionToPopUpButton(this.rulesButton, this.showHide);
        this.bindFunctionToPopUpButton(this.closePopupButton, this.showHide);
    }

    run() {
        this.initial();
    }
}
