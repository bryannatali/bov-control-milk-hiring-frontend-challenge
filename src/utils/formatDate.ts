import moment from 'moment'
import 'moment/locale/pt-br'

moment.locale('pt-br')

export function formatDate(date: string | Date): string {
  if (typeof date === 'string') {
    return formatDate(new Date(date))
  }

  return moment(date).format('DD [de] MMMM [de] YYYY')
}