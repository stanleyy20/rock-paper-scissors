import { CLASS_NAME, SELECTOR } from './types/selectors';

const {
    PAPER,
    ROCK,
    SCISSORS,
    SCORE,
    MAIN_FIRST,
    MAIN_SECOND,
    PLAYER_CHOOSE_CONTAINER,
    AI_CHOOSE_CONTAINER,
    WIN_OR_LOSE_TITLE,
    RESET_BUTTON,
} = SELECTOR;

const { FIRST_SCREEN, SECOND_SCREEN } = CLASS_NAME;

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
    aioChoiceContainer: HTMLDivElement | null;
    winOrLoseTitle: HTMLDivElement | null;
    // initial state
    initialScore: number;
    choiceForAI: Array<string>;
    choiceAI: string;
    playerChoice: string;

    constructor() {
        this.rockButton = this.bindDomElement(ROCK);
        this.paperButton = this.bindDomElement(PAPER);
        this.scissorsButton = this.bindDomElement(SCISSORS);
        this.playAgainBtn = this.bindDomElement(RESET_BUTTON);

        this.score = this.bindDomElement(SCORE);
        this.selectionScreen = this.bindDomElement(MAIN_FIRST);
        this.resultScreen = this.bindDomElement(MAIN_SECOND);
        this.playerChoiceContainer = this.bindDomElement(PLAYER_CHOOSE_CONTAINER);
        this.aioChoiceContainer = this.bindDomElement(AI_CHOOSE_CONTAINER);
        this.winOrLoseTitle = this.bindDomElement(WIN_OR_LOSE_TITLE);

        this.initialScore = Number(localStorage.getItem('score'));
        this.choiceForAI = ['rock', 'paper', 'scissors'];
        this.choiceAI = '';
        this.playerChoice = '';
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
        this.choiceAI = options[index];
    }

    bindFunctionToButton(
        btn: HTMLDivElement | null,
        fn: (elemnet: HTMLDivElement | null, className: string) => void,
        fn2: (elemnet: HTMLDivElement | null, className: string) => void,
        fn3: (event: any, container: HTMLDivElement | null, player: string) => void,
        fn4: (
            event: any,
            AI: string,
            textContainer: HTMLDivElement | null,
            score: HTMLDivElement | null,
            initialScore: number
        ) => void,
        fn5: (AIChoice: string, container: HTMLDivElement | null) => void
    ) {
        if (btn === null) {
            console.warn(`don't find button`);
            return null;
        }

        btn.addEventListener('click', (event: any) => {
            fn(this.selectionScreen, FIRST_SCREEN);
            fn2(this.resultScreen, SECOND_SCREEN);
            fn3(event, this.playerChoiceContainer, this.playerChoice);
            fn4(event, this.choiceAI, this.winOrLoseTitle, this.score, this.initialScore);
            fn5(this.choiceAI, this.aioChoiceContainer);
        });
        return null;
    }

    showHideScren(elemnet: HTMLDivElement | null, className: string) {
        if (elemnet === null) {
            console.warn('dont find html element');
            return null;
        }
        elemnet.classList.toggle(className);
        return null;
    }

    hideElement(elemnet: HTMLDivElement | null, className: string) {
        if (elemnet === null) {
            console.warn('dont find html element');
            return null;
        }
        elemnet.classList.toggle(className);
        return null;
    }

    showElement(elemnet: HTMLDivElement | null, className: string) {
        if (elemnet === null) {
            console.warn('dont find html element');
            return null;
        }

        elemnet.classList.toggle(className);
        return null;
    }

    whoWin(
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

    addPlayerChocieToScreen(event: any, container: HTMLDivElement | null) {
        const main = document.createElement('div');
        const choice = document.createElement('div');
        const img: HTMLImageElement = document.createElement('img');

        const playerChoice = event.target.getAttribute('data-choice');

        main.classList.add(
            'main__choose',
            `main__choose--${playerChoice}`,
            'main__choose--position'
        );
        choice.classList.add('main__choose-bg');
        img.src = `./public/images/icon-${playerChoice}.svg`;

        main.appendChild(choice);
        choice.appendChild(img);

        if (container !== null) {
            container.appendChild(main);
        }
    }

    addAIChocieToScreen(option: string, container: HTMLDivElement | null) {
        const main = document.createElement('div');
        const choice = document.createElement('div');
        const img: HTMLImageElement = document.createElement('img');

        main.classList.add('main__choose', `main__choose--${option}`, 'main__choose--position');
        choice.classList.add('main__choose-bg');
        img.src = `./public/images/icon-${option}.svg`;

        main.appendChild(choice);
        choice.appendChild(img);

        if (container !== null) {
            container.appendChild(main);
        }
    }

    initial() {
        this.bindFunctionToButton(
            this.rockButton,
            this.hideElement,
            this.showElement,
            this.addPlayerChocieToScreen,
            this.whoWin,
            this.addAIChocieToScreen
        );
        this.bindFunctionToButton(
            this.paperButton,
            this.hideElement,
            this.showElement,
            this.addPlayerChocieToScreen,
            this.whoWin,
            this.addAIChocieToScreen
        );
        this.bindFunctionToButton(
            this.scissorsButton,
            this.hideElement,
            this.showElement,
            this.addPlayerChocieToScreen,
            this.whoWin,
            this.addAIChocieToScreen
        );
    }

    clear() {
        this.playAgainBtn?.addEventListener('click', () => {
            if (this.playerChoiceContainer !== null && this.aioChoiceContainer !== null) {
                this.playerChoiceContainer.innerText = '';
                this.aioChoiceContainer.innerText = '';
            }

            this.randomChoiceForAI(this.choiceForAI);
            this.hideElement(this.resultScreen, SECOND_SCREEN);
            this.hideElement(this.selectionScreen, FIRST_SCREEN);
            this.renderScore();
        });
    }

    run() {
        this.randomChoiceForAI(this.choiceForAI);
        this.renderScore();
        this.initial();
        this.clear();
    }
}
