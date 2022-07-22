import { CLASS_NAME, SELECTOR } from './types/selectors';

const {
    PAPER,
    ROCK,
    SCISSORS,
    SCORE,
    SELECTION_SCREEN,
    RESULT_SCREEN,
    PLAYER_CHOOSE_CONTAINER,
    AI_CHOOSE_CONTAINER,
    WIN_OR_LOSE_TITLE,
    RESET_BUTTON,
} = SELECTOR;

const { SELECTION_SCREEN_CLASS_HIDEN, RESULT_SCREEN_CLASS_HIDEN } = CLASS_NAME;

export class StartGame {
    //buttons
    rockButton: HTMLDivElement | null;
    paperButton: HTMLDivElement | null;
    scissorsButton: HTMLDivElement | null;
    playAgainBtn: HTMLDivElement | null;
    //html div elemnts
    score: HTMLDivElement | null;
    selectionScreen: HTMLDivElement | null;
    resultScreen: HTMLDivElement | null;
    playerChoiceContainer: HTMLDivElement | null;
    aiChoiceContainer: HTMLDivElement | null;
    winOrLoseTitle: HTMLDivElement | null;
    // initial state
    initialScore: number;
    choiceForAI: Array<string>;
    choiceAI: string;
    playerChoice: string;
    playerOrAi: boolean;

    constructor() {
        this.rockButton = this.bindDomElement(ROCK);
        this.paperButton = this.bindDomElement(PAPER);
        this.scissorsButton = this.bindDomElement(SCISSORS);
        this.playAgainBtn = this.bindDomElement(RESET_BUTTON);

        this.score = this.bindDomElement(SCORE);
        this.selectionScreen = this.bindDomElement(SELECTION_SCREEN);
        this.resultScreen = this.bindDomElement(RESULT_SCREEN);
        this.playerChoiceContainer = this.bindDomElement(PLAYER_CHOOSE_CONTAINER);
        this.aiChoiceContainer = this.bindDomElement(AI_CHOOSE_CONTAINER);
        this.winOrLoseTitle = this.bindDomElement(WIN_OR_LOSE_TITLE);

        this.initialScore = Number(localStorage.getItem('score'));
        this.choiceForAI = ['rock', 'paper', 'scissors'];
        this.choiceAI = '';
        this.playerChoice = '';
        this.playerOrAi = true;
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

    showHideScren(elemnet: HTMLDivElement | null, className: string) {
        if (elemnet === null) {
            console.warn('dont find html element');
            return null;
        }
        elemnet.classList.toggle(className);
        return null;
    }

    renderPlayersChoice(container: HTMLDivElement | null, event: any, AI: string, player: boolean) {
        const main = document.createElement('div');
        const choice = document.createElement('div');
        const img: HTMLImageElement = document.createElement('img');

        const classNameModifire = player ? event.target.getAttribute('data-choice') : AI;

        main.classList.add(
            'main__choose',
            'main__choose--position',
            `main__choose--${classNameModifire}`
        );
        choice.classList.add('main__choose-bg');
        img.src = `./public/images/icon-${classNameModifire}.svg`;

        main.appendChild(choice);
        choice.appendChild(img);

        if (container !== null) {
            container.appendChild(main);
        }
    }

    winOrLoseRules(
        event: any,
        AI: string,
        textContainer: HTMLDivElement | null,
        score: HTMLDivElement | null,
        initialScore: number
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

            return null;
        }

        if (
            (player === 'rock' && AI == 'scissors') ||
            (player === 'paper' && AI == 'rock') ||
            (player === 'scissors' && AI == 'paper')
        ) {
            textContainer.textContent = 'YOU WIN';
            localStorage.setItem('score', String(initialScore + 3));

            return null;
        }

        return null;
    }

    bindFunctionToGameButton(
        button: HTMLDivElement | null,
        showHideScreen: (elemnet: HTMLDivElement | null, className: string) => void,
        showHideScreenSecond: (elemnet: HTMLDivElement | null, className: string) => void,
        winOrLoseRules: (
            event: any,
            AI: string,
            textContainer: HTMLDivElement | null,
            score: HTMLDivElement | null,
            initialScore: number
        ) => void,
        renderPlayerChoice: (
            container: HTMLDivElement | null,
            event: any,
            AI: string,
            playerOrAi: boolean
        ) => void,
        renderAiChoice: (
            container: HTMLDivElement | null,
            event: any,
            AI: string,
            playerOrAi: boolean
        ) => void
    ) {
        if (button === null) {
            console.warn(`don't find button`);
            return null;
        }

        button.addEventListener('click', (event: any) => {
            showHideScreen(this.selectionScreen, SELECTION_SCREEN_CLASS_HIDEN);

            showHideScreenSecond(this.resultScreen, RESULT_SCREEN_CLASS_HIDEN);

            winOrLoseRules(
                event,
                this.choiceAI,
                this.winOrLoseTitle,
                this.score,
                this.initialScore
            );
            renderPlayerChoice(this.playerChoiceContainer, event, this.choiceAI, this.playerOrAi);

            renderAiChoice(this.aiChoiceContainer, event, this.choiceAI, !this.playerOrAi);
        });
        return null;
    }

    initial() {
        this.randomChoiceForAI(this.choiceForAI);
        this.playAgain();
        this.renderScore();

        this.bindFunctionToGameButton(
            this.rockButton,
            this.showHideScren,
            this.showHideScren,
            this.winOrLoseRules,
            this.renderPlayersChoice,
            this.renderPlayersChoice
        );
        this.bindFunctionToGameButton(
            this.paperButton,
            this.showHideScren,
            this.showHideScren,
            this.winOrLoseRules,
            this.renderPlayersChoice,
            this.renderPlayersChoice
        );
        this.bindFunctionToGameButton(
            this.scissorsButton,
            this.showHideScren,
            this.showHideScren,
            this.winOrLoseRules,
            this.renderPlayersChoice,
            this.renderPlayersChoice
        );
    }

    playAgain() {
        this.playAgainBtn?.addEventListener('click', () => {
            if (this.playerChoiceContainer !== null && this.aiChoiceContainer !== null) {
                this.playerChoiceContainer.innerText = '';
                this.aiChoiceContainer.innerText = '';
            }

            this.randomChoiceForAI(this.choiceForAI);
            this.showHideScren(this.resultScreen, RESULT_SCREEN_CLASS_HIDEN);
            this.showHideScren(this.selectionScreen, SELECTION_SCREEN_CLASS_HIDEN);
            this.renderScore();
        });
    }

    run() {
        this.initial();
    }
}
