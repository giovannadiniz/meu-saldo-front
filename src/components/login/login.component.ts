import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  phoneNumber: string = '';
  nome: string = '';
  private router = inject(Router);
  private loginService = inject(LoginService);
  private toastr = inject(ToastrService);

  onLogin() {
    this.loginService.login(this.phoneNumber, this.nome).subscribe({
      next: (response) => {
        const msg = (response as any)?.message || 'Login realizado com sucesso!';
        this.toastr.success(msg, 'Sucesso!');

        window.open('https://wa.me/message/OT2QP734WEYJM1', '_blank', 'noopener,noreferrer');
        },
      error: (err) => {
        console.error('Erro ao fazer login:', err);

        let msg = 'Erro inesperado. Tente novamente.';
        if (err.status === 500) {
          msg = 'Erro interno do servidor. Tente mais tarde.';
        } else if (err.error && err.error.message) {
          msg = err.error.message;
        }

        this.toastr.error(msg, 'Erro de Login');
      }
    });
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
