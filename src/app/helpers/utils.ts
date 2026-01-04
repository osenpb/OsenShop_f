import { FormGroup } from '@angular/forms';

export class FormUtils {


  static isValidField(form: FormGroup, field: string): boolean | null {
    const control = form.get(field);
    return !!(control?.errors && control?.touched);
  }

  static getFieldError(form: FormGroup, field: string): string | null {

    const control = form.get(field);

    if (!control || !control.errors || !control.touched) {
      return null;
    }

    const errors = control.errors;

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'El campo es obligatorio';

        case 'minlength':
          const minLengthError = errors['minlength'];
          return `Mínimo de ${minLengthError.requiredLength} caracteres requeridos.`;

        case 'email':
          return 'El formato del correo electrónico es inválido.';
      }
    }

    return null;
  }
}
