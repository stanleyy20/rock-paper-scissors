import '../scss/index.scss';
import { StartGame } from './game';

const game = new StartGame();

window.addEventListener('DOMContentLoaded', () => game.run());
