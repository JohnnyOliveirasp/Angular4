import { Component } from '@angular/core';

import {Student} from './student/students.model'

@Component({
  selector: 'jad-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  students: Student[] = [
    {name: 'Luke', isJedi: false, temple: 'Coruscant' },
    {name: 'Leia', isJedi: true},
    {name: 'Han Solo', isJedi: true}
  ]

}
