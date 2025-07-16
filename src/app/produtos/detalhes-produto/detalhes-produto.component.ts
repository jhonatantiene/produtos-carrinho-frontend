import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-detalhes-produto',
  imports: [MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './detalhes-produto.component.html',
  styleUrl: './detalhes-produto.component.scss'
})
export class DetalhesProdutoComponent {

}
