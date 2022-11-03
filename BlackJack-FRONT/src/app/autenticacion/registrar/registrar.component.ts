import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { RegistrarService } from '../registrar.service';
import { Subscription } from 'rxjs';
import Swal from "sweetalert2";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit, OnDestroy {

  private suscripcion = new Subscription();

  mensajeError: String = ""

  public formularioAlta: FormGroup

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private srv: RegistrarService) {
    this.formularioAlta = this.fb.group(
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

  guardar() {
    if (this.formularioAlta.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {
      const objeto = this.formularioAlta.value;

      this.suscripcion.add(
        this.srv.registrar(objeto.nombre, objeto.password).subscribe({
          next: () => {
            Swal.fire({
              title: 'Usuario registrado con exito',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#007bff'
            }).then((result) => {
              if (result.isConfirmed) {

                this.router.navigateByUrl("login");
                
              }
            })
            
          },
          error: (err) => {
            this.mostrarMsjError(err.error.message);
          }
        })
      )
    }
  }

  login() {
    this.router.navigateByUrl("login");
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
    setTimeout(() => {
      this.mensajeError = '';
    }, 3000);
  }

}
