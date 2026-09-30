import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-fruits-component',
  styleUrl: './fruits-component.css',
  templateUrl: './fruits-component.html',
})
export class FruitsComponent {
  fruits = [
    { name: 'mela', emoji: '🍎' },
    { name: 'banana', emoji: '🍌' },
    { name: 'arancia', emoji: '🍊' },
    { name: 'limone', emoji: '🍋' },
    { name: 'anguria', emoji: '🍉' },
    { name: 'uva', emoji: '🍇' },
    { name: 'fragola', emoji: '🍓' },
    { name: 'melone', emoji: '🍈' },
    { name: 'ciliegia', emoji: '🍒' },
    { name: 'pesca', emoji: '🍑' },
    { name: 'ananas', emoji: '🍍' },
    { name: 'kiwi', emoji: '🥝' },
    { name: 'cocco', emoji: '🥥' },
    { name: 'mango', emoji: '🥭' },
  ];
}
