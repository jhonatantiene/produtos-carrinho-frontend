import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProdutosService } from '../../servicos/produtos.service';

@Component({
  selector: 'app-cadastro-produtos',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.scss'
})
export class CadastroProdutosComponent {

  formulario: FormGroup
  imagemPreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private produtosService: ProdutosService) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: [null, [Validators.required, Validators.min(0)]],
      quantidade: [null, [Validators.required, Validators.min(1)]],
      imagem: [null]
    });
  }

  selecionarImagem(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      this.formulario.patchValue({ imagem: file.name })
      const reader = new FileReader();
      reader.onload = () => (this.imagemPreview = reader.result)
      reader.readAsDataURL(file)
    }
  }

  salvar() {
    console.log(this.formulario.value)
    const produto = this.formulario.value
    this.produtosService.cadastrar(produto).subscribe({
      next: () => {
        console.log('Produto cadastrado com sucesso!')
      },
      error: (err) => {
        console.error('Erro ao cadastrar produto:', err)
      }
    })
  }
}
