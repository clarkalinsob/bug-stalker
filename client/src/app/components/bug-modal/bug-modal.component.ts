import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bug } from 'src/app/models/bug';

@Component({
  selector: 'app-bug-modal',
  templateUrl: './bug-modal.component.html',
  styleUrls: ['./bug-modal.component.scss']
})
export class BugModalComponent implements OnInit {
  @Input() bug: Bug
  @Input() bugs: Bug[]
  @Input() status: string
  @Output() createBug: EventEmitter<any> = new EventEmitter()
  @Output() updateBug: EventEmitter<any> = new EventEmitter()

  name: string
  description: string
  error: string
  isValid: boolean
  isUpdate: boolean

  constructor() { }

  ngOnInit() {
    this.name = ''
    this.isValid = false
    if (this.bug) this.isUpdate = !this.isUpdate
  }

  onSubmit() {
    if (this.name.trim() === '') return this.error = '*Name is required.'

    const bug = {
      _index: this.bugs ? this.bugs.length : this.bug._index,
      name: this.name,
      description: this.description,
      status: this.status
    }  

    this.isValid = !this.isValid

    // Update bug
    if (this.bug) this.updateBug.emit(bug)
    
    // Create bug
    else this.createBug.emit(bug)
  }

  onOpen(event: any) {
    // Reset Form Input and Close Modal
    if (this.isValid) {
      this.isValid = !this.isValid
      this.resetInput()
    }

    // If Update Modal on Open
    if (this.bug) {
      this.name = this.bug.name
      this.description = this.bug.description
    }
  }

  resetInput() {
    this.name = ''
    this.description = ''
    this.error = ''
  }

}
