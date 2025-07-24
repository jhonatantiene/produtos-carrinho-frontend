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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  imagemPreview: string | ArrayBuffer | null = null

  constructor(private fb: FormBuilder, private produtosService: ProdutosService, private snackBar: MatSnackBar) {
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
      this.formulario.patchValue({ imagem: file })
      const reader = new FileReader();
      reader.onload = () => (this.imagemPreview = reader.result)
      reader.readAsDataURL(file)
    }
  }

  salvar() {
    const formData = new FormData();
    formData.append('nome', this.formulario.get('nome')?.value);
    formData.append('descricao', this.formulario.get('descricao')?.value);
    formData.append('preco', this.formulario.get('preco')?.value);
    formData.append('quantidade', this.formulario.get('quantidade')?.value);
    const imagem = this.formulario.get('imagem')?.value;
    if (imagem) {
      formData.append('imagem', imagem);
    }
    this.produtosService.cadastrar(formData).subscribe({
      next: () => {
        this.snackBar.open('Produto cadastrado com sucesso!', 'Fechar', {
          duration: 3000
        })
        this.formulario.reset()
      },
      error: (err) => {
        this.snackBar.open('Erro ao cadastra o produto!', 'Fechar', {
          duration: 3000
        })
        console.error('Erro ao cadastrar produto:', err)
      }
    })
  }

  cancelar() {
    this.formulario.reset()
    this.imagemPreview = null
  }
}
