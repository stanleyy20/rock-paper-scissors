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
    rockButton: HTMLDivElement | null;
    paperButton: HTMLDivElement | null;
    scissorsButton: HTMLDivElement | null;
    score: HTMLDivElement | null;
    mainFirst: HTMLDivElement | null;
    mainSecond: HTMLDivElement | null;
    initialScore: string;
    AIOptions: Array<string>;
    AIChoice: string;
    playerChoice: any;
    playerChoiceContainer: HTMLDivElement | null;
    AIChoiceContainer: HTMLDivElement | null;
    winOrLoseTitle: HTMLDivElement | null;
    playAgainBtn: HTMLDivElement | null;

    constructor() {
        this.rockButton = this.bindDomElement(ROCK);
        this.paperButton = this.bindDomElement(PAPER);
        this.scissorsButton = this.bindDomElement(SCISSORS);
        this.score = this.bindDomElement(SCORE);
        this.mainFirst = this.bindDomElement(MAIN_FIRST);
        this.mainSecond = this.bindDomElement(MAIN_SECOND);
        this.playerChoiceContainer = this.bindDomElement(PLAYER_CHOOSE_CONTAINER);
        this.AIChoiceContainer = this.bindDomElement(AI_CHOOSE_CONTAINER);
        this.winOrLoseTitle = this.bindDomElement(WIN_OR_LOSE_TITLE);
        this.playAgainBtn = this.bindDomElement(RESET_BUTTON);

        this.initialScore = '0';
        this.AIOptions = ['rock', 'paper', 'scissors'];
        this.AIChoice = '';
        this.playerChoice = '';
    }

    bindDomElement(selector: string): HTMLDivElement | null {
        if (document.querySelector(selector) === null) {
            console.error(`don't find selector ${selector}`);
            return null;
        }

        return document.querySelector(selector);
    }

    showScore() {
        if (this.score === null) {
            console.error('score not faund');
        } else {
            this.score.innerText = this.initialScore;
        }
    }

    randomChoiceForAI(options: Array<string>) {
        const index = Math.floor(Math.random() * options.length);
        this.AIChoice = options[index];
    }

    bindFunctionToButton(
        btn: HTMLDivElement | null,
        fn: (elemnet: HTMLDivElement | null, className: string) => void,
        fn2: (elemnet: HTMLDivElement | null, className: string) => void,
        fn3: (event: any, container: HTMLDivElement | null, player: string) => void,
        fn4: (event: any, AI: string, textContainer: HTMLDivElement | null) => void
    ) {
        if (btn === null) {
            console.warn(`don't find button`);
            return null;
        }

        btn.addEventListener('click', (event: any) => {
            fn(this.mainFirst, FIRST_SCREEN);
            fn2(this.mainSecond, SECOND_SCREEN);
            fn3(event, this.playerChoiceContainer, this.playerChoice);
            fn4(event, this.AIChoice, this.winOrLoseTitle);
        });
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

    // bindPlayerChoice(event: any, choice: string) {
    //     choice = event.target.getAttribute('data-choice');
    // }

    whoWin(event: any, AI: string, textContainer: HTMLDivElement | null) {
        if (textContainer === null) return null;

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
            return null;
        }

        if (
            (player === 'rock' && AI == 'scissors') ||
            (player === 'paper' && AI == 'rock') ||
            (player === 'scissors' && AI == 'paper')
        ) {
            textContainer.textContent = 'YOU WIN';
            return null;
        }
    }

    addPlayerChocieToScreen(event: any, container: HTMLDivElement | null, player: string) {
        const main = document.createElement('div');
        const choice = document.createElement('div');
        const img: HTMLImageElement = document.createElement('img');

        const playerChoice = event.target.getAttribute('data-choice');
        player = playerChoice;

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
            this.whoWin
        );
        this.bindFunctionToButton(
            this.paperButton,
            this.hideElement,
            this.showElement,
            this.addPlayerChocieToScreen,
            this.whoWin
        );
        this.bindFunctionToButton(
            this.scissorsButton,
            this.hideElement,
            this.showElement,
            this.addPlayerChocieToScreen,
            this.whoWin
        );

        this.addAIChocieToScreen(this.AIChoice, this.AIChoiceContainer);
        this.clear();
    }

    clear() {
        this.playAgainBtn?.addEventListener('click', () => {
            this.randomChoiceForAI(this.AIOptions);
            this.hideElement(this.mainSecond, SECOND_SCREEN);
            this.hideElement(this.mainFirst, FIRST_SCREEN);
            this.playerChoiceContainer = null;
            this.AIChoiceContainer = null;
            this.addAIChocieToScreen(this.AIChoice, this.AIChoiceContainer);
        });
    }

    run() {
        this.randomChoiceForAI(this.AIOptions);
        this.showScore();
        this.initial();
    }
}
