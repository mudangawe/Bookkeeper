export interface Contact {

    contactDetails:{
        Cell:string,
        Telephone:string,
        Address:string
    };
    ContactId:number;
    FirstName:string;
    Surname: string;
    BirthDate:string

}

export interface formContactDetails{
    firstName:"",
    surname:"",
    cell:"",
    telephone:"",
    address:""
  }
