import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  phoneNumber: string = '';
  nome: string = '';
  private loginService = inject(LoginService);

  onLogin() {
    try {

      this.loginService.login(this.phoneNumber, this.nome).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido:', response);
        },
        error: (err) => {
          console.error('Erro ao fazer login:', err);
        },
        complete: () => {
          console.log('Requisição de login completa.');
        }
      });

    } catch (error) {
      console.error('Erro inesperado no componente de login:', error);
    }
  }

  formatPhone(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }

    this.phoneNumber = value;
  }
}
