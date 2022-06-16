import { 
  Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IClip from 'src/app/models/clip.model';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ClipService } from 'src/app/services/clip.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
@Input() activeClip: IClip|null = null

showAlert = false
alertColor = 'blue'
alertMsg = "Please wait! Updating clip"
inSubmission = false  

@Output() update = new EventEmitter()
clipID = new FormControl('')
title = new FormControl('',[
  Validators.required,
  Validators.minLength(3)
])


editForm = new FormGroup({
  title: this.title,
  id: this.clipID
})
  constructor(
    private modal: ModalService,
    private clipService: ClipService) { }

  ngOnInit(): void {
    this.modal.register('editClip')
    console.log("modal has been registered!")
  }

  ngOnDestroy(){
    this.modal.unregister('editClip')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.activeClip)
    {
      return
    }
    this.inSubmission = false
    this.showAlert = false
    this.clipID.setValue(this.activeClip.docId)
    this.title.setValue(this.activeClip.title)
  }
 
  async submit()
  {
    if(!this.activeClip)
    {
      return
    }
  this.showAlert = true
  this.alertColor = 'blue'
  this.alertMsg = "Please wait! Updating clip"
  this.inSubmission = true 

try
{
  await this.clipService.updateClip(this.clipID.value, this.title.value)
}
catch(e)
{
  this.alertColor = 'red'
  this.alertMsg = "Something went wrong, please contact your administrator!"
  this.inSubmission = false 
  return
}
this.activeClip.title = this.title.value

this.update.emit(this.activeClip)

this.alertColor = 'green'
this.alertMsg = "Updated successfully!"
this.inSubmission = false 

  }
}
