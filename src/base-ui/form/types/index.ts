type IformType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  type: IformType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
