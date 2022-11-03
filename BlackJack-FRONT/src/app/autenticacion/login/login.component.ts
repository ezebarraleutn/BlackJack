import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Subscription, timeout } from 'rxjs';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private suscripcion = new Subscription();

  mensajeError: String = ""

  public formularioLogin: FormGroup

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private srv: LoginService) {
    this.formularioLogin = this.fb.group(
      {
        nombre: ["", Validators.required],
        password: ["", Validators.required]
      }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  login() {

    if (this.formularioLogin.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {
      const objeto = this.formularioLogin.value;

      this.suscripcion.add(
        this.srv.autenticar(objeto.nombre, objeto.password).subscribe({
          next: (data:any) => {
            this.srv.loginUser(data.token); // guarda token en el localStorage
            this.srv.getCurrentUser().subscribe((user: any) =>{

              this.srv.setUser(user); // guarda usuario en el localStorage
              //console.log(user);

            })

            setTimeout(()=>{
              this.router.navigateByUrl("");
            },100);
            
          },
          error: (err) => {
            this.mostrarMsjError(err.error.message);
          }
        })
      )
    }
  }

  registrar() {
    this.router.navigateByUrl("registrar");
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
    setTimeout(() => {
      this.mensajeError = '';
    }, 2000);
  }

}
