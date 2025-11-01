import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);

  private apiUrl: string = 'https://ac9be7dd8b5e.ngrok-free.app/usuarios';

  constructor() { }


  login(phoneNumber: string, nome: string) {
      const payload = {
        telefone: phoneNumber,
        nome: nome
      };

      console.log('Enviando para API externa /usuarios:', payload);

      return this.http.post<UserModel>(`${this.apiUrl}`, payload);
  }
}
