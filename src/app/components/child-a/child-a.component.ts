import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-a',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-a.component.html',
  styleUrl: './child-a.component.css',
})
export class ChildAComponent {
  @Input()
  param: string = '';
}
