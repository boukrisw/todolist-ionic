import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListService} from '../../services/list/list.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {

  listForm: FormGroup;

  constructor(private modalController: ModalController,
              private fb: FormBuilder,
              public listService: ListService) {}

  ngOnInit() {
    this.listForm = this.fb.group({
      listName: ['', Validators.required],
    });
  }

  public addList(): void {
    if(this.listForm.valid){
      const listName = this.listForm.get('listName').value;
      //this.listService.addList({name: this.listForm.get('listName').value, todos: []})
      //this.fs.addList(1,this.listForm.get('listName').value);
      this.listService.lists.push({name: listName, todos: []});
      this.modalController.dismiss().then(() => {});
    }
  }

  public exit(): void {
    this.modalController.dismiss().then(() => {});
  }
}
