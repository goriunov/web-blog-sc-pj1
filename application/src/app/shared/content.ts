// 'Content' object creation
export class Content{
  constructor(public header: string ,
              public description: string ,
              public imgUrl: string ,
              public authorName: string,
              public article: string ,
              public sections: string[],
              public email?: string ,
              public id?: number){}
}
