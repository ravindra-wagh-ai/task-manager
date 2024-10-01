import { Injectable } from '@angular/core';
import { Task } from './models/task';
import { StoreService } from './store.service';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private api: ApiService, private store: StoreService) {}
  async get(id: number) {
    let body = {
      query:
        'query task ($id:Int!) { task (id: $id) { id title description deadline ago userid username } }',
      variables: {
        id: id,
      },
    };
    let token = this.store.getData('xt');
    return await this.api.post(token, body);
  }

  async list() {
    let body = {
      query:
        'query tasks { tasks { id title description deadline ago userid username status } }',
    };

    let token = this.store.getData('xt');
    return await this.api.post(token, body);
  }

  async add(task: Task) {
    let body = {
      query: 'mutation add($input: NewTask!) { add(input: $input) { id } }',
      variables: {
        input: task,
      },
    };

    let token = this.store.getData('xt');
    return await this.api.post(token, body);
  }
  async update(task: Task) {}
  async delete(id: number) {}
}
