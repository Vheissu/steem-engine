import { ValidationController } from 'aurelia-validation';
import { Container } from 'aurelia-dependency-injection';
import { ValidationControllerFactory } from 'aurelia-validation';
import {
    ValidationRenderer,
    RenderInstruction,
    ValidateResult
  } from 'aurelia-validation';
  
  export class BootstrapFormRenderer {
    render(instruction: RenderInstruction) {
      
      for (let { result, elements } of instruction.unrender) {
        for (let element of elements) {
          this.remove(element, result);
        }
      }
  
      for (let { result, elements } of instruction.render) {
        for (let element of elements) {
          this.add(element, result);
        }
      }
    }
  
    add(element: Element, result: ValidateResult) {
      if (result.valid) {
        return;
      } 

      // add the is-invalid class to the enclosing form-group div
      element.classList.add('is-invalid');
  
      const formGroup = element.closest('.form-group');      
      if (!formGroup) {
        return;
      }

      // add help-block
      const message = document.createElement('div');
      message.className = 'invalid-feedback';
      message.textContent = result.message;
      message.id = `validation-message-${result.id}`;
      formGroup.appendChild(message);
    }
  
    remove(element: Element, result: ValidateResult) {
      if (result.valid) {
        return;
      }
  
      const formGroup = element.closest('.form-group');
      if (!formGroup) {
        return;
      }
  
      // remove help-block
      const message = formGroup.querySelector(`#validation-message-${result.id}`);
      if (message) {
        formGroup.removeChild(message);
  
        // remove the is-invalid class from the enclosing form-group div
        if (formGroup.querySelectorAll('.invalid-feedback').length === 0) {
          element.classList.remove('is-invalid');
        }
      }
    }
}
