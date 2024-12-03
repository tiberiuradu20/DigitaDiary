import { Injectable, Scope } from '@nestjs/common';
import { randomUUID } from 'crypto'; // Util pentru a genera ID-uri unice

///@Injectable({ scope: Scope.REQUEST }) // Instanță unică pe cerere
///@Injectable({ scope: Scope.TRANSIENT }) // Instanță nouă pentru fiecare injecție
///@Injectable({ scope: Scope.DEFAULT }) // Implicit Singleton
@Injectable({ scope: Scope.REQUEST })
export class TestService {
  private readonly id: string;

  constructor() {
    this.id = randomUUID(); // Fiecare instanță va avea un ID unic
    console.log(`TestService instance created with ID: ${this.id}`);
  }

  getId(): string {
    return this.id;
  }
}
