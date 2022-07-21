import { CLASS_NAME, SELECTOR } from './types/selectors';

const { PAPER, ROCK, SCISSORS, SCORE, MAIN_FIRST, MAIN_SECOND } = SELECTOR;
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

    constructor() {
        this.rockButton = this.bindDomElement(ROCK);
        this.paperButton = this.bindDomElement(PAPER);
        this.scissorsButton = this.bindDomElement(SCISSORS);
        this.score = this.bindDomElement(SCORE);
        this.mainFirst = this.bindDomElement(MAIN_FIRST);
        this.mainSecond = this.bindDomElement(MAIN_SECOND);

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
        fn: (event: any, choice: string) => void,
        fn2: (elemnet: HTMLDivElement | null, className: string) => void,
        fn3: (elemnet: HTMLDivElement | null, className: string) => void
    ) {
        if (btn === null) {
            console.warn(`don't find button`);
            return null;
        }

        btn.addEventListener('click', (event: any) => {
            fn(event, this.playerChoice);
            fn2(this.mainFirst, FIRST_SCREEN);
            fn3(this.mainSecond, SECOND_SCREEN);
        });
        return null;
    }

    hideElement(elemnet: HTMLDivElement | null, className: string) {
        if (elemnet === null) {
            console.warn('dont find html element');
            return null;
        }
        elemnet.classList.add(className);
        return null;
    }

    showElement(elemnet: HTMLDivElement | null, className: string) {
        if (elemnet === null) {
            console.warn('dont find html element');
            return null;
        }

        elemnet.classList.remove(className);
        return null;
    }

    bindPlayerChoice(event: any, choice: string) {
        choice = event.target.getAttribute('data-choice');
    }

    initial() {
        this.bindFunctionToButton(
            this.rockButton,
            this.bindPlayerChoice,
            this.hideElement,
            this.showElement
        );
        this.bindFunctionToButton(
            this.paperButton,
            this.bindPlayerChoice,
            this.hideElement,
            this.showElement
        );
        this.bindFunctionToButton(
            this.scissorsButton,
            this.bindPlayerChoice,
            this.hideElement,
            this.showElement
        );
    }

    run() {
        this.initial();
        this.showScore();
        this.randomChoiceForAI(this.AIOptions);
    }
}
