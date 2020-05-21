import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  @Input() type: string
  @Input() targetObj: any
  @Output() deleteCard: EventEmitter<any> = new EventEmitter()

  isValid: boolean

  constructor() {}

  ngOnInit() {
    this.isValid = false
  }

  onOpen(event: any) {
    if (this.isValid) this.isValid = !this.isValid
  }

  onDelete() {
    this.deleteCard.emit(this.targetObj)
    this.isValid = !this.isValid
  }
}
