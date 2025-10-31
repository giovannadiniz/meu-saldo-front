import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);

  private apiUrl: string = 'https://api.example.com/login';

  constructor() { }


  login(phoneNumber: string, nome: string) {
      const payload = {
        telefone: phoneNumber,
        nome: nome
      };

      console.log('Enviando para API externa /users/create:', payload);

      return this.http.post<UserModel>(`${this.apiUrl}/users/create`, payload);
    }
}
