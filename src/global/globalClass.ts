export class ResponseData<D> {
  data: D | D[];
  
  message: string;
  error?: any;
  statusCode: number;

  constructor(data: D | D[], statusCode: number, message: string, error: any = null) {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    return this;
  }
}
