export interface QuestionInterface {
  uuid: string;
  qType: string;
  title: string;  
  desc: string;
  text: string;
  selectOptions: Array<SelectOptionInterface>;
}

export interface SelectOptionInterface {
  uuid: string;
  title: string;
  desc: string;
}