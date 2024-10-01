import { Status } from './status';
export class Task {
  public id?: number;
  public title?: string;
  public description?: string;
  public deadline?: Date;
  public status?: Status = Status.OPEN;
  public startedat?: Date;
  public completed?: Date;
  public userid?: number;
  public username?: string;
  public ago?: any;
}
